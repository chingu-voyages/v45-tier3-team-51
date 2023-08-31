import { NextRequest, NextResponse } from 'next/server';
import { createRoom } from '@/app/api/room/createRoom';

export async function middleware(request: NextRequest, response: NextResponse) {
	// Check if request url matches EXACTLY /room
	if (request.nextUrl.pathname.match('^/room$')) {
		const roomId = await createRoom();
		if (roomId) {
			// on successful redirect, browser history will reflect / -> /room/room_id
			return NextResponse.redirect(new URL(`/room/${roomId}`, request.url));
		} else {
			// if create room has failed on first and on retries, then provide error.
			return NextResponse.redirect(new URL(`/error`, request.url));
		}
	}

	/* 
	Todo: 
	Place condition to prevent access to rooms that don't exist. 
	Currently, browser history and hardtyping url for any room_id that doesn't exist in db does 
	not raise an error. Resolution will also cover edge case where an old share link is used.

	if url is ^/room/[0-9]+$
		check to see if room exists
	*/

	/*
	Condition access to only accept outside api access explicity from cron?
	*/
}

export const config = {
	// Prevent url access to the api folder, static files, images, and icons within the pages directory
	// matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
