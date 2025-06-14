import { NextResponse } from 'next/server';
import { connectDatabase } from '../../../db/connection';

export async function GET() {
  try {
    console.log("Test route: Connecting to database...");
    await connectDatabase();
    console.log("Test route: Database connected successfully");
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        nodeEnv: process.env.NODE_ENV
      }
    });
  } catch (error) {
    console.error("Test route error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Test failed',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
