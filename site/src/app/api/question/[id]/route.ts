import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { pusherServer } from '@/lib/pusher'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  
  try {
    const question = await prisma.questions.findUnique({
      where: {
        question_id: parseInt(id),
      },
    });
    
    if (!question) {
      return new NextResponse("No question with ID found", { status: 404 });
    }
    
    await pusherServer.trigger(`room`, 'next-question', question.question)

    return NextResponse.json(question.question);

  } catch (error) {
    console.error(`Error fetching question with ID ${id}: `, error);
    return new NextResponse("Error fetching question", { status: 500 });
  }
}

// export async function POST(req: Request) {
// 	try {
// 		const new_room = await prisma.rooms.create({
// 			data: {
// 				current_question: 0,
// 			},
// 		});
//   await pusherServer.trigger(`room`, 'next-question', question.question)

// 		return NextResponse.json({
// 			room_id: new_room.room_id,
// 			current_question: new_room.current_question
// 		});
// 	} catch (error) {
// 		console.error(`Error creating room: `, error);
// 		return new NextResponse('Error creating room', { status: 500 });
// 	}
// }
