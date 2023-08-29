import { getBaseUrl } from '@/lib/server/getBaseUrl';

export async function createRoom() {
	const baseUrl = getBaseUrl();
	const res = await fetch(`${baseUrl}/api/room`, {
		method: 'POST',
	});

	// On failed request, return null middleware for redirect
	if (res.status == 500) {
		return null;
	}

	const room = await res.json();
	return room.room_id;
}
