import { getServerSession } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./ui/SignOutButton";
import SignInButton from "./ui/SignInButton";

interface NavbarProps {}

const Navbar = async ({}) => {
  const session = await getServerSession();
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 inset-x-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className="">
          Text Similarity 2.0
        </Link>
        <div className="md:hidden ">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link href="/" className="">
            Documentation
          </Link>
          {session ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
