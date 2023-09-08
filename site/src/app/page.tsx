'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Buttons } from '@/components/Buttons';
import { Display } from '@/components/Display';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	async function createRoom() {
		try {
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
		  } catch (error) {
			console.log('Error creating room:', error);
		  }
	}


	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Header />
			<Display text='Break the ice with fun questions!' />
			{/* <Link href='/room' prefetch={false} className='relative flex place-items-center before:absolute '> */}
			<Buttons onClick={createRoom} text='Create Room' size='lg' />
			{/* </Link> */}
			<Footer />
		</main>
	);
}
