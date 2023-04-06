import { FC } from "react";
import type { Metadata } from "next";
import LgHeading from "@/components/ui/LgHeading";
import Paragraph from "@/components/ui/Paragraph";
import DocumentationTabs from "@/components/DocumentationTabs";
import "simplebar-react/dist/simplebar.min.css";
export const metadata: Metadata = {
  title: "Similarity Api | Documentation",
  description: "Free & open-source text similarity API",
};
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <LgHeading>Making a request</LgHeading>
        <Paragraph>api/v1/similarity</Paragraph>
        <DocumentationTabs />
      </div>
    </div>
  );
};

export default page;
