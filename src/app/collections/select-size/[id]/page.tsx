'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Sample perfume data
const perfumes = [
  {
    id: 1,
    name: "Imperial Perfume 1",
    description: "A captivating blend of exotic notes that transport you to distant lands.",
    price: 199,
    image: "/images/imperial rogue.png"
  },
  {
    id: 2,
    name: "Imperial Perfume 2",
    description: "A rich and warm fragrance with notes of amber, vanilla, and sandalwood.",
    price: 229,
    image: "/images/imperial rogue.png"
  },
  {
    id: 3,
    name: "Imperial Perfume 3",
    description: "A bold and daring fragrance with notes of leather, spice, and dark woods.",
    price: 249,
    image: "/images/imperial rogue.png"
  },
  {
    id: 4,
    name: "Imperial Perfume 4",
    description: "An enchanting floral fragrance with notes of orchid, jasmine, and musk.",
    price: 189,
    image: "/images/imperial rogue.png"
  },
  {
    id: 5,
    name: "Imperial Perfume 5",
    description: "A fresh and invigorating scent with citrus and marine accords.",
    price: 179,
    image: "/images/imperial rogue.png"
  },
  {
    id: 6,
    name: "Imperial Perfume 6",
    description: "A sophisticated blend of rose, patchouli, and bergamot.",
    price: 219,
    image: "/images/imperial rogue.png"
  },
  {
    id: 7,
    name: "Imperial Perfume 7",
    description: "An oriental fragrance with notes of oud, saffron, and amber.",
    price: 259,
    image: "/images/imperial rogue.png"
  },
  {
    id: 8,
    name: "Imperial Perfume 8",
    description: "A light and airy fragrance with notes of white flowers and citrus.",
    price: 169,
    image: "/images/imperial rogue.png"
  },
  {
    id: 9,
    name: "Imperial Perfume 9",
    description: "A woody fragrance with notes of cedar, vetiver, and bergamot.",
    price: 209,
    image: "/images/imperial rogue.png"
  },
  {
    id: 10,
    name: "Imperial Perfume 10",
    description: "A luxurious blend of rare spices, amber, and vanilla.",
    price: 279,
    image: "/images/imperial rogue.png"
  }
];

// Bottle size options
const bottleSizes = {
  perfume: [
    { size: "30ml", priceMultiplier: 1 },
    { size: "60ml", priceMultiplier: 1.8 }
  ],
  attar: [
    { size: "3ml", priceMultiplier: 0.3 },
    { size: "10ml", priceMultiplier: 0.8 },
    { size: "12.5ml", priceMultiplier: 1 }
  ]
};

export default function SelectSizePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'perfume' | 'attar'>('perfume');
  const [selectedSize, setSelectedSize] = useState<string>('30ml');
  
  const perfumeId = parseInt(params.id);
  const perfume = perfumes.find(p => p.id === perfumeId);
  
  if (!perfume) {
    return (
      <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-blck-silver mb-4">Product Not Found</h1>
          <p className="text-blck-textMuted mb-6">The product you are looking for does not exist.</p>
          <Button variant="blck" asChild>
            <Link href="/collections">Back to Collections</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const calculatePrice = () => {
    const options = selectedType === 'perfume' ? bottleSizes.perfume : bottleSizes.attar;
    const selectedOption = options.find(option => option.size === selectedSize);
    return selectedOption ? Math.round(perfume.price * selectedOption.priceMultiplier) : perfume.price;
  };
  
  const handleProceedToCheckout = () => {
    // In a real app, you would add the item to cart with the selected options
    // For now, we'll just navigate to a placeholder checkout page
    router.push('/checkout');
  };
  
  return (
    <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex text-sm">
              <Link href="/" className="text-blck-textMuted hover:text-blck-silver">Home</Link>
              <span className="mx-2 text-blck-textMuted">/</span>
              <Link href="/collections" className="text-blck-textMuted hover:text-blck-silver">Collections</Link>
              <span className="mx-2 text-blck-textMuted">/</span>
              <span className="text-blck-silver">{perfume.name}</span>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative h-[400px] md:h-[500px] blck-card p-6">
              <Image
                src={perfume.image}
                alt={perfume.name}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Product Details & Options */}
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-blck-silver mb-3">{perfume.name}</h1>
              <p className="text-2xl font-medium text-blck-gold mb-4">₹{calculatePrice()}.00</p>
              <p className="text-blck-textMuted mb-8">{perfume.description}</p>
              
              {/* Product Type Selection */}
              <div className="mb-6">
                <h2 className="text-xl font-heading font-medium text-blck-silver mb-3">Select Type</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setSelectedType('perfume');
                      setSelectedSize('30ml');
                    }}
                    className={`px-6 py-3 rounded-md transition-colors ${
                      selectedType === 'perfume' 
                        ? 'bg-blck-accent text-white' 
                        : 'bg-blck-cardLight text-blck-textMuted hover:bg-blck-card'
                    }`}
                  >
                    Spray Perfume
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('attar');
                      setSelectedSize('3ml');
                    }}
                    className={`px-6 py-3 rounded-md transition-colors ${
                      selectedType === 'attar' 
                        ? 'bg-blck-accent text-white' 
                        : 'bg-blck-cardLight text-blck-textMuted hover:bg-blck-card'
                    }`}
                  >
                    Attar
                  </button>
                </div>
              </div>
              
              {/* Bottle Size Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-heading font-medium text-blck-silver mb-3">Select Size</h2>
                <div className="grid grid-cols-3 gap-3">
                  {(selectedType === 'perfume' ? bottleSizes.perfume : bottleSizes.attar).map((option) => (
                    <button
                      key={option.size}
                      onClick={() => setSelectedSize(option.size)}
                      className={`px-4 py-3 rounded-md transition-colors ${
                        selectedSize === option.size 
                          ? 'bg-blck-accent text-white' 
                          : 'bg-blck-cardLight text-blck-textMuted hover:bg-blck-card'
                      }`}
                    >
                      {option.size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Add to Cart & Buy Now Buttons */}
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="blck" 
                  size="lg" 
                  className="w-full"
                  onClick={handleProceedToCheckout}
                >
                  Buy Now
                </Button>
                <Button variant="blckOutline" size="lg" className="w-full">
                  Add to Cart
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                <div className="blck-card p-4">
                  <p className="text-blck-silver">Free Shipping</p>
                  <p className="text-sm text-blck-textMuted">On orders over $100</p>
                </div>
                <div className="blck-card p-4">
                  <p className="text-blck-silver">Secure Payment</p>
                  <p className="text-sm text-blck-textMuted">100% secure payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
