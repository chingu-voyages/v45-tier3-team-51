import React from 'react'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { FC, useEffect, useRef, useState } from 'react'


interface QuestionsProps {
    roomId: number | string;
    current_question: number;
}

export function Question({ roomId, current_question }: QuestionsProps) {
    const [question, setQuestion] = useState("")

    useEffect(() => {
        pusherClient.subscribe(
          toPusherKey(`room:${roomId}`)
        )
    
        const questionHandler = (question: string) => {
            setQuestion(question)
          }
      
        pusherClient.bind('next-question', questionHandler)
      
        return () => {
            pusherClient.unsubscribe(
            toPusherKey(`room:${roomId}`)
            )
        pusherClient.unbind('next-question', questionHandler)}
    
    
    
    }, [roomId])

	return (
        <> {question}
        </>
    )

}


export default Question
