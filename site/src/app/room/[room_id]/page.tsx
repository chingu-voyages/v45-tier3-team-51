'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Buttons } from '@/components/Buttons';
import { CopyLink } from '@/components/CopyLink';
import { Display } from '@/components/Display';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';


export default function Home() {

	const path = usePathname();
	const roomId = (path.split('/')[2])
	const [questionText, setQuestionText] = useState('')

	useEffect(() => {
		// getting the current question text of the room
		fetch(`/api/room/${roomId}`)
		.then(response => response.json())
		.then(data => {
			setQuestionText(data.current_question_text);
		})
		.catch(error => console.error('Error:', error));

		// subcribe to the proper channel
		pusherClient.subscribe(`${roomId}`)

		// question text coming from the server
		const questionTextHandler = (question_text: string) => {
			setQuestionText(() => question_text)
		}

		pusherClient.bind('next-question', questionTextHandler)

		return () => {
			pusherClient.unsubscribe(`${roomId}`)
			pusherClient.unbind('next-question', questionTextHandler)
		}
	},[])


	const nextQuestionText = async () => {
		await fetch(`/api/room/${roomId}`, {
			method: 'PATCH',
		  })
}


return (
	<>
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Header />
			<div style={{ display: questionText.includes("Waiting for the game to start...") ? "" : "none" }}>
				<CopyLink hostName={"http://localhost:3000"} />
			</div>
			<Display text={questionText} />

			<div>
				{questionText.includes("Waiting for the game to start...")
					? <Buttons text='Start Game' size='lg' onClick={nextQuestionText} />
					: <Buttons text='Next question' size='lg' onClick={nextQuestionText} />
				}

			</div>

			<Footer />
		</main>
	</>
);
}
