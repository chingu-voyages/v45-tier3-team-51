'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Buttons } from '@/components/Buttons';
import { CopyLink } from '@/components/CopyLink';
import { Display } from '@/components/Display';

const nextQuestionHandler = () => {
	console.log('test');
};

// async function roomSetup() {}

export default function Home() {
	return (
		<>
			<main className='flex min-h-screen flex-col items-center justify-between p-24'>
				<Header />
				<Display text='LINK / QUESTION' />
				<CopyLink />
				<Buttons text='Next Question' size='lg' onClick={nextQuestionHandler} />
				<Footer />

				{/* Will be replace by link or display component  */}
				{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
					LINK / QUESTION
				</div> */}
				{/*   */}
				{/* Will be replace by button component  */}
				{/* <div className='relative flex place-items-center before:absolute '>
					<Buttons text='next question' size='lg' onClick={() => console.log('Next question')} />
				</div> */}
			</main>
		</>
	);
}
