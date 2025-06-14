import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
// Import the shared auth utility
import { comparePassword } from '../../../../utils/auth';

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/imperial-perfumes';

// Import the User model with the correct filename
import User from '../../../../models/user.model'; // Note: filename is user.model.js

export async function POST(request) {
  try {
    console.log("Simple login attempt started");
    
    // Connect to MongoDB directly
    if (!mongoose.connection.readyState) {
      console.log("Connecting to MongoDB...");
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB");
    } else {
      console.log("Already connected to MongoDB");
    }
    
    // Get request body
    const { email, password } = await request.json();
    console.log("Login attempt for:", email);
    
    // Find user using the imported User model
    const user = await User.findOne({ email }).select('+password').lean();
    
    if (!user) {
      console.log("User not found");
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log("User found:", user.email);
    console.log("Password from DB exists:", !!user.password);
    
    // Use the shared comparePassword utility
    console.log("Using shared comparePassword utility");
    const isMatch = await comparePassword(password, user.password);
    console.log("Password match:", isMatch);
    
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Success response (no JWT for simplicity)
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error("Simple login error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Login failed: ' + error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
