import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.academicEvent.findMany({
      orderBy: { date: 'asc' }
    });

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching academic events:', error);
    // For development/demo without a populated DB, fallback to mock data
    if (process.env.NODE_ENV !== 'production') {
      const today = new Date();
      const event1 = new Date(today);
      event1.setDate(event1.getDate() + 2);
      const event2 = new Date(today);
      event2.setDate(event2.getDate() + 5);

      return NextResponse.json({
        success: true,
        data: [
          { id: '1', title: 'Compiler Design Assignment', category: 'ASSIGNMENT', date: event1.toISOString() },
          { id: '2', title: 'Midterm Lab Exams', category: 'EXAM', date: event2.toISOString() },
        ]
      });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch academic events' }, { status: 500 });
  }
}
