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

	const [question, setQuestion] = useState('')
	const [currentQuestionNum, setCurrentQuestionNum] = useState(0)


	useEffect(() => {

		// getting the current question number
		const getRoomDetails = async () => {
            const response = await fetch(`/api/room/${roomId}`)
            const data = await response.json()
			console.log('current question', data.current_question)

			// state for the current question number gets updated in this useEffect
			// i think we need to move it to the PATCH request below, but i'm just running into a TS error
			setCurrentQuestionNum(data.current_question)
        }

        if(roomId) getRoomDetails()

		// subcribe to the proper channel
		pusherClient.subscribe(`${roomId}`)
		console.log(`subscribed to channel ${roomId}`)

		// question coming from the server
		const questionHandler= (question: string) => {
			setQuestion(question)
			console.log('new question from server', question)
		}

		pusherClient.bind('new-question', questionHandler)

		return () => {
			pusherClient.unsubscribe(`${roomId}`)
			pusherClient.unbind('new-question', questionHandler)
		}
	},[roomId])

	

	const getQuestion = async () => {

		// updating current_question within our DB
		try{
            const response = await fetch(`/api/room/${roomId}`, 
            {
                method:'PATCH',
            })
			console.log("PATCH", {...response})
			// setCurrentQuestionNum(parseInt(response))
			console.log("question_num",currentQuestionNum)

			// Pusher requires a POST request to trigger a websocket event
			// making POST for new question if current question gets updated
			// i think we can retrieve the current_question from the PATCH response and pass it on to the POST request (still needs work)
            if(response.ok){
    
				const res = await fetch(`/api/question`, {
					method: 'POST',
					body:JSON.stringify({
						roomId:roomId,
						id:currentQuestionNum
					})

				});
				if(res.ok){
					console.log("POST", res)
				}
            }
		
        }
        catch(error){
            console.log(error)
        }}


	return (
		<>
			<main className='flex min-h-screen flex-col items-center justify-between p-24'>
				<Header />
				<div style={{ display: currentQuestionNum > 1 ? "none" : "" }}>
					<CopyLink />
				</div>
				<Display text={question}/>

				<div>
					{ currentQuestionNum == 0 
					? <Buttons text='Start Game' size='lg' onClick={getQuestion}/>
					: <Buttons text='Next Question' size='lg' onClick={getQuestion}/>
					}

      			</div>

				<Footer />
			</main>
		</>
	);
}
