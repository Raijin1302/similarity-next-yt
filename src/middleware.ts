import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_SECRET,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
})
export default withAuth(
  async function middleware(req) {
    const pathName = req.nextUrl.pathname //relative path

    //Set rate limited
    if (pathName.startsWith("/api")) {
      const ipReq = req.ip ?? "127.0.0.1"
      try {
        const { success } = await ratelimit.limit(ipReq)
        if (!success) return NextResponse.json({ error: "Too many request" })
        return NextResponse.next()
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" })
      }
    }

    //Manage route protection
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = pathName.startsWith("/login")

    const sensitiveRoute = ["/dashboard"]

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }

      return null
    }

    if (!isAuth && sensitiveRoute.some((route) => pathName.startsWith(route))) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/", "/login", "/dashboard/((?!path).*)", "/api/((?!path).*)"],
}
