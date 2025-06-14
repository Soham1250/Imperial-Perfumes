import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Use NEXTAUTH_SECRET for JWT signing
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'imperial-perfumes-jwt-secret';

// Hardcoded credentials for testing
const VALID_CREDENTIALS = [
  {
    email: 'admin@imperialperfumes.com',
    password: 'Admin@123',
    userData: {
      _id: '1',
      name: 'Admin User',
      email: 'admin@imperialperfumes.com',
      role: 'admin'
    }
  },
  {
    email: 'customer@example.com',
    password: 'Customer@123',
    userData: {
      _id: '2',
      name: 'Test Customer',
      email: 'customer@example.com',
      role: 'customer'
    }
  }
];

export async function POST(request) {
  try {
    console.log("Hardcoded login attempt started");
    
    // Get request body
    const { email, password } = await request.json();
    console.log("Login attempt for:", email);
    
    // Find matching credentials
    const user = VALID_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );
    
    if (!user) {
      console.log("Invalid credentials");
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log("Valid credentials found");
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.userData._id, email: user.userData.email, role: user.userData.role },
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
    
    // Success response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: user.userData
    });
    
  } catch (error) {
    console.error("Hardcoded login error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Login failed: ' + error.message
      },
      { status: 500 }
    );
  }
}
