'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

// Membership tiers data
const membershipTiers = [
  {
    id: 'silver',
    name: 'Silver',
    price: 99,
    period: 'year',
    color: 'bg-blck-silver text-blck-purple',
    benefits: [
      'Early access to new collections',
      'Free shipping on all orders',
      'Exclusive member-only discounts',
      'Birthday gift (15% off coupon)'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 199,
    period: 'year',
    color: 'bg-blck-gold text-blck-purple',
    featured: true,
    benefits: [
      'All Silver benefits',
      'Quarterly fragrance samples',
      'Member-exclusive fragrances',
      'Personalized fragrance consultation',
      'Annual gift set ($50 value)'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 299,
    period: 'year',
    color: 'bg-blck-accent text-white',
    benefits: [
      'All Gold benefits',
      'Priority access to limited editions',
      'Bi-monthly fragrance samples',
      'Complimentary gift wrapping',
      'VIP events and masterclasses',
      'Dedicated concierge service'
    ]
  }
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState('gold');
  
  return (
    <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blck-purple via-blck-darkPurple to-blck-card opacity-70"></div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 slide-in-blur">
              <span className="gradient-text">Imperial</span> Membership
            </h1>
            <p className="text-xl text-blck-textMuted animate-fade-in animation-delay-200">
              Join our exclusive circle and elevate your fragrance journey with premium benefits, exclusive access, and personalized experiences.
            </p>
          </div>
          
          {/* Membership Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="blck-card p-8 text-center transform transition-all duration-500 hover:scale-105 animate-fade-in animation-delay-200">
              <div className="w-16 h-16 rounded-full bg-blck-cardLight flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blck-gold">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-blck-silver">Exclusive Collections</h3>
              <p className="text-blck-textMuted">
                Gain early access to new releases and member-exclusive fragrances not available to the public.
              </p>
            </div>
            
            <div className="blck-card p-8 text-center transform transition-all duration-500 hover:scale-105 animate-fade-in animation-delay-400">
              <div className="w-16 h-16 rounded-full bg-blck-cardLight flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blck-gold">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-blck-silver">Personalized Experience</h3>
              <p className="text-blck-textMuted">
                Enjoy personalized fragrance consultations and recommendations tailored to your preferences.
              </p>
            </div>
            
            <div className="blck-card p-8 text-center transform transition-all duration-500 hover:scale-105 animate-fade-in animation-delay-600">
              <div className="w-16 h-16 rounded-full bg-blck-cardLight flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blck-gold">
                  <path d="M12 1v22"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-blck-silver">Special Savings</h3>
              <p className="text-blck-textMuted">
                Receive exclusive member-only discounts, free shipping, and special offers throughout the year.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section className="py-20 bg-blck-purple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver letter-spacing-animation">Choose Your Tier</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Select the membership level that best suits your fragrance journey and unlock a world of exclusive benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <div 
                key={tier.id}
                className={`blck-card overflow-hidden transition-all duration-500 animate-fade-in ${
                  tier.featured ? 'md:-mt-4 md:mb-4 border-2 border-blck-accent' : ''
                } ${selectedTier === tier.id ? 'ring-2 ring-blck-accent ring-offset-2 ring-offset-blck-purple' : ''}`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                {tier.featured && (
                  <div className="bg-blck-accent text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-full ${tier.color} flex items-center justify-center mb-6 mx-auto`}>
                    <span className="text-2xl font-bold">{tier.name.charAt(0)}</span>
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold mb-2 text-center text-blck-silver">{tier.name}</h3>
                  
                  <div className="text-center mb-6">
                    <span className="text-3xl font-bold text-blck-gold">${tier.price}</span>
                    <span className="text-blck-textMuted">/{tier.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blck-gold mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-blck-textMuted">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={selectedTier === tier.id ? "blck" : "blckOutline"} 
                    size="lg" 
                    className="w-full"
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {selectedTier === tier.id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="blck" 
              size="lg" 
              className="px-8"
              disabled={!selectedTier}
            >
              Join {membershipTiers.find(tier => tier.id === selectedTier)?.name} Membership
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-blck-darkPurple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver glow-text">What Our Members Say</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Hear from our members about their exclusive Imperial Perfumes experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="blck-card p-8 transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blck-cardLight flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blck-gold">S</span>
                </div>
                <div>
                  <h4 className="font-medium text-blck-silver">Sophia K.</h4>
                  <p className="text-sm text-blck-textMuted">Gold Member</p>
                </div>
              </div>
              <p className="text-blck-textMuted">
                "The quarterly fragrance samples alone are worth the membership fee. I've discovered scents I never would have tried otherwise, and now I have a collection I'm proud of."
              </p>
            </div>
            
            <div className="blck-card p-8 transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blck-cardLight flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blck-gold">J</span>
                </div>
                <div>
                  <h4 className="font-medium text-blck-silver">James R.</h4>
                  <p className="text-sm text-blck-textMuted">Platinum Member</p>
                </div>
              </div>
              <p className="text-blck-textMuted">
                "The VIP events and masterclasses have completely changed how I appreciate fragrances. Learning directly from master perfumers has been an incredible experience."
              </p>
            </div>
            
            <div className="blck-card p-8 transform transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blck-cardLight flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blck-gold">A</span>
                </div>
                <div>
                  <h4 className="font-medium text-blck-silver">Amelia T.</h4>
                  <p className="text-sm text-blck-textMuted">Silver Member</p>
                </div>
              </div>
              <p className="text-blck-textMuted">
                "The early access to new collections has allowed me to secure limited editions before they sell out. The free shipping is just a bonus at this point!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-blck-purple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver">Frequently Asked Questions</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Everything you need to know about Imperial Perfumes membership.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="blck-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-3 text-blck-silver">How do I receive my membership benefits?</h3>
                <p className="text-blck-textMuted">
                  After joining, you'll receive a welcome email with your membership details. Your account will be automatically upgraded with your membership status, and benefits will be applied to your account immediately.
                </p>
              </div>
              
              <div className="blck-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-3 text-blck-silver">Can I upgrade my membership tier later?</h3>
                <p className="text-blck-textMuted">
                  Yes, you can upgrade your membership at any time. The price difference will be prorated based on the remaining time in your current membership period.
                </p>
              </div>
              
              <div className="blck-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-3 text-blck-silver">How do I schedule a fragrance consultation?</h3>
                <p className="text-blck-textMuted">
                  Gold and Platinum members can schedule consultations through their account dashboard or by contacting our dedicated member services team.
                </p>
              </div>
              
              <div className="blck-card p-6">
                <h3 className="text-xl font-heading font-semibold mb-3 text-blck-silver">Is the membership fee refundable?</h3>
                <p className="text-blck-textMuted">
                  Memberships can be canceled within 14 days of purchase for a full refund if no benefits have been used. After this period, we do not offer refunds for membership fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blck-darkPurple">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">Begin Your Exclusive Journey</h2>
            <p className="text-xl text-blck-textMuted mb-8">
              Join Imperial Perfumes membership today and elevate your fragrance experience with exclusive benefits and personalized service.
            </p>
            <Button 
              variant="blck" 
              size="lg" 
              className="px-8"
            >
              Become a Member
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
