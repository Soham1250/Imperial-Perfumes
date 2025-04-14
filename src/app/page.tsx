'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import MembershipPopup from '@/components/ui/MembershipPopup'

export default function Home() {
  const [showMembershipPopup, setShowMembershipPopup] = useState(false);
  
  // Function to show gratitude popup for membership interest
  const handleMembershipInterest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowMembershipPopup(true);
  };
  
  // Function to close the membership popup
  const closeMembershipPopup = () => {
    setShowMembershipPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blck-darkPurple">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-blck-darkPurple overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blck-purple via-blck-darkPurple to-blck-card opacity-70"></div>
        
        {/* Subtle animated particles or shapes could be added here in a real implementation */}
        
        <div className="container mx-auto px-4 z-10 text-center max-w-4xl">
          <div className="space-y-8">
            {/* Main heading with animated reveal */}
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-2">
                <div className="text-reveal">
                  <span className="block letter-spacing-animation animation-delay-200">Discover</span>
                </div>
                <div className="text-reveal">
                  <span className="block letter-spacing-animation animation-delay-400">Your</span>
                </div>
                <div className="text-reveal">
                  <span className="block gradient-text animation-delay-600">Signature</span>
                </div>
                <div className="text-reveal">
                  <span className="block glow-text animation-delay-800">Scent</span>
                </div>
              </h1>
            </div>
            
            <p className="text-xl text-blck-textMuted mb-8 max-w-2xl mx-auto slide-in-blur animation-delay-800">
              Immerse yourself in the world of Imperial Perfumes, where timeless elegance meets modern luxury. Crafted with the finest ingredients from around the world.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in animation-delay-800">
              <Button variant="blck" size="lg" asChild>
                <Link href="/collections">Explore Collection</Link>
              </Button>
              <Button variant="blckOutline" size="lg" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-20 bg-blck-darkPurple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 blck-swirl">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver">Featured Fragrances</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Discover our most coveted fragrances, each telling a unique story and evoking distinct emotions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="blck-card overflow-hidden group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/imperial rogue.png"
                  alt="Imperial Elixir Noir"
                  fill
                  className="object-contain bg-blck-cardLight transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-blck-silver">Imperial Elixir Noir</h3>
                <p className="text-blck-textMuted mb-4">A captivating blend of exotic notes with amber, oud, and hints of spice that transport you to distant lands.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-blck-gold">₹199.00</span>
                  <Button variant="blck" size="sm" asChild>
                    <Link href="/collections/1">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="blck-card overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="/images/bottle in purple.png"
                  alt="Royal Amber"
                  fill
                  className="object-contain bg-blck-cardLight"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-blck-silver">Royal Amber</h3>
                <p className="text-blck-textMuted mb-4">A rich and warm fragrance with notes of amber, vanilla, and sandalwood.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-blck-gold">₹229.00</span>
                  <Button variant="blck" size="sm" asChild>
                    <Link href="/collections/2">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="blck-card overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="/images/imperial rogue.png"
                  alt="Imperial Rogue"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-blck-silver">Imperial Rogue</h3>
                <p className="text-blck-textMuted mb-4">A bold and daring fragrance with notes of leather, spice, and dark woods.</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-blck-gold">₹249.00</span>
                  <Button variant="blck" size="sm" asChild>
                    <Link href="/collections/3">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="blckOutline" size="lg" asChild>
              <Link href="/shop">View All Collections</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Collection Showcase Section */}
      <section className="py-20 bg-blck-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 blck-swirl">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver">Exclusive Collections</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Explore our curated collections, each designed to evoke a unique mood and experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="blck-card overflow-hidden rounded-2xl">
              <div className="relative h-96">
                <Image
                  src="/images/perfume bottle collection blue bg.jpg"
                  alt="Blue Collection"
                  fill
                  className="object-cover object-center rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-blck-accent/20 hover:bg-blck-accent/10 transition-colors duration-300 rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blck-darkPurple to-transparent rounded-b-2xl">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">Azure Collection</h3>
                  <p className="text-blck-silver mb-4">Fresh, aquatic fragrances inspired by the ocean depths</p>
                  <Button variant="blckOutline" size="sm" asChild>
                    <Link href="/collections">Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="blck-card overflow-hidden rounded-2xl">
              <div className="relative h-96">
                <Image
                  src="/images/perfume bottle collection red bg.jpg"
                  alt="Red Collection"
                  fill
                  className="object-cover object-center rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-blck-accent/20 hover:bg-blck-accent/10 transition-colors duration-300 rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blck-darkPurple to-transparent rounded-b-2xl">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">Ruby Collection</h3>
                  <p className="text-blck-silver mb-4">Bold, passionate fragrances with notes of spice and exotic woods</p>
                  <Button variant="blckOutline" size="sm" asChild>
                    <Link href="/collections">Explore</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Full Collection Showcase - New Section */}
      <section className="py-20 bg-blck-purple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 blck-swirl">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver">The Complete Collection</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Experience the full range of our exquisite fragrances, each bottle a masterpiece of perfumery.
            </p>
          </div>
          
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/images/entire collection.png"
              alt="Imperial Perfumes Complete Collection"
              fill
              className="object-cover object-center rounded-2xl"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blck-darkPurple to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Discover the Full Range</h3>
              <p className="text-blck-silver mb-6 max-w-2xl mx-auto">Our complete collection features over 20 unique fragrances, each crafted to perfection by our master perfumers.</p>
              <Button variant="blck" size="lg" asChild>
                <Link href="/shop">View All Fragrances</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Membership Section - Similar to One BLCK */}
      <section className="py-20 bg-blck-darkPurple">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 blck-swirl">
            <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver">Imperial BLCK Membership</h2>
            <p className="text-blck-textMuted max-w-2xl mx-auto">
              Join our exclusive membership program and enjoy premium benefits with every purchase.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="blck-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-blck-cardLight flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blck-gold">
                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-blck-silver">Exclusive Discounts</h3>
              <p className="text-blck-textMuted">Get up to 25% off on all purchases and special access to limited editions</p>
            </div>
            
            <div className="blck-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-blck-cardLight flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blck-gold">
                    <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"></path>
                    <circle cx="17" cy="7" r="5"></circle>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-blck-silver">Free Samples</h3>
              <p className="text-blck-textMuted">Receive complimentary samples with every order to discover new fragrances</p>
            </div>
            
            <div className="blck-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-blck-cardLight flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blck-gold">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-blck-silver">Priority Support</h3>
              <p className="text-blck-textMuted">Enjoy dedicated customer service and personalized fragrance consultations</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="blck" 
              size="lg" 
              onClick={handleMembershipInterest}
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-blck-darkPurple">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-blck-gold">The Art of Perfumery</h2>
              <p className="text-blck-textMuted mb-6">
                At Imperial Perfumes, we believe that a fragrance is more than just a scent—it's an expression of individuality, a memory captured in a bottle, a statement of elegance.
              </p>
              <p className="text-blck-textMuted mb-6">
                Our master perfumers travel the world to source the finest ingredients, creating compositions that balance tradition with innovation.
              </p>
              <Button variant="blck" size="lg" asChild className="mb-8">
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </div>
            
            <div className="blck-card p-8 rounded-lg">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-blck-silver">The Essence of Perfume Making</h3>
              <p className="text-blck-textMuted mb-4">
                Perfumery is an ancient art dating back thousands of years to the early civilizations of Mesopotamia and Egypt. The word "perfume" comes from the Latin "per fumum," meaning "through smoke," reflecting the original method of releasing fragrant scents.
              </p>
              <p className="text-blck-textMuted mb-4">
                Modern perfumery emerged in the late 19th century with the synthesis of aromatic compounds, revolutionizing the industry and making fine fragrances more accessible. Today, creating a perfume involves careful selection and blending of top notes (the initial impression), heart notes (the essence of the perfume), and base notes (the foundation that lasts).
              </p>
              <p className="text-blck-textMuted">
                Each perfume is a complex composition of natural extracts, essential oils, and aroma compounds, carefully balanced to create a harmonious and evocative scent experience that evolves over time on the skin.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-blck-darkPurple">
        <div className="container mx-auto px-4 text-center blck-swirl">
          <h2 className="text-3xl font-heading font-bold mb-4 text-blck-silver">Join Our Exclusive Circle</h2>
          <p className="text-blck-textMuted max-w-2xl mx-auto mb-8">
            Subscribe to receive updates on new collections, exclusive offers, and invitations to private events.
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex items-stretch">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md border-2 border-blck-silver border-r-0 focus:outline-none focus:ring-2 focus:ring-blck-accent bg-blck-purple text-white"
                required
              />
              <Button 
                variant="blck" 
                className="rounded-l-none px-6 h-auto text-base font-medium"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </section>
      <MembershipPopup 
        isOpen={showMembershipPopup} 
        onClose={closeMembershipPopup} 
      />
    </div>
  )
}