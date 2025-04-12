'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'
import { ShoppingBag, Menu, X, Sun, Moon, Search, User } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-blck-purple/95 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 text-2xl font-heading font-bold text-blck-silver">
            <div
              className="flex items-center opacity-0 animate-fade-in"
            >
              <Image 
                src={isScrolled ? "/images/logo (2).png" : "/images/logo-white.png"} 
                alt="Imperial Perfumes" 
                width={40} 
                height={40}
                className="mr-2"
              />
              <span className="font-heading text-xl md:text-2xl font-bold text-blck-silver">
                Imperial <span className="font-medium text-blck-gold">Perfumes</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link font-medium text-blck-silver hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/collections" className="nav-link font-medium text-blck-silver hover:text-white transition-colors">
              Collections
            </Link>
            <Link href="/products" className="nav-link font-medium text-blck-silver hover:text-white transition-colors">
              Shop
            </Link>
            <Link href="/about" className="nav-link font-medium text-blck-silver hover:text-white transition-colors">
              About
            </Link>
            <Link href="/blog" className="nav-link font-medium text-blck-silver hover:text-white transition-colors">
              Journal
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Link href="/search" className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white">
              <Search size={20} />
            </Link>
            
            <Link href="/account" className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white">
              <User size={20} />
            </Link>
            
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blck-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link href="/cart" className="relative p-2 text-blck-silver hover:text-white transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blck-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleMobileMenu}
              className="p-2 focus:outline-none text-blck-silver hover:text-white transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden bg-blck-purple border-t border-blck-cardLight mobile-menu-transition"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="py-2 font-medium text-blck-silver hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/collections" 
                className="py-2 font-medium text-blck-silver hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                href="/products" 
                className="py-2 font-medium text-blck-silver hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/about" 
                className="py-2 font-medium text-blck-silver hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className="py-2 font-medium text-blck-silver hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Journal
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-blck-cardLight">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              <Link 
                href="/search" 
                className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search size={20} />
              </Link>
              
              <Link 
                href="/account" 
                className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
