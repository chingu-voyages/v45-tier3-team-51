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
	const [question, setQuestion] = useState('')
	const [gameStarted, setGameStarted] = useState(false)
	const [current_question, setCurrentQuestion] = useState(0)

	// subscribe to roomId channel
	useEffect(() => {
		// getting the current question number
		const getRoomDetails = async () => {
            const response = await fetch(`/api/room/${roomId}`)
            const data = await response.json()
			console.log(data.current_question)
			setCurrentQuestion(data.current_question)
        }

        if(roomId) getRoomDetails()

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

	const startGame = async () => {
		// update current question num
		if(!roomId) return alert('room id not found')

        try{
            const response = await fetch(`/api/room/${roomId}`, 
            {
                method:'PATCH',
            })

            if(response.ok){
                console.log(response)
            }
        }
        catch(error){
            console.log(error)
        }

		setGameStarted(true)
    }
	

	const getQuestion = async () => {

		// updating current_question
		try{
            const response = await fetch(`/api/room/${roomId}`, 
            {
                method:'PATCH',
            })
			setCurrentQuestion(parseInt(response))
			// making POST for new question if current question gets updated
            if(response.ok){
    
				const res = await fetch(`/api/question`, {
					method: 'POST',
					body:JSON.stringify({
						roomId:roomId,
						id:current_question
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
				<div style={{ display: gameStarted ? "none" : "" }}>
					<CopyLink />
					<Buttons text='Start Game' size='lg' onClick={startGame}/>
				</div>

				<div style={{ display: !gameStarted ? "none" : "" }}>
					<Display text={question}/>
					<Buttons text='Next Question' size='lg' onClick={getQuestion}/>

      			</div>

				<Footer />
			</main>
		</>
	);
}
