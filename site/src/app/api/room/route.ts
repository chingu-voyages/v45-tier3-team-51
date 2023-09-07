import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Find the maximum room_id in the database
    const maxRoom = await prisma.rooms.findFirst({
      select: { room_id: true },
      //tthe highest room_id will be returned as the first result
      orderBy: { room_id: "desc" },
    });

    // Calculate the next available room_id // and if maxRoom is null nextRoomId will be set to 1 ( '0) + 1;' )
    const nextRoomId = (maxRoom?.room_id || 0) + 1;

    // Create a new room with the calculated room_id nextRoomId
    const new_room = await prisma.rooms.create({
      data: {
        room_id: nextRoomId,
        current_question: 0,
      },
    });

    return NextResponse.json({
      room_id: new_room.room_id,
      current_question: new_room.current_question,
      created_at: new_room.created_at,
    });
  } catch (error) {
    console.error(`Error creating room: `, error);
    return new NextResponse("Error creating room", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // Delete expired rooms
    const res = await prisma.rooms.deleteMany({
      where: {
        created_at: {
          // 24 * 60 * 30 * 1000 = 86400000 milliseconds = 24 hours
          // 30,000 = 30 seconds for testing
          lte: new Date(Date.now() - 30000),
        },
      },
    });
    console.log("Successfully deleted expired rooms!");
    return new NextResponse("Successfully deleted expired rooms!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting expired rooms:", error);
    return new NextResponse("Error deleting expired rooms", { status: 500 });
  }
}
