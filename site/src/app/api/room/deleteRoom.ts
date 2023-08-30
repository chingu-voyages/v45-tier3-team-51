import prisma from "@/lib/prisma"; // Import your Prisma client instance
import { getBaseUrl } from "@/lib/server/getBaseUrl";

// Function to delete a room
export async function deleteRoom(roomId: number) {
  const baseUrl = getBaseUrl();
  await fetch(`${baseUrl}/api/room/${roomId}`, {
    method: "DELETE",
  });
}

type room = {
  room_id: number;
  current_question: number;
  created_at: Date;
};

// Function to schedule room deletion after a specified duration
export async function scheduleRoomDeletion(roomId: number, duration: number) {
  setTimeout(async () => {
    const room = (await prisma.rooms.findUnique({
      where: {
        room_id: roomId,
      },
    })) as room;

    // Check if the room exists and if it has exceeded the duration
    if (room && Date.now() - room.created_at.getTime() >= duration) {
      await deleteRoom(room.room_id);
    }
  }, duration);
}
