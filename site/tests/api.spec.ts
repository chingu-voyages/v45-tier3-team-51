import { test, expect } from '@playwright/test';

const apiUrl = 'http://localhost:3000/api';

test.describe.serial('Generate a new room', () => {
    let roomId: number;

    test('should create a room', async ({ request }) => {
        const response = await request.post(`${apiUrl}/room`);
        const responseBody = await response.json();
        await expect(response).toBeOK();
        roomId = responseBody.room_id;
    });

    test('should get a room', async ({ request }) => {
        const response = await request.get(`${apiUrl}/room/${roomId}`);
        await expect(response).toBeOK();
    });

    test('should delete a room', async ({ request }) => {
        const response = await request.delete(`${apiUrl}/room/${roomId}`);
        console.log(response.status());
        await expect(response).toBeOK();
    });

    test('should fail getting a room', async ({ request }) => {
        const response = await request.get(`${apiUrl}/room/${roomId}`);
        expect(response.status()).toBe(404);
    });
});





