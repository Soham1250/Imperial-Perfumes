import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Use NEXTAUTH_SECRET for JWT signing
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'imperial-perfumes-jwt-secret';

// Hardcoded users - completely bypassing the database
const VALID_USERS = {
  'admin@imperialperfumes.com': {
    password: 'Admin@123',
    userData: {
      _id: '1',
      name: 'Admin User',
      email: 'admin@imperialperfumes.com',
      role: 'admin'
    }
  },
  'customer@example.com': {
    password: 'Customer@123',
    userData: {
      _id: '2',
      name: 'Test Customer',
      email: 'customer@example.com',
      role: 'customer'
    }
  },
  'soham@imperialperfumes.com': {
    password: 'Soham@123',
    userData: {
      _id: '3',
      name: 'Soham Pansare',
      email: 'soham@imperialperfumes.com',
      role: 'admin'
    }
  }
};

export async function POST(request) {
  try {
    console.log("Direct login attempt started");
    
    // Get request body
    const { email, password } = await request.json();
    console.log("Login attempt for:", email);
    
    // Check if user exists in our hardcoded list
    const userRecord = VALID_USERS[email];
    if (!userRecord) {
      console.log("User not found in hardcoded list");
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password (direct string comparison)
    if (password !== userRecord.password) {
      console.log("Password mismatch");
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log("Login successful for:", email);
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: userRecord.userData._id, 
        email: userRecord.userData.email, 
        role: userRecord.userData.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Set cookie
    cookies().set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict'
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userRecord.userData
    });
    
  } catch (error) {
    console.error("Direct login error:", error);
    return NextResponse.json(
      { success: false, message: 'Login failed: ' + error.message },
      { status: 500 }
    );
  }
}
