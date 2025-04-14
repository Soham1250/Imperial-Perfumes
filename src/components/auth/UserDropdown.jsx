'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ShoppingBag, Heart, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function UserDropdown() {
  const { user, logout, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        // Logged in user
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-1 p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white"
        >
          <User size={20} />
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        // Not logged in
        <button
          onClick={() => openAuthModal('login')}
          className="p-2 rounded-full hover:bg-blck-lightOrange transition-colors text-blck-silver hover:text-white"
        >
          <User size={20} />
        </button>
      )}

      {/* Background overlay when dropdown is open */}
      {isOpen && user && (
        <div className="fixed inset-0 bg-blck-purple/40 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Dropdown menu */}
      {isOpen && user && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-blck-cardBackground border border-blck-purple/30 overflow-hidden z-50 transition-all duration-200 transform origin-top-right animate-in fade-in slide-in-from-top-5">
          <div className="px-4 py-3 border-b border-blck-cardLight">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-blck-textMuted truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/account"
              className="flex items-center px-4 py-2 text-sm text-blck-silver hover:bg-blck-purple hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2" />
              My Account
            </Link>
            <Link
              href="/account/orders"
              className="flex items-center px-4 py-2 text-sm text-blck-silver hover:bg-blck-purple hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag size={16} className="mr-2" />
              My Orders
            </Link>
            <Link
              href="/account/wishlist"
              className="flex items-center px-4 py-2 text-sm text-blck-silver hover:bg-blck-purple hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={16} className="mr-2" />
              Wishlist
            </Link>
            <Link
              href="/account/settings"
              className="flex items-center px-4 py-2 text-sm text-blck-silver hover:bg-blck-purple hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
          </div>
          <div className="py-1 border-t border-blck-cardLight">
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-blck-silver hover:bg-blck-purple hover:text-white"
            >
              <LogOut size={16} className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
