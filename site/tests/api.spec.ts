import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.describe.serial('Create/get/delete/noGet', () => {
	let roomId: number;

	test('should create a room', async ({ request }) => {
		const response = await request.post(`${baseUrl}/api/room`);
		const responseBody = await response.json();
		await expect(response).toBeOK();
		console.log('created room: ', responseBody);
		roomId = responseBody.room_id;
	});

	test('should get a room', async ({ request }) => {
		const response = await request.get(`${baseUrl}/api/room/${roomId}`);
		await expect(response).toBeOK();
	});

	test('should delete a room', async ({ request }) => {
		const response = await request.delete(`${baseUrl}/api/room/${roomId}`);
		expect(response).toBeOK();
	});

	test('should fail getting a room', async ({ request }) => {
		const response = await request.get(`${baseUrl}/api/room/${roomId}`);
		expect(response.status()).toBe(404);
	});
});

// test('should create and a delete room', async ({ request }) => {
// 	// create room
// 	const response = await request.post(`${apiUrl}/room`);

//     expect(response).toBeOK();

// 	const room = await response.json();

// 	// delete room
// 	const deletedRoom = await request.delete(`${apiUrl}/room/${room.room_id}`);

// 	expect(response).toBeOK();
// });

// return room id from request, to be used on next test
// test('should create a room', async ({ request }) => {
// 	const response = await request.post(`${apiUrl}/room`);
// 	await expect(response).toBeOK();
// });

// test('should delete a room', async ({ request }) => {
// 	const response = await request.delete(`${apiUrl}/room/2`);
// 	await expect(response).toBeOK();
// });

// test('should fail getting a room', async ({ request }) => {
// 	const response = await request.get(`${apiUrl}/room/NotFound`);
// 	expect(response.status()).toBe(500);
// });
