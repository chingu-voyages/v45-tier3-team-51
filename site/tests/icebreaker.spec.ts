import { test, expect } from '@playwright/test';

// const url = 'https://chingu.sabih.me/';
const url = 'http://localhost:3000/';

const titleContent = 'Break the ice with fun questions!';

test('load the landing page succesfully', async ({ page }) => {
	const response = await page.request.get(url);
	await expect(response).toBeOK();
});

test('page title exists and is correctly titled', async ({ page }) => {
	await page.goto(url);

	const title = page.locator('.mantine-Title-root');
	await expect(title).toHaveText(titleContent);
});

test('create button exists', async ({ page }) => {
	await page.goto(url);

	const button = page.getByRole('button', { name: 'Create Room' });

	await expect(button).toHaveCount(1);
	await expect(button).toBeVisible();
	await expect(button).toBeEnabled();

	await button.click();
});

test('create room button redirects you to the room page', async ({ page }) => {
	await page.goto(url);

	const button = page.getByRole('button', { name: 'Create Room' });

	button.click();

	const regexRoomUrl = new RegExp(`${url}room/[0-9]+`);

	await expect(page).toHaveURL(regexRoomUrl);
});

test('room page contains a shareable room url', async ({ page }) => {
	await page.goto(url);

	const button = page.getByRole('button', { name: 'Create Room' });

	button.click();

	const regexRoomUrl = new RegExp(`${url}room/[0-9]+`);

	const shareableUrl = page.getByText(regexRoomUrl);

	await expect(shareableUrl).toBeVisible();

	const copyButton = page.getByRole('button', { name: 'Copy' });

	await expect(copyButton).toBeVisible();
	await expect(copyButton).toBeEnabled();

	await copyButton.click();

	const clipboardText = await page.evaluate(async () => {
		return navigator.clipboard.readText();
	});

	expect(clipboardText).toEqual(page.url());
});
