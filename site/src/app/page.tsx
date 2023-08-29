// 'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Buttons } from '@/components/Buttons';
import { Display } from '@/components/Display';
import Link from 'next/link';
export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Header />
			<Display text='Break the ice with fun questions!' />
			<Link href='/room' className='relative flex place-items-center before:absolute '>
				<Buttons text='Create Room' size='lg' />
			</Link>
			<Footer />
		</main>
	);
}
