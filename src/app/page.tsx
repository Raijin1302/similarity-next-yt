import Image from "next/image";
import type { Metadata } from "next";
import LgHeading from "@/components/ui/LgHeading";
export const metadata: Metadata = {
  title: "Similarity Api",
  description: "Generated by create next app",
};

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center  overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto border-2 border-red-600 w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <LgHeading
            size="lg"
            className="three-d text-black dark:text-light-gold"
          >
            Easily determine <br /> text similarity
          </LgHeading>
        </div>
      </div>
    </div>
  );
}
