import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { pusherServer } from '@/lib/pusher'

export async function GET(req: Request, { params }: { params: { room_id: string } }) {
  const id = params.room_id;
  try {
    const room = await prisma.rooms.findUnique({
      where: {
        room_id: parseInt(id),
      },
    });

    let current_question_query;
    if (room) {
        current_question_query = await prisma.questions.findUnique({
        where: {
          question_id: room.current_question,
        },
      });
    }
    if (!room || !current_question_query) {
      return new NextResponse("No room with ID found", { status: 400 });
    }
    
    return NextResponse.json({room_id:room.room_id, current_question_text: current_question_query.question});
  } catch (error) {
    console.error(`Error fetching room with ID ${id}:`, error);
    return new NextResponse("Error fetching room", { status: 500 });
  }
}


export const PATCH = async (req: Request, { params }: { params: { room_id: string } }) => {
  const room_id = params.room_id;
  try {
      const room_response = await prisma.rooms.update({
        where: {
          room_id: parseInt(room_id),
        },
        data: {
          current_question:  {
            increment: 1
          }
        }

      })

      let current_question_query;
      if (room_response) {
          current_question_query = await prisma.questions.findUnique({
          where: {
            question_id: room_response.current_question,
          },
        });
      }
      
      if (!room_response || !current_question_query) {
        return new NextResponse("Cannot update the current room's question", { status: 404 });
      }

      pusherServer.trigger(`${room_id}`, 'next-question', current_question_query.question)

      return new NextResponse("", {status:200});
  } catch(error){
      return new Response('failed to update room', {status:500})
  }
}