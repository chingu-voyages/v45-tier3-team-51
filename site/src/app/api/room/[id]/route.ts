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