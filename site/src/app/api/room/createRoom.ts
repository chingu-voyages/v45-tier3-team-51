import { getBaseUrl } from '@/lib/server/getBaseUrl';
// import { scheduleRoomDeletion } from './deleteRoom'; // Import the scheduled deletion function

// type room = {
// 	room_id: number;
// 	current_question: number;
// 	created_at: Date;
// };

export async function createRoom() {
	const baseUrl = getBaseUrl();
	console.log('base url: ', baseUrl);
	console.log('about to run fetch...');
	const res = await fetch(`${baseUrl}/api/room`, {
		method: 'POST',
	});

	// On failed request, retry, don't return
	if (res.status == 500) {
		console.log('error creating room');
		return null;
	}

	// Schedule a deletion task for 24 hours in the future
	const room = await res.json();

	console.log('created room: ', room);

	return room.room_id;
}
