import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const new_room = await prisma.rooms.create({
        data: {
            current_question: 0
        }
    })

    if (!new_room) {
      throw new Error("Error creating room");
    }
    
    return NextResponse.json({
        room_id: new_room.room_id
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}