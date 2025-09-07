import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function POST(
  req: Request,
) {
  try {
    const session = await auth();
    const userId = session?.userId;

    // Ensure the request is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { email, fullName } = await req.json();

    // Validate the required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Here you would typically save to your database
    // For now, we'll just return a success response
    return NextResponse.json({ 
      message: 'User data saved successfully',
      user: { userId, email, fullName }
    });

  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
