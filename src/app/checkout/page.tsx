'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { ChevronRight, ChevronLeft, Check, CreditCard, Truck, MapPin, ShoppingBag } from 'lucide-react'

// Step components will be defined below
// Main checkout component
export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  
  // Form state
  const [formData, setFormData] = useState({
    // Customer details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping details
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Payment details
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    
    // Order notes
    notes: ''
  })
  
  // Handle hydration mismatch
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])
  
  // Calculate shipping cost (free over ₹1000)
  const shippingCost = subtotal >= 1000 ? 0 : 100
  
  // Calculate total
  const total = subtotal + shippingCost
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  const handleSubmitOrder = () => {
    // Here you would typically send the order to your backend
    // For now, we'll just simulate a successful order
    
    // Clear the cart
    clearCart()
    
    // Navigate to success page
    router.push('/checkout/success')
  }
  
  return (
    <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex text-sm">
              <Link href="/" className="text-blck-textMuted hover:text-blck-silver">Home</Link>
              <span className="mx-2 text-blck-textMuted">/</span>
              <Link href="/cart" className="text-blck-textMuted hover:text-blck-silver">Cart</Link>
              <span className="mx-2 text-blck-textMuted">/</span>
              <span className="text-blck-silver">Checkout</span>
            </nav>
          </div>
          
          {/* Checkout Progress */}
          <div className="mb-10 fade-in">
            <div className="flex justify-between items-center relative">
              {/* Progress bar */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-blck-purple -z-10 transform -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blck-accent to-blck-gold -z-5 transform -translate-y-1/2 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
              
              {/* Step 1: Information */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${currentStep >= 1 ? 'bg-blck-accent' : 'bg-blck-purple'}`}>
                  {currentStep > 1 ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <ShoppingBag size={18} className="text-white" />
                  )}
                </div>
                <span className={`text-sm ${currentStep >= 1 ? 'text-blck-silver' : 'text-blck-textMuted'}`}>Cart</span>
              </div>
              
              {/* Step 2: Shipping */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${currentStep >= 2 ? 'bg-blck-accent' : 'bg-blck-purple'}`}>
                  {currentStep > 2 ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <MapPin size={18} className="text-white" />
                  )}
                </div>
                <span className={`text-sm ${currentStep >= 2 ? 'text-blck-silver' : 'text-blck-textMuted'}`}>Shipping</span>
              </div>
              
              {/* Step 3: Payment */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${currentStep >= 3 ? 'bg-blck-accent' : 'bg-blck-purple'}`}>
                  {currentStep > 3 ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <CreditCard size={18} className="text-white" />
                  )}
                </div>
                <span className={`text-sm ${currentStep >= 3 ? 'text-blck-silver' : 'text-blck-textMuted'}`}>Payment</span>
              </div>
              
              {/* Step 4: Review */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 ${currentStep >= 4 ? 'bg-blck-accent' : 'bg-blck-purple'}`}>
                  <Check size={18} className="text-white" />
                </div>
                <span className={`text-sm ${currentStep >= 4 ? 'text-blck-silver' : 'text-blck-textMuted'}`}>Review</span>
              </div>
            </div>
          </div>
          
          <div className="blck-card p-8 md:p-12">
            {currentStep === 1 && (
              <CustomerInformationStep 
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
              />
            )}
            
            {currentStep === 2 && (
              <ShippingStep 
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <PaymentStep 
                formData={formData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            
            {currentStep === 4 && (
              <ReviewStep 
                formData={formData}
                items={items}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
                handleSubmitOrder={handleSubmitOrder}
                prevStep={prevStep}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 1: Customer Information
function CustomerInformationStep({ formData, handleInputChange, nextStep }: {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  nextStep: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif font-medium text-blck-silver mb-6">Customer Information</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blck-silver text-sm mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
              required
            />
          </div>
          <div>
            <label className="block text-blck-silver text-sm mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-blck-silver text-sm mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-blck-silver text-sm mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
            required
          />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={nextStep}
            className="w-full md:w-auto bg-blck-accent hover:bg-blck-accent/80 text-white py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            Continue to Shipping
            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 2: Shipping
function ShippingStep({ formData, handleInputChange, nextStep, prevStep }: {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif font-medium text-blck-silver mb-6">Shipping Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-blck-silver text-sm mb-2">Street Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-blck-silver text-sm mb-2">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
              required
            />
          </div>
          <div>
            <label className="block text-blck-silver text-sm mb-2">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-blck-silver text-sm mb-2">Pincode *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
            required
          />
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button 
            onClick={prevStep}
            className="bg-transparent border border-blck-silver hover:bg-blck-purple text-blck-silver py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </Button>
          
          <Button 
            onClick={nextStep}
            className="bg-blck-accent hover:bg-blck-accent/80 text-white py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            Continue to Payment
            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Payment
function PaymentStep({ formData, handleInputChange, nextStep, prevStep }: {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif font-medium text-blck-silver mb-6">Payment Information</h2>
      
      <div className="space-y-6">
        <div className="bg-blck-purple/50 p-4 rounded-md mb-6">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-blck-accent flex items-center justify-center mr-3">
              <Check size={14} className="text-white" />
            </div>
            <span className="text-blck-silver">Credit/Debit Card</span>
          </div>
          
          <div>
            <label className="block text-blck-silver text-sm mb-2">Name on Card *</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
              required
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-blck-silver text-sm mb-2">Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-blck-silver text-sm mb-2">Expiry Date *</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
                required
              />
            </div>
            <div>
              <label className="block text-blck-silver text-sm mb-2">CVV *</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="XXX"
                className="w-full p-3 bg-blck-purple border border-blck-purple rounded-md focus:outline-none focus:ring-2 focus:ring-blck-accent text-white"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="opacity-50">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-blck-purple flex items-center justify-center mr-3">
              <span className="text-white text-xs">2</span>
            </div>
            <span className="text-blck-silver">UPI Payment (Coming Soon)</span>
          </div>
        </div>
        
        <div className="opacity-50">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 rounded-full bg-blck-purple flex items-center justify-center mr-3">
              <span className="text-white text-xs">3</span>
            </div>
            <span className="text-blck-silver">Cash on Delivery (Coming Soon)</span>
          </div>
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button 
            onClick={prevStep}
            className="bg-transparent border border-blck-silver hover:bg-blck-purple text-blck-silver py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </Button>
          
          <Button 
            onClick={nextStep}
            className="bg-blck-accent hover:bg-blck-accent/80 text-white py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            Review Order
            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Step 4: Review
function ReviewStep({ formData, items, subtotal, shippingCost, total, handleSubmitOrder, prevStep }: {
  formData: any;
  items: any[];
  subtotal: number;
  shippingCost: number;
  total: number;
  handleSubmitOrder: () => void;
  prevStep: () => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-serif font-medium text-blck-silver mb-6">Review Your Order</h2>
      
      <div className="space-y-8">
        {/* Customer Information */}
        <div>
          <h3 className="text-lg font-medium text-blck-silver mb-3">Customer Information</h3>
          <div className="bg-blck-purple/30 p-4 rounded-md">
            <p className="text-white">{formData.firstName} {formData.lastName}</p>
            <p className="text-gray-400">{formData.email}</p>
            <p className="text-gray-400">{formData.phone}</p>
          </div>
        </div>
        
        {/* Shipping Information */}
        <div>
          <h3 className="text-lg font-medium text-blck-silver mb-3">Shipping Address</h3>
          <div className="bg-blck-purple/30 p-4 rounded-md">
            <p className="text-white">{formData.address}</p>
            <p className="text-gray-400">{formData.city}, {formData.state} - {formData.pincode}</p>
          </div>
        </div>
        
        {/* Payment Information */}
        <div>
          <h3 className="text-lg font-medium text-blck-silver mb-3">Payment Method</h3>
          <div className="bg-blck-purple/30 p-4 rounded-md">
            <div className="flex items-center">
              <CreditCard size={20} className="text-blck-gold mr-3" />
              <div>
                <p className="text-white">Credit/Debit Card</p>
                <p className="text-gray-400">Card ending in {formData.cardNumber.slice(-4)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-medium text-blck-silver mb-3">Order Summary</h3>
          <div className="bg-blck-purple/30 p-4 rounded-md">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.size || 'default'}`} className="flex justify-between mb-3 pb-3 border-b border-blck-purple last:border-0 last:mb-0 last:pb-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blck-purple rounded-md flex items-center justify-center mr-3">
                    <span className="text-white text-xs">{item.quantity}x</span>
                  </div>
                  <div>
                    <p className="text-white">{item.name}</p>
                    {item.size && <p className="text-gray-400 text-sm">Size: {item.size}</p>}
                  </div>
                </div>
                <p className="text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-blck-purple">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Shipping</span>
                <span className="text-white">{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-medium mt-3 pt-3 border-t border-blck-purple">
                <span className="text-blck-silver">Total</span>
                <span className="text-blck-gold">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button 
            onClick={prevStep}
            className="bg-transparent border border-blck-silver hover:bg-blck-purple text-blck-silver py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back
          </Button>
          
          <Button 
            onClick={handleSubmitOrder}
            className="bg-blck-accent hover:bg-blck-accent/80 text-white py-3 px-8 rounded-md transition-colors flex items-center justify-center group"
          >
            Place Order
            <Check size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
