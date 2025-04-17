import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Use NEXTAUTH_SECRET for JWT signing
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'imperial-perfumes-jwt-secret';

// Simple SHA-256 hash function
function hashPassword(password) {
  try {
    console.log("Hashing password:", password);
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const result = hash.digest('hex');
    console.log("Hashed result:", result);
    return result;
  } catch (error) {
    console.error("Error hashing password:", error);
    return "";
  }
}

// Hard-coded user data for reliable authentication
const USERS = {
  'admin@imperialperfumes.com': {
    password: hashPassword('Admin@123'),
    userData: {
      _id: '1',
      name: 'Admin User',
      email: 'admin@imperialperfumes.com',
      role: 'admin'
    }
  },
  'customer@example.com': {
    password: hashPassword('Customer@123'),
    userData: {
      _id: '2',
      name: 'Test Customer',
      email: 'customer@example.com',
      role: 'customer'
    }
  },
  'soham@imperialperfumes.com': {
    password: hashPassword('Soham@123'),
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
    console.log("Login attempt started");
    
    // Parse request body
    let email, password;
    try {
      const body = await request.json();
      email = body.email;
      password = body.password;
      console.log("Login attempt for email:", email);
    } catch (parseError) {
      console.error("Request parsing error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid request format" },
        { status: 400 }
      );
    }
    
    // Find user in hard-coded data
    const user = USERS[email];
    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password
    const hashedPassword = hashPassword(password);
    console.log("Password check:", {
      inputPassword: password,
      hashedInput: hashedPassword,
      storedHash: user.password
    });
    
    const isMatch = hashedPassword === user.password;
    console.log("Password match:", isMatch);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // For debugging, return success without JWT
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: user.userData
    });
    
    /* Temporarily comment out JWT code to isolate the issue
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.userData._id, 
        email: user.userData.email, 
        role: user.userData.role 
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
    
    // Success response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: user.userData
    });
    */
  } catch (error) {
    console.error('Login error details:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
