'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OrderSuccessPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  // Generate a random order number
  const orderNumber = `IP${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`
  
  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="blck-card p-8 md:p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                className="w-20 h-20 rounded-full bg-blck-accent/20 flex items-center justify-center"
              >
                <CheckCircle size={40} className="text-blck-accent" />
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-4xl font-serif font-bold text-blck-silver mb-4"
            >
              Order Confirmed!
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-blck-textMuted mb-8"
            >
              Thank you for your purchase. Your order has been received and is now being processed.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-blck-purple/30 p-6 rounded-md mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm mb-1">Order Number</p>
                  <p className="text-blck-gold font-medium">{orderNumber}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Order Date</p>
                  <p className="text-white">{new Date().toLocaleDateString('en-IN')}</p>
                </div>
                
                <div className="text-center md:text-right">
                  <p className="text-gray-400 text-sm mb-1">Estimated Delivery</p>
                  <p className="text-white">3-5 Business Days</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-xl font-medium text-blck-silver mb-4">What's Next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blck-purple/20 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Package size={18} className="text-blck-gold mr-2" />
                    <span className="text-blck-silver">Order Processing</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    We're preparing your order for shipment. You'll receive an email once it's on its way.
                  </p>
                </div>
                
                <div className="bg-blck-purple/20 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-blck-gold mr-2" />
                    <span className="text-blck-silver">Delivery Schedule</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Your order will be delivered within 3-5 business days to your specified address.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col md:flex-row justify-center gap-4"
            >
              <Button 
                onClick={() => router.push('/shop')}
                className="bg-transparent border border-blck-silver hover:bg-blck-purple text-blck-silver py-3 px-8 rounded-md transition-colors"
              >
                Continue Shopping
              </Button>
              
              <Button 
                onClick={() => router.push('/')}
                className="bg-blck-accent hover:bg-blck-accent/80 text-white py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
              >
                Back to Home
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-8 text-sm text-gray-400"
          >
            <p>Have questions about your order?</p>
            <p>Contact us at <span className="text-blck-silver">official.imperialperfumes@gmail.com</span></p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
