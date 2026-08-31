import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'listings';

    if (type === 'requests') {
      const requests = await prisma.thriftRequest.findMany({
        where: { status: 'ACTIVE' },
        include: { user: { select: { name: true, department: true, yearOfStudy: true } } },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json({ success: true, data: requests });
    }

    // Default to listings
    const listings = await prisma.thriftListing.findMany({
      where: { status: 'ACTIVE' },
      include: { user: { select: { name: true, department: true, yearOfStudy: true } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: listings });
  } catch (error) {
    console.error('Error fetching thrift items:', error);
    // For development/demo without a populated DB, fallback to mock data
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        success: true,
        data: [
          { id: '1', title: 'Engineering Mathematics Vol 2', category: 'Books', price: 400, condition: 'Good', isFree: false, user: { name: 'Rahul K.', department: 'CSE', yearOfStudy: '2nd Yr' } },
          { id: '2', title: 'Drafter & ED Kit', category: 'Equipment', price: null, condition: 'Used', isFree: true, user: { name: 'Sneha P.', department: 'Mech', yearOfStudy: '3rd Yr' } },
          { id: '3', title: 'Casio fx-991EX Calculator', category: 'Electronics', price: 800, condition: 'Like New', isFree: false, user: { name: 'Arjun S.', department: 'ECE', yearOfStudy: '4th Yr' } },
        ]
      });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch thrift items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Simplified POST for demonstration purposes
    
    // Check if it's a listing or request
    if (body.type === 'request') {
      const newRequest = await prisma.thriftRequest.create({
        data: {
          itemRequired: body.title,
          description: body.description,
          category: body.category,
          userId: body.userId, // Requires auth in a real app
        }
      });
      return NextResponse.json({ success: true, data: newRequest });
    }

    const newListing = await prisma.thriftListing.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        condition: body.condition,
        price: body.price,
        isFree: body.isFree,
        userId: body.userId, // Requires auth in a real app
      }
    });

    return NextResponse.json({ success: true, data: newListing });
  } catch (error) {
    console.error('Error creating thrift item:', error);
    return NextResponse.json({ success: false, error: 'Failed to create item' }, { status: 500 });
  }
}
