'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-imperial-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6 flex items-center"
            >
              <Image 
                src="/images/logo-white.png" 
                alt="Imperial Perfumes" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <span className="font-serif text-xl font-bold text-imperial-gold">
                Imperial <span className="font-light text-white">Perfumes</span>
              </span>
            </motion.div>
            
            <p className="text-gray-300 mb-6">
              Crafting timeless elegance through exquisite fragrances. 
              Our luxury perfumes are created with the finest ingredients 
              to evoke emotion and leave a lasting impression.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/imperialperfumes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-imperial-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com/imperialperfumes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-imperial-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com/imperialperfumes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-imperial-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium text-imperial-gold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/bestsellers" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/collections/gift-sets" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-medium text-imperial-gold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-imperial-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium text-imperial-gold mb-6">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            
            <form className="mb-6">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-imperial-gold"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-imperial-gold text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-2 text-imperial-gold" />
                <span>123 Luxury Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={18} className="mr-2 text-imperial-gold" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2 text-imperial-gold" />
                <span>contact@imperialperfumes.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Instagram Feed */}
        <div className="mb-12">
          <h3 className="font-serif text-lg font-medium text-imperial-gold mb-6 text-center">Follow Us @ImperialPerfumes</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <a 
                key={item}
                href="https://instagram.com/imperialperfumes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block overflow-hidden group relative aspect-square"
              >
                <Image 
                  src={`/images/instagram-${item}.jpg`} 
                  alt={`Instagram post ${item}`} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram size={24} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Imperial Perfumes. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4">
              <img src="/images/payment-visa.svg" alt="Visa" className="h-6" />
              <img src="/images/payment-mastercard.svg" alt="Mastercard" className="h-6" />
              <img src="/images/payment-amex.svg" alt="American Express" className="h-6" />
              <img src="/images/payment-paypal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
