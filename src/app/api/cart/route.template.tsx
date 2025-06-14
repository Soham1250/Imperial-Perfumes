import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDatabase } from '@/db/connection';
import Cart from '@/models/cart.model';

// Use environment variable with no fallback in production
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Get user ID from auth token
 */
const getUserId = (request) => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) return null;
    
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};

export async function GET(request) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    await connectDatabase();
    
    // Find user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      return NextResponse.json({ success: true, cart: { items: [], totalItems: 0, totalPrice: 0 } });
    }
    
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error('Error in GET /api/cart:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { productId, quantity = 1 } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    await connectDatabase();
    
    // Find or create cart
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
    }
    
    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (itemIndex > -1) {
      // Update quantity if product exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({
        product: productId,
        quantity
      });
    }
    
    // Save cart
    await cart.save();
    
    // Return updated cart
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    
    return NextResponse.json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error('Error in POST /api/cart:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const userId = getUserId(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const clearAll = searchParams.get('clearAll') === 'true';
    
    if (!productId && !clearAll) {
      return NextResponse.json(
        { success: false, message: 'Product ID or clearAll parameter is required' },
        { status: 400 }
      );
    }
    
    await connectDatabase();
    
    // Find cart
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 }
      );
    }
    
    if (clearAll) {
      // Clear all items
      cart.items = [];
    } else {
      // Remove specific product
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );
    }
    
    // Save cart
    await cart.save();
    
    // Return updated cart
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    
    return NextResponse.json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error('Error in DELETE /api/cart:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
