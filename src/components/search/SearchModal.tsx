'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Sample perfume data - this would ideally come from an API
const perfumes = [
  { id: 1, name: "Imperial Noir", description: "A dark, mysterious blend with notes of black amber and spices", price: 199 },
  { id: 2, name: "Royal Oud", description: "Luxurious oud combined with precious woods and spices", price: 249 },
  { id: 3, name: "Midnight Saffron", description: "Opulent saffron blended with rose and smoky incense", price: 229 },
  { id: 4, name: "Velvet Amber", description: "Rich amber with vanilla and warm spices", price: 189 },
  { id: 5, name: "Golden Musk", description: "Sophisticated musk with golden amber and sandalwood", price: 179 },
  { id: 6, name: "Regal Iris", description: "Elegant iris with violet and powdery notes", price: 209 },
  { id: 7, name: "Majestic Oud", description: "Intense oud with leather and smoky notes", price: 259 },
  { id: 8, name: "Imperial Rose", description: "Luxurious rose with saffron and patchouli", price: 219 },
  { id: 9, name: "Sovereign Leather", description: "Rich leather with spices and woody notes", price: 239 },
  { id: 10, name: "Royal Bergamot", description: "Fresh bergamot with aromatic herbs and amber", price: 169 },
  // Add more perfumes as needed
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof perfumes>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const results = perfumes.filter(
        perfume => 
          perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          perfume.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

  if (!mounted) return null;
  if (!isOpen) return null;

  const handleResultClick = (id: number) => {
    onClose();
    router.push(`/collections/${id}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-blck-purple/90 rounded-lg shadow-xl border border-blck-accent/30 overflow-hidden"
      >
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-blck-silver" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for perfumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-4 pl-12 pr-12 bg-blck-darkPurple text-white border-b border-blck-accent/50 focus:outline-none focus:border-blck-accent placeholder-blck-silver/70"
          />
          <button 
            onClick={onClose}
            className="absolute inset-y-0 right-4 flex items-center text-blck-silver hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search results */}
        <div className="max-h-[70vh] overflow-y-auto">
          {isSearching ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-blck-accent" />
            </div>
          ) : searchTerm && searchResults.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-blck-silver">No perfumes found matching "{searchTerm}"</p>
            </div>
          ) : (
            <div>
              {searchResults.map((perfume) => (
                <div 
                  key={perfume.id}
                  className="p-4 border-b border-blck-purple/50 hover:bg-blck-darkPurple transition-colors cursor-pointer"
                  onClick={() => handleResultClick(perfume.id)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blck-accent/20 rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="text-blck-gold text-xs font-medium">
                        {perfume.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-white font-medium">{perfume.name}</h4>
                      <p className="text-blck-silver text-sm">{perfume.description}</p>
                      <p className="text-blck-gold text-sm mt-1">₹{perfume.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick links */}
        {!searchTerm && (
          <div className="p-4 border-t border-blck-purple/50 bg-blck-darkPurple/50">
            <p className="text-sm text-blck-silver mb-2">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setSearchTerm('oud')}
                className="px-3 py-1 bg-blck-darkPurple rounded-full text-sm text-blck-silver hover:bg-blck-accent hover:text-white transition-colors"
              >
                Oud
              </button>
              <button 
                onClick={() => setSearchTerm('rose')}
                className="px-3 py-1 bg-blck-darkPurple rounded-full text-sm text-blck-silver hover:bg-blck-accent hover:text-white transition-colors"
              >
                Rose
              </button>
              <button 
                onClick={() => setSearchTerm('amber')}
                className="px-3 py-1 bg-blck-darkPurple rounded-full text-sm text-blck-silver hover:bg-blck-accent hover:text-white transition-colors"
              >
                Amber
              </button>
              <button 
                onClick={() => setSearchTerm('musk')}
                className="px-3 py-1 bg-blck-darkPurple rounded-full text-sm text-blck-silver hover:bg-blck-accent hover:text-white transition-colors"
              >
                Musk
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
