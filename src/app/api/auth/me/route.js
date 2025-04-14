import { NextResponse } from 'next/server';
import User from '../../../../models/user.model';
import { connectDatabase } from '../../../../db/connection';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Secret key for JWT verification - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'imperial-perfumes-jwt-secret';

export async function GET() {
  try {
    // Get token from cookies
    const token = cookies().get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Connect to database
    await connectDatabase();
    
    // Find user
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
