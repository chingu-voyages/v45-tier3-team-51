"use client";

import { HeaderAction } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Buttons } from "@/components/Buttons";
import { CopyLink } from "@/components/CopyLink";
import { Display } from "@/components/Display";
import { getBaseUrl } from "@/lib/server/getBaseUrl";
const nextQuestionHandler = () => {
  console.log("test");
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-4">
      <HeaderAction />
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="mb-6 text-center">
          <Display text="LINK / QUESTION" />
        </div>
        <div className="mb-6 text-center">
          <CopyLink hostName={getBaseUrl()} />
          <div className="mt-6 text-center">
            <Buttons
              text="Next Question"
              size="lg"
              onClick={nextQuestionHandler}
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
