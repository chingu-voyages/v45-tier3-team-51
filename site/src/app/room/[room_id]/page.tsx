'use client';

import { HeaderAction } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Buttons } from '@/components/Buttons';
import { CopyLink } from '@/components/CopyLink';
import { Display } from '@/components/Display';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { getBaseUrl } from '@/lib/server/getBaseUrl';

export default function Home() {
	const path = usePathname();
	const roomId = path.split('/')[2];
	const [questionText, setQuestionText] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	// console.log(currentQuestion);
	// const updateDb = useMemo(() =>{
	// 	setIsLoading(false)
	// }, [questionText])
	useEffect(() => {
		let isLoading = true;
		// getting the current question text of the room
		fetch(`/api/room/${roomId}`)
			.then((response) => response.json())
			.then((data) => {
				setQuestionText(data.current_question_text);
				setCurrentQuestion(data.current_question);
				// setIsLoading(false); // Set isLoading to false when the question is fetched
			})
			.catch((error) => {
				console.error('Error:', error);
				// setIsLoading(false); // Set isLoading to false even on error
			});

		// subcribe to the proper channel
		pusherClient.subscribe(`${roomId}`);

		// question text coming from the server
		const questionTextHandler = (question_text: string) => {
			setQuestionText(() => question_text);
			setIsLoading(false);
		};

		const loadThis = () => {
			setIsLoading(true);
		};

		pusherClient.bind('setupLoading', loadThis);
		pusherClient.bind('next-question', questionTextHandler);

		return () => {
			pusherClient.unsubscribe(`${roomId}`);
			pusherClient.unbind('next-question', questionTextHandler);
		};
	}, [roomId, questionText]);

	const nextQuestionText = async () => {
		// setIsLoading(true);
		// disable button
		await fetch(`/api/room/${roomId}`, {
			method: 'PATCH',
		});
	};
	return (
		<main className='flex flex-col min-h-screen p-4'>
			<HeaderAction />
			<div className='flex-grow flex flex-col items-center justify-center'>
				<div className='mb-6 text-center'>{isLoading ? <></> : <Display text={questionText} />}</div>
				{currentQuestion == 0 ? (
					<div className='flex flex-col gap-3'>
						<Display text={'Share the link below with other participants'} />
						<div className='mb-6 text-center'>
							<CopyLink hostName={getBaseUrl()} />
						</div>
						<Buttons text='Start Game' size='lg' onClick={nextQuestionText} />
					</div>
				) : isLoading ? (
					<div>Loading...</div>
				) : (
					<Buttons text='Next question' size='lg' onClick={nextQuestionText} />
				)}
				{/* <div className='mt-6 text-center'> */}
				{/* {currentQuestion.includes('Waiting for') ? (
						// <Buttons text='Start Game' size='lg' onClick={nextQuestionText} />
					) : isLoading ? (
						<></>
					) : (
						<Buttons text='Next question' size='lg' onClick={nextQuestionText} />
					)} */}
				{/* {questionText.includes('Waiting for') ? (
						<Buttons text='Start Game' size='lg' onClick={nextQuestionText} />
					) : isLoading ? (
						<></>
					) : (
						<Buttons text='Next question' size='lg' onClick={nextQuestionText} />
					)} */}
				{/* </div> */}
			</div>
			<Footer />
		</main>
	);
}
