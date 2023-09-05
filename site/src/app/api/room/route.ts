import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const new_room = await prisma.rooms.create({
      data: {
        current_question: 0,
      },
    });

    return NextResponse.json({
      // only room_id is being returned. fetch call is expecting room_id, current_question, created_at
      room_id: new_room.room_id,
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

    // Log the deleted rooms
    console.log("Deleted rooms:", res);

    // Reset the auto-increment counter for the room_id column using raw SQL
    await prisma.$executeRaw`ALTER SEQUENCE rooms_room_id_seq RESTART WITH 1`;

    console.log("Successfully deleted expired rooms and reset room IDs!");
    return NextResponse.json(res);
  } catch (error) {
    console.error(
      "Error deleting expired rooms and resetting room IDs:",
      error
    );
    return new NextResponse("Error deleting expired rooms", { status: 500 });
  }
}
