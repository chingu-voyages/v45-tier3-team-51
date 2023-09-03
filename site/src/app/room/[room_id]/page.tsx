'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Buttons } from '@/components/Buttons';
import { CopyLink } from '@/components/CopyLink';
import { Display } from '@/components/Display';
import Question from '@/components/Question';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';


// async function roomSetup() {}

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

		pusherClient.subscribe(`room`)
		console.log("subscribed to channel")

		// question is coming from the server
		const questionHandler= (question: string) => {
			setQuestion(question)
			console.log('new question from server')
		}

		pusherClient.bind('new-question', questionHandler)

		return () => {
			pusherClient.unsubscribe(`${roomId}`)
			pusherClient.unbind('new-question', questionHandler)
		}
	},[roomId])

	const startGame = async () => {
		// update current question
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
		const response = await fetch(`/api/question/${current_question}`)
		const data = await response.json()
		setQuestion(data)
	  }


	return (
		<>
			<main className='flex min-h-screen flex-col items-center justify-between p-24'>
				<Header />
				<Display text={question} />
				<CopyLink />
				<Buttons text='Start Game' size='lg' onClick={startGame} />
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
