import { NextResponse } from 'next/server';
// Dynamically import the User model (CommonJS)
const User = require('../../../../models/user.model');
import { connectDatabase } from '../../../../db/connection';
// Import the shared auth utility
const { hashPassword } = require('../../../../utils/auth');

export async function POST(request) {
  try {
    // Connect to database with better error handling
    try {
      await connectDatabase();
      console.log('Database connected successfully for registration');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Database connection failed. Please try again later.' },
        { status: 500 }
      );
    }
    
    // Parse request body with error handling
    let name, email, password;
    try {
      const body = await request.json();
      name = body.name;
      email = body.email;
      password = body.password;
      
      if (!name || !email || !password) {
        return NextResponse.json(
          { success: false, message: 'Name, email and password are required' },
          { status: 400 }
        );
      }
    } catch (parseError) {
      console.error('Request parsing error:', parseError);
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Create new user with detailed error logging
    try {
      const user = await User.create({
        name,
        email,
        password, // Password will be hashed by the pre-save hook in the model
        isVerified: true // For simplicity, auto-verify users
      });
      
      // Remove password from response
      const userResponse = user.toObject();
      delete userResponse.password;
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Registration successful', 
          user: userResponse 
        },
        { status: 201 }
      );
    } catch (userCreationError) {
      console.error('User creation error details:', userCreationError);
      
      // Check for validation errors
      if (userCreationError.name === 'ValidationError') {
        const validationErrors = Object.values(userCreationError.errors).map(err => err.message);
        return NextResponse.json(
          { success: false, message: 'Validation failed', errors: validationErrors },
          { status: 400 }
        );
      }
      
      // Check for duplicate key error
      if (userCreationError.code === 11000) {
        return NextResponse.json(
          { success: false, message: 'Email already exists' },
          { status: 400 }
        );
      }
      
      throw userCreationError; // Re-throw for general error handling
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed: ' + error.message },
      { status: 500 }
    );
  }
}
