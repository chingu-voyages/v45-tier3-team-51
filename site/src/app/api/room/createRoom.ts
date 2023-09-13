import { getBaseUrl } from '@/lib/server/getBaseUrl';
// import { scheduleRoomDeletion } from './deleteRoom'; // Import the scheduled deletion function

// type room = {
// 	room_id: number;
// 	current_question: number;
// 	created_at: Date;
// };

export async function createRoom() {
	const baseUrl = getBaseUrl();

	const res = await fetch(`${baseUrl}/api/room`, {
		method: 'POST',
	});

	// On failed request, retry, don't return
	if (res.status == 500) {
		return null;
	}

	// Schedule a deletion task for 24 hours in the future
	const room = await res.json();

	return room.room_id;
}
