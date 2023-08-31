import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Delete all rooms that have exceeded a 24 hour lifespan
export async function DELETE(req: Request) {
	// find many first, then delete

	// find and delete in one go
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

/*
if (Date.now - created_at date) > 24 hours -> delete

created_at < date.now - 24

date.now - 24 > created_at

*/
