'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/context/CartContext'
import { Toaster as ShadcnToaster } from '@/components/ui/toaster'
import { Toaster as HotToaster } from 'react-hot-toast'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      {children}
      <ShadcnToaster />
      <HotToaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2D1133',
            color: '#FFFFFF',
            border: '1px solid #8A2BE2',
          },
          success: {
            iconTheme: {
              primary: '#8A2BE2',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </CartProvider>
  )
}
