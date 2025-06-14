import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Use NEXTAUTH_SECRET for JWT verification
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'imperial-perfumes-jwt-secret';

// Hard-coded user data for reliable authentication
const USERS = {
  '1': {
    _id: '1',
    name: 'Admin User',
    email: 'admin@imperialperfumes.com',
    role: 'admin'
  },
  '2': {
    _id: '2',
    name: 'Test Customer',
    email: 'customer@example.com',
    role: 'customer'
  },
  '3': {
    _id: '3',
    name: 'Soham Pansare',
    email: 'soham@imperialperfumes.com',
    role: 'admin'
  }
};

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
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log("Token decoded:", decoded);
    } catch (verifyError) {
      console.error("Token verification error:", verifyError);
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Find user in hard-coded data
    const user = USERS[decoded.id];
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
