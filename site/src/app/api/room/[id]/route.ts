import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: Request, { params }: { params: { id: string } }, res: NextApiResponse) {
	const id = params.id;

	try {
		const room = await prisma.rooms.findUnique({
			where: {
				room_id: parseInt(id),
			},
		});

		if (!room) {
			return new NextResponse('No room with ID found', { status: 404 });
		}

		return NextResponse.json(room.room_id);
	} catch (error) {
		return new NextResponse('Error fetching room', { status: 500 });
	}
}

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	try {
		const res = await prisma.rooms.delete({
			where: {
				room_id: parseInt(id),
			},
		});
		return NextResponse.json({ status: 204 });
	} catch (error) {
		return new NextResponse('Error deleting a room', { status: 404 });
	}
}
