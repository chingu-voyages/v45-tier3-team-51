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

	// roomId is extrcted from the params, perhaps there's a better place to do this than here?
	const path = usePathname();
	const roomId = (path.split('/')[2])

	const [questionText, setQuestionText] = useState('')
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)


	useEffect(() => {
		console.log("useEffect refreshing");
		// getting the current question number of the room
		fetch(`/api/room/${roomId}`)
		.then(response => response.json())
		.then(data => {
			console.log('current question text', data.current_question);
			setQuestionText(data.current_question);
		})
		.catch(error => console.error('Error:', error));

		// subcribe to the proper channel
		pusherClient.subscribe(`${roomId}`)
		console.log(`subscribed to channel ${roomId}`)

		// question number coming from the server
		const questionTextHandler = (question_text: string) => {
			setQuestionText(() => question_text)
			console.log('current question text', question_text)
		}

		pusherClient.bind('new-question', questionTextHandler)

		return () => {
			pusherClient.unsubscribe(`${roomId}`)
			pusherClient.unbind('new-question', questionTextHandler)
		}
	}, [])



	const nextquestionText = async () => {

		await fetch(`/api/room/${roomId}`, {
			method: 'PATCH',
		  })
			.then((response) => {
				console.log("we have incremented the question");
				if (response.ok) {
					return response.json()
				}
		}).then((response) => {
			console.log("next questionText is", response.current_questionText)
			response.current_questionText && setCurrentQuestionNumber(() => response.current_questionText)
		})			
		
		// console.log("getting next question")
		// await fetch(`/api/question/${currentQuestionNumber}`)
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			return response.json()
		// 		}
		// }).then((response) => response.questionText && setQuestionText(() => response.questionText))			


		// updating current_questionText within our DB

		// fetch(`/api/room/${roomId}`,
		// 	{
		// 		method: 'PATCH',
		// 	}).then((response) => {
		// 		return response.json()
		// 	}).then((response) => {
		// 		if (response.ok) {
		// 			console.log("questionText num!", response.current_questionText),
		// 			setCurrentQuestionNumber(() => response.current_questionText)
		// 			fetch(`/api/questionText/${currentQuestionTextNumber}`)
					
		// 			.then((response) => {
		// 				if(response.ok) {
		// 					response.json().then((response) => {
		// 						console.log("GET", response.questionText);
		// 						nextquestionTextText(() => response.questionText)
		// 					})
							
		// 					// console.log("after get", questionText);
		// 					// nextquestionTextText()
		// 				}
		// 			})
		// 			// if (res.ok) {
		// 			// 	console.log("POST",  res.json())
		// 			// }
		// 		}
		// 	}).catch(() => { console.log("error") })



		// console.log('PATCH', data.current_questionText)

		// setCurrentQuestionNumber(() => data.current_questionText)


		// console.log("questionText_num", currentQuestionTextNumber)
		// Pusher requires a POST request to trigger a websocket event
		// making POST for new questionText if current questionText gets updated
		// i think we can retrieve the current_questionText from the PATCH response and pass it on to the POST request (still needs work)
		// if (response.ok) {
		// 	const res = await fetch(`/api/questionText`, {
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 			roomId: roomId,
		// 			id: currentQuestionTextNumber
		// 		})

		// 	});
		// 	console.log("after post", currentQuestionTextNumber);
		// 	if (res.ok) {
		// 		console.log("POST", await res.json())
		// 	}
		// }

		
}


return (
	<>
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Header />
			<div style={{ display: currentQuestionNumber > 1 ? "none" : "" }}>
				<CopyLink />
			</div>
			<Display text={questionText} />

			<div>
				{questionText.includes("Waiting for players..")
					? <Buttons text='Start Game' size='lg' onClick={nextquestionText} />
					: <Buttons text='Next question' size='lg' onClick={nextquestionText} />
				}

			</div>

			<Footer />
		</main>
	</>
);
}
