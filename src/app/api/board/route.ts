import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.boardPost.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching board posts:', error);
    // For development/demo without a populated DB, fallback to mock data
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        success: true,
        data: [
          { id: '1', title: 'Annual Tech Hackathon 2026', category: 'EVENT', date: new Date('2026-10-15').toISOString(), organizer: 'Coding Club', _count: { registrations: 45 }, max: 100 },
          { id: '2', title: 'App Dev Internship Opportunity', category: 'OPPORTUNITY', date: null, organizer: 'Placement Cell', _count: { registrations: 12 }, max: null },
        ]
      });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch board posts' }, { status: 500 });
  }
}
