import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const new_room = await prisma.rooms.create({
			data: {
				current_question: 0,
			},
		});

		return NextResponse.json({
			room_id: new_room.room_id,
		});
	} catch (error) {
		console.error(`Error creating room: `, error);
		return new NextResponse('Error creating room', { status: 500 });
	}
}
