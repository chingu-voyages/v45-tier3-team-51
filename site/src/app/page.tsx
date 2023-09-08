"use client"

import { HeaderAction } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Buttons } from "@/components/Buttons";
import { Display } from "@/components/Display";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

	async function createRoom() {
    const res = await fetch('/api/room', {
      method: 'POST',
    });
    if (res.ok) {
      const { room_id } = await res.json();
      router.push(`/room/${room_id}`);
    } else {
      console.log('Failed to create room');
      router.push(`/error`);
    }
	}
  
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
            <Buttons onClick={createRoom} text='Create Room' size='lg' />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
