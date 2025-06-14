import { NextResponse } from 'next/server';
import { connectDatabase } from '@/db/connection';
import Cart from '@/models/cart.model';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Secret key for JWT verification - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'imperial-perfumes-jwt-secret';

// Helper to get user ID from auth token
const getUserId = async () => {
  const token = cookies().get('auth_token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

// GET - Fetch user's cart
export async function GET() {
  try {
    await connectDatabase();
    
    // Get user ID from token
    const userId = await getUserId();
    
    // If no user is logged in, return empty cart
    if (!userId) {
      return NextResponse.json({ 
        success: true, 
        cart: { items: [], subtotal: 0 }
      });
    }
    
    // Find or create cart for user
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    
    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: cart.subtotal
      }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(request) {
  try {
    await connectDatabase();
    
    // Get user ID from token
    const userId = await getUserId();
    
    // If no user is logged in, return error
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get item details from request
    const { productId, quantity, size } = await request.json();
    
    if (!productId || !quantity) {
      return NextResponse.json(
        { success: false, message: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }
    
    // Find or create cart for user
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    
    // Add item to cart
    await cart.addItem(productId, quantity, size);
    
    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: cart.subtotal
      }
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// PUT - Update cart item
export async function PUT(request) {
  try {
    await connectDatabase();
    
    // Get user ID from token
    const userId = await getUserId();
    
    // If no user is logged in, return error
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get item details from request
    const { productId, quantity, size } = await request.json();
    
    if (!productId || !quantity) {
      return NextResponse.json(
        { success: false, message: 'Product ID and quantity are required' },
        { status: 400 }
      );
    }
    
    // Find cart for user
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Update item quantity
    await cart.updateItem(productId, quantity, size);
    
    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: cart.subtotal
      }
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update cart item' },
      { status: 500 }
    );
  }
}

// DELETE - Remove item from cart
export async function DELETE(request) {
  try {
    await connectDatabase();
    
    // Get user ID from token
    const userId = await getUserId();
    
    // If no user is logged in, return error
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get item details from URL
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const size = searchParams.get('size');
    
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Find cart for user
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }
    
    // Remove item from cart
    await cart.removeItem(productId, size);
    
    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items,
        subtotal: cart.subtotal
      }
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
