'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { toast } from 'react-hot-toast'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size?: string) => void
  updateQuantity: (id: string, quantity: number, size?: string) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  
  // Fetch cart from API when user changes
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      
      if (user) {
        // User is logged in, fetch cart from API
        try {
          const response = await fetch('/api/cart')
          const data = await response.json()
          
          if (data.success) {
            setItems(data.cart.items)
          } else {
            console.error('Failed to fetch cart:', data.message)
            // Fall back to local storage
            loadCartFromLocalStorage()
          }
        } catch (error) {
          console.error('Error fetching cart:', error)
          // Fall back to local storage
          loadCartFromLocalStorage()
        }
      } else {
        // User is not logged in, load from localStorage
        loadCartFromLocalStorage()
      }
      
      setLoading(false)
    }
    
    const loadCartFromLocalStorage = () => {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart))
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error)
          setItems([])
        }
      }
    }
    
    fetchCart()
  }, [user])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items))
    } else {
      localStorage.removeItem('cart')
    }
  }, [items])
  
  const syncWithDatabase = async (newItems: CartItem[]) => {
    if (!user) return // Only sync if user is logged in
    
    // We don't need to implement the full sync logic here
    // The API endpoints will handle the cart operations
  }
  
  const addItem = async (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists with same ID and size
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      )
      
      let updatedItems: CartItem[]
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
      } else {
        // Add new item
        updatedItems = [...prevItems, newItem]
      }
      
      // If user is logged in, sync with database
      if (user) {
        fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: newItem.id,
            quantity: newItem.quantity,
            size: newItem.size
          }),
        }).catch(error => {
          console.error('Error syncing cart with database:', error)
          toast.error('Failed to sync cart with your account')
        })
      }
      
      return updatedItems
    })
  }
  
  const removeItem = async (id: string, size?: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(item => !(item.id === id && item.size === size))
      
      // If user is logged in, sync with database
      if (user) {
        const queryParams = new URLSearchParams()
        queryParams.append('productId', id)
        if (size) queryParams.append('size', size)
        
        fetch(`/api/cart?${queryParams.toString()}`, {
          method: 'DELETE',
        }).catch(error => {
          console.error('Error removing item from database:', error)
          toast.error('Failed to sync cart with your account')
        })
      }
      
      return updatedItems
    })
  }
  
  const updateQuantity = async (id: string, quantity: number, size?: string) => {
    if (quantity < 1) return
    
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
      
      // If user is logged in, sync with database
      if (user) {
        fetch('/api/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: id,
            quantity,
            size
          }),
        }).catch(error => {
          console.error('Error updating item in database:', error)
          toast.error('Failed to sync cart with your account')
        })
      }
      
      return updatedItems
    })
  }
  
  const clearCart = async () => {
    setItems([])
    localStorage.removeItem('cart')
    
    // If user is logged in, clear cart in database
    if (user) {
      try {
        // We would need to create a clear cart endpoint
        // For now, we'll just remove each item individually
        for (const item of items) {
          const queryParams = new URLSearchParams()
          queryParams.append('productId', item.id)
          if (item.size) queryParams.append('size', item.size)
          
          await fetch(`/api/cart?${queryParams.toString()}`, {
            method: 'DELETE',
          })
        }
      } catch (error) {
        console.error('Error clearing cart in database:', error)
        toast.error('Failed to sync cart with your account')
      }
    }
  }
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  )
  
  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      loading
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
