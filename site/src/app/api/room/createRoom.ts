export async function createRoom() {
	// Add getBaseUrl() to prevent errors when accessing from vercel or localhost & different ports
	const baseUrl = 'http://localhost:3000';
	const res = await fetch(`${baseUrl}/api/room`, {
		method: 'POST',
	});
	const room = await res.json();
	return room.room_id;
}
