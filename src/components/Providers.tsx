'use client'

import { ReactNode } from 'react'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster as ShadcnToaster } from '@/components/ui/toaster'
import { Toaster as HotToaster } from 'react-hot-toast'
import AuthModal from './auth/AuthModal'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <AuthModal />
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
    </AuthProvider>
  )
}
