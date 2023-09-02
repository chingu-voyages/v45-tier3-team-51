import { test, expect } from '@playwright/test';

const apiUrl = 'http://localhost:3000/api';

test('should create a room', async ({ request }) => {
    const response = await request.post(`${apiUrl}/room`);
    await expect(response).toBeOK();
});

test('should get a room', async ({ request }) => {
    const response = await request.get(`${apiUrl}/room/2`);
    await expect(response).toBeOK();
});

test('should delete a room', async ({ request }) => {
    const response = await request.delete(`${apiUrl}/room/2`);
    await expect(response).toBeOK();
});

test('should fail getting a room', async ({ request }) => {
    const response = await request.get(`${apiUrl}/room/NotFound`);
    expect(response.status()).toBe(500);
});