// 'use client';

import { HeaderAction } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Buttons } from "@/components/Buttons";
import { Display } from "@/components/Display";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-4">
      {/* Header */}
      <HeaderAction />

      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Display */}
        <div className="mb-6 text-center">
          <Display text="Break the ice with fun questions!" />
        </div>

        {/* Buttons */}
        <div className="text-center">
          <Link href="/room" prefetch={false}>
            <Buttons text="Create Room" size="lg" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
