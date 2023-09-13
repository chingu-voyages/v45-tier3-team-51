// 'use client';

import { Buttons } from "@/components/Buttons";
import { Display } from "@/components/Display";
import Link from "next/link";

export default function Home() {
  return (
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

  );
}
