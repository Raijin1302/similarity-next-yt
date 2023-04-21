"use client"
import Image from "next/image"
import LgHeading from "@/components/ui/LgHeading"
import Paragraph from "@/components/ui/Paragraph"
import Link from "next/link"
import EarthCanvas from "@/components/ui/Earth"
import { motion } from "framer-motion"
import { slideIn } from "@/helpers/motion"
import { useState, useEffect } from "react"
import Loading from "./loading"

export default function Home() {
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false)

  useEffect(() => {
    setLoadingScreen(true)
    const timerId = setTimeout(() => {
      setLoadingScreen(false)
    }, 3500)

    return () => clearTimeout(timerId)
  }, [])
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      {loadingScreen ? (
        <Loading />
      ) : (
        <div className="container pt-32 max-w-7xl mx-auto  w-full h-full">
          <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
            <LgHeading
              size="lg"
              className="three-d text-black dark:text-light-gold"
            >
              Easily determine <br /> text similarity
            </LgHeading>
            <Paragraph className="max-w-xl lg:text-left">
              With the Text Similarity API, you can easily determine the
              similarity between two pieces of text with a free{" "}
              <Link
                href="/login"
                className="underline underline-offset-2 text-black dark:text-light-gold"
              >
                API key
              </Link>
              .
            </Paragraph>
            <motion.div
              variants={slideIn("right", "tween", 0.2, 1)}
              className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute
          "
            >
              {/* <Image
              priority
              className="img-shadow"
              quality={100}
              style={{ objectFit: "contain" }}
              fill
              src="/typewriter.png"
              alt="typewriter"
            /> */}
              <EarthCanvas />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}
