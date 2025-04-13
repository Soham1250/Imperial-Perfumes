'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  const handleQuantityChange = (id: string, quantity: number, size?: string) => {
    if (quantity < 1) return
    updateQuantity(id, quantity, size)
  }
  
  const handleRemoveItem = (id: string, size?: string) => {
    removeItem(id, size)
  }
  
  // Calculate shipping cost (free over ₹1000)
  const shippingCost = subtotal >= 1000 ? 0 : 100
  
  // Calculate total
  const total = subtotal + shippingCost
  
  return (
    <div className="bg-blck-darkPurple min-h-screen text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="fade-in mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            <span className="text-gradient-gold">Your</span> Cart
          </h1>
          <p className="text-blck-textMuted">Review your items before proceeding to checkout</p>
        </div>
        
        {items.length === 0 ? (
          <div className="fade-in text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blck-card rounded-full mb-6">
              <ShoppingBag size={32} className="text-blck-gold" />
            </div>
            <h2 className="text-2xl font-serif font-medium mb-4 text-blck-silver">Your cart is empty</h2>
            <p className="text-blck-textMuted max-w-md mx-auto mb-8">
              Looks like you haven't added any perfumes to your cart yet. 
              Explore our collection to find your perfect scent.
            </p>
            <Link href="/shop">
              <Button variant="blck" size="lg">
                Browse Collection
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.size || 'default'}`}
                  className="fade-in bg-blck-card rounded-lg overflow-hidden mb-4 hover:shadow-md hover:shadow-blck-accent/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-4 flex items-center">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.image || "/images/imperial rogue.png"} 
                        alt={item.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-blck-silver">{item.name}</h3>
                      {item.size && (
                        <p className="text-sm text-blck-textMuted">Size: {item.size}</p>
                      )}
                      <p className="text-blck-gold mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-blck-purple rounded-md">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.size)}
                          className="px-2 py-1 text-blck-textMuted hover:text-blck-silver transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        
                        <span className="w-8 text-center text-blck-silver">{item.quantity}</span>
                        
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.size)}
                          className="px-2 py-1 text-blck-textMuted hover:text-blck-silver transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="text-blck-textMuted hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="fade-in" style={{ animationDelay: '500ms' }}>
                <button 
                  onClick={clearCart}
                  className="text-sm text-blck-textMuted hover:text-blck-gold transition-colors mt-4 flex items-center"
                >
                  <Trash2 size={14} className="mr-2" />
                  Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="fade-in bg-blck-card rounded-lg p-6" style={{ animationDelay: '300ms' }}>
              <h2 className="text-xl font-serif font-medium mb-6 text-blck-silver">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-blck-textMuted">Subtotal</span>
                  <span className="text-blck-silver">₹{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-blck-textMuted">Shipping</span>
                  <span className="text-blck-silver">
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                {shippingCost > 0 && (
                  <div className="text-sm text-blck-textMuted pt-1">
                    Add ₹{(1000 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                
                <div className="border-t border-blck-purple pt-4 flex justify-between font-medium">
                  <span className="text-blck-textMuted">Total</span>
                  <span className="text-blck-gold">₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => router.push('/checkout')}
                variant="blck"
                size="lg"
                className="w-full group"
              >
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-blck-silver mb-3">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-blck-purple rounded flex items-center justify-center">
                    <span className="text-xs text-blck-silver">Visa</span>
                  </div>
                  <div className="w-10 h-6 bg-blck-purple rounded flex items-center justify-center">
                    <span className="text-xs text-blck-silver">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-blck-purple rounded flex items-center justify-center">
                    <span className="text-xs text-blck-silver">UPI</span>
                  </div>
                  <div className="w-10 h-6 bg-blck-purple rounded flex items-center justify-center">
                    <span className="text-xs text-blck-silver">PP</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-blck-textMuted">
                <p className="mb-2">Need assistance? Contact us:</p>
                <p>official.imperialperfumes@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
