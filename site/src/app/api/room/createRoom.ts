import { getBaseUrl } from '@/lib/server/getBaseUrl';
// import { scheduleRoomDeletion } from './deleteRoom'; // Import the scheduled deletion function

type room = {
	room_id: number;
	current_question: number;
	created_at: Date;
};

export async function createRoom() {
	const baseUrl = getBaseUrl();
	const res = await fetch(`${baseUrl}/api/room`, {
		method: 'POST',
	});

	// On failed request, return null middleware for redirect
	if (res.status == 500) {
		return null;
	}

	// Set the created_at timestamp using Prisma
	// await prisma.rooms.update({
	// 	where: {
	// 		room_id: room.room_id,
	// 	},
	// 	data: {
	// 		created_at: new Date(),
	// 	} as any, // Use a type assertion here to handle the type mismatch
	// });

	// Schedule a deletion task for 24 hours in the future
	const room = (await res.json()) as room;
	// scheduleRoomDeletion(room.room_id, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

	return room.room_id;
}
