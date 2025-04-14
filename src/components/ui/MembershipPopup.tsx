'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MembershipPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembershipPopup({ isOpen, onClose }: MembershipPopupProps) {
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Auto-close after 5 seconds
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative bg-blck-purple/90 border border-blck-accent/30 rounded-lg p-6 shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-blck-silver hover:text-white"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl mr-3">💖</span>
          <span className="text-2xl text-blck-gold font-heading">Thank You!</span>
        </div>
        
        <p className="text-center text-white mb-4">
          Thanks for your interest! Coming soon ✨
        </p>
        
        <div className="flex justify-center">
          <span className="text-3xl">🎁</span>
        </div>
      </div>
    </div>
  );
}
