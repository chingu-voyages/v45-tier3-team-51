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

export async function DELETE(req: Request) {
	try {
		const res = await prisma.rooms.deleteMany({
			where: {
				created_at: {
					// 24 * 60 * 30 * 1000 = 86400000 miliseconds = 24 hours
					// 30,000 = 30 seconds for testing
					lte: new Date(Date.now() - 30000),
				},
			},
		});
		console.log('successfully deleted expired rooms!');
		return NextResponse.json(res);
	} catch (error) {
		console.error(`Error deleting expired rooms`, error);
		return new NextResponse('Error deleting expired rooms', { status: 500 });
	}
}
