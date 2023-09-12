import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000';

test.describe.serial('Create/get/delete/noGet', () => {
	let roomId: number;

	test('should create a room', async ({ request }) => {
		const response = await request.post(`${baseUrl}/api/room`);
		const responseBody = await response.json();
		await expect(response).toBeOK();
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

test('should fail getting a room', async ({ request }) => {
	const response = await request.get(`${baseUrl}/api/room/9999`);
	expect(response.status()).toBe(404);
});