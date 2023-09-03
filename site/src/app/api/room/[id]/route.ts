import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  
  try {
    const room = await prisma.rooms.findUnique({
      where: {
        room_id: parseInt(id),
      },
    });
    
    if (!room) {
      return new NextResponse("No room with ID found", { status: 404 });
    }
    
    return NextResponse.json(room.room_id);
  } catch (error) {
    console.error(`Error fetching room with ID ${id}: `, error);
    return new NextResponse("Error fetching room", { status: 500 });
  }
}

// update current_question
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;

  try {
      const updateRoom = await prisma.rooms.update({
        where: {
          room_id: parseInt(id),
        },
        data: {
          current_question:  {
            increment: 1
          }
        }

      })

      if(!updateRoom) return new Response('room not found', {status:404})

      return new Response(JSON.stringify(updateRoom), {status:200})
  } catch(error){
      return new Response('failed to update room', {status:500})
  }
}