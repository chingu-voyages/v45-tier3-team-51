import { test, expect } from '@playwright/test';
import { getBaseUrl } from '../src/lib/server/getBaseUrl';

const url = getBaseUrl();

const titleContent = 'Break the ice with fun questions!';

// test('basic test', async ({ page }) => {
// 	await page.goto(url);
// 	const title = page.locator('.mantine-Title-root');
// 	await expect(title).toHaveText(titleContent);
// });

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
	const regexRoomUrl = new RegExp(`${url}/room/[0-9]+`);

	button.click();

	await page.waitForURL(regexRoomUrl);

	await expect(page).toHaveURL(regexRoomUrl);
});

test('room page contains a shareable room url', async ({ page }) => {
	await page.goto(url);

	const button = page.getByRole('button', { name: 'Create Room' });
	const regexRoomUrl = new RegExp(`${url}/room/[0-9]+`);

	button.click();

	await page.waitForURL(regexRoomUrl);

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

test('game works properly', async ({ page }) => {
	page.goto(url);

	const createButton = page.getByRole('button', { name: 'Create Room' });
	await createButton.click();

	const regexRoomUrl = new RegExp(`${url}/room/[0-9]+`);

	await page.waitForURL(regexRoomUrl);

	const startButton = page.getByRole('button', { name: 'Start Game' });
	await startButton.click();

	const nxtButton = page.getByRole('button', { name: 'Next question' });
	await nxtButton.waitFor({ timeout: 5000 });

	let finishButtonFound = false;
	while (!finishButtonFound) {
		const finishButton = await page.$('button:has-text("finish")');

		if (finishButton) {
			finishButtonFound = true;
		}
		else {
			const question = page.locator('h1.mantine-Text-root');
			await expect(question).toBeVisible();

			const nextButton = page.getByRole('button', { name: 'Next question' });
			await expect(nextButton).toBeVisible();
			await expect(nextButton).toBeEnabled();
			await nextButton.click();
			await page.waitForTimeout(3000);
		}
	}
	const finishButton = page.getByRole('button', { name: 'finish' });
	await finishButton.click();

	await page.waitForTimeout(3000);

	const finishText = page.locator('h1.mantine-Text-root');
	await expect(finishText).toBeVisible();
	await expect(finishText).toHaveText('Thanks for playing!');
});

test('pusher works properly', async ({ browser, context }) => {
	const firstPage = await context.newPage();
	await firstPage.goto(url);

	const button = firstPage.getByRole('button', { name: 'Create Room' });
	await button.click();

	const regexRoomUrl = new RegExp(`${url}/room/[0-9]+`);
	await firstPage.waitForURL(regexRoomUrl);

	const copyButton = firstPage.getByRole('button', { name: 'Copy' });

	await copyButton.click();

	const clipboardText = await firstPage.evaluate(async () => {
		return navigator.clipboard.readText();
	});

	const secondPage = await context.newPage();
	await secondPage.goto(clipboardText);

	const startButton = firstPage.getByRole('button', { name: 'Start Game' });
	await startButton.click();

	const nxtButton = firstPage.getByRole('button', { name: 'Next question' });
	await nxtButton.waitFor({ timeout: 5000 });

	let finishButtonFound = false;
	while (!finishButtonFound) {
		const finishButton = await firstPage.$('button:has-text("finish")');

		if (finishButton) {
			finishButtonFound = true;
		}
		else {
			const question1 = await firstPage.locator('h1.mantine-Text-root').textContent();
			const question2 = await secondPage.locator('h1.mantine-Text-root').textContent();
			expect(question1 === question2).toBe(true);

			const nextButton = firstPage.getByRole('button', { name: 'Next question' });
			await nextButton.click();
			await firstPage.waitForTimeout(3000);
		}
	}
	const finishButton = firstPage.getByRole('button', { name: 'finish' });
	await finishButton.click();

	await firstPage.waitForTimeout(3000);

	const finishText1 = await firstPage.locator('h1.mantine-Text-root').textContent();
	const finishText2 = await secondPage.locator('h1.mantine-Text-root').textContent();
	expect(finishText1 === finishText2).toBe(true);

});