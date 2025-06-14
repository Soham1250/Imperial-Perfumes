import { NextResponse } from 'next/server';

// Super simple login endpoint with no dependencies
export async function POST(request) {
  try {
    console.log("Test login attempt started");
    
    // Parse request body
    let email, password;
    try {
      const body = await request.json();
      email = body.email;
      password = body.password;
      console.log("Login attempt for:", email, password);
    } catch (parseError) {
      console.error("Request parsing error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid request format" },
        { status: 400 }
      );
    }
    
    // Hardcoded credentials check
    if (
      (email === 'admin@imperialperfumes.com' && password === 'Admin@123') ||
      (email === 'customer@example.com' && password === 'Customer@123') ||
      (email === 'soham@imperialperfumes.com' && password === 'Soham@123')
    ) {
      console.log("Login successful");
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          name: email.split('@')[0],
          email: email,
          role: email.includes('admin') ? 'admin' : 'customer'
        }
      });
    } else {
      console.log("Invalid credentials");
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Test login error:", error);
    return NextResponse.json(
      { success: false, message: error.message || 'Login failed' },
      { status: 500 }
    );
  }
}
