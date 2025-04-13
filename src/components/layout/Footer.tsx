'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-blck-darkPurple text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="mb-6 flex items-center animate-fade-in">
              <span className="font-serif text-xl font-bold text-blck-gold">
                Imperial <span className="font-light text-white">Perfumes</span>
              </span>
            </div>
            
            <p className="text-gray-300 mb-6">
              Crafting timeless elegance through exquisite fragrances. 
              Our luxury perfumes are created with the finest ingredients 
              to evoke emotion and leave a lasting impression.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blck-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blck-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blck-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium text-blck-gold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="text-gray-300 hover:text-blck-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/bestsellers" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/collections/gift-sets" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-medium text-blck-gold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-blck-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-blck-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter & Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium text-blck-gold mb-6">Stay Connected</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            
            <form className="mb-6">
              <div className="flex flex-row items-stretch">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-md flex-grow focus:outline-none focus:ring-1 focus:ring-blck-gold"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-blck-gold text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2 text-blck-gold" />
                <span>official.imperialperfumes@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-blck-purple pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:flex-row justify-center items-center">
              &copy; {currentYear} Imperial Perfumes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
