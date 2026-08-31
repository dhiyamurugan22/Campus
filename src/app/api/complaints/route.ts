import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, the userId would be extracted from the session
    // For this demo, we'll assign a placeholder or use the provided one
    const userId = body.userId || 'demo-user-id';

    const newComplaint = await prisma.complaint.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        location: body.location,
        isAnonymous: body.isAnonymous || false,
        userId: userId, 
      }
    });

    return NextResponse.json({ success: true, data: newComplaint });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json({ success: false, error: 'Failed to create complaint' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Only allow fetching if a userId is provided (users can only see their own complaints)
    // In production, get this from the session
    if (!userId) {
       return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const complaints = await prisma.complaint.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: complaints });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch complaints' }, { status: 500 });
  }
}
