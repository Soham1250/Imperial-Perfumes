'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-hot-toast'

// Sample perfume data (same as in collections page)
const perfumes = [
  {
    id: 1,
    name: "Imperial Perfume 1",
    description: "A captivating blend of exotic notes that transport you to distant lands.",
    price: 199,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Bergamot", "Lemon", "Black Pepper"],
      middle: ["Lavender", "Geranium", "Cardamom"],
      base: ["Vetiver", "Cedarwood", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@fragrancelover", text: "Absolutely stunning fragrance! The longevity is incredible and I get compliments every time I wear it.", rating: 5 },
      { source: "Facebook", author: "Michael R.", text: "A sophisticated scent that's perfect for special occasions. Highly recommend!", rating: 4 },
      { source: "Website", author: "Sarah J.", text: "My signature scent for over a year now. Nothing else compares to the complexity and elegance.", rating: 5 }
    ]
  },
  {
    id: 2,
    name: "Imperial Perfume 2",
    description: "A rich and warm fragrance with notes of amber, vanilla, and sandalwood.",
    price: 229,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Bergamot", "Cardamom", "Pink Pepper"],
      middle: ["Amber", "Vanilla", "Cinnamon"],
      base: ["Sandalwood", "Musk", "Tonka Bean"]
    },
    reviews: [
      { source: "Instagram", author: "@scentcritic", text: "One of the most luxurious amber fragrances I've ever experienced. Worth every penny.", rating: 5 },
      { source: "Facebook", author: "Jennifer L.", text: "My husband loves this! It's warm, inviting, and lasts all day.", rating: 5 },
      { source: "Website", author: "David M.", text: "A masterpiece of perfumery. The dry down is absolutely divine.", rating: 4 }
    ]
  },
  {
    id: 3,
    name: "Imperial Perfume 3",
    description: "A bold and daring fragrance with notes of leather, spice, and dark woods.",
    price: 249,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Black Pepper", "Saffron", "Elemi"],
      middle: ["Leather", "Oud", "Rose"],
      base: ["Patchouli", "Vetiver", "Incense"]
    },
    reviews: [
      { source: "Instagram", author: "@fragrancejunkie", text: "This is not for the faint of heart. Bold, masculine, and unforgettable.", rating: 5 },
      { source: "Facebook", author: "Robert T.", text: "The leather note is so realistic. A true masterpiece for those who appreciate daring scents.", rating: 4 },
      { source: "Website", author: "Alexandra P.", text: "I wear this despite it being marketed for men. It's powerful and makes me feel confident.", rating: 5 }
    ]
  },
  {
    id: 4,
    name: "Imperial Perfume 4",
    description: "An enchanting floral fragrance with notes of orchid, jasmine, and musk.",
    price: 189,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Bergamot", "Pink Pepper", "Pear"],
      middle: ["Orchid", "Jasmine", "Lily of the Valley"],
      base: ["Musk", "Vanilla", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@perfumeaddict", text: "The most beautiful floral I've ever worn. Delicate yet long-lasting.", rating: 5 },
      { source: "Facebook", author: "Emily S.", text: "I receive so many compliments when I wear this. It's become my signature scent.", rating: 5 },
      { source: "Website", author: "Thomas K.", text: "Bought this for my wife and she absolutely loves it. A truly elegant scent.", rating: 5 }
    ]
  },
  {
    id: 5,
    name: "Imperial Perfume 5",
    description: "A fresh and invigorating scent with citrus and marine accords.",
    price: 179,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Lemon", "Bergamot", "Grapefruit"],
      middle: ["Marine Accord", "Jasmine", "Rosemary"],
      base: ["Musk", "Cedar", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@summerscents", text: "Perfect for hot days. Fresh, clean, and energizing without being overpowering.", rating: 5 },
      { source: "Facebook", author: "Mark L.", text: "My go-to for the office. Professional and refreshing.", rating: 4 },
      { source: "Website", author: "Olivia R.", text: "My go-to for hot days. The marine notes are so realistic and refreshing.", rating: 4 }
    ]
  },
  {
    id: 6,
    name: "Imperial Perfume 6",
    description: "A sophisticated blend of rose, patchouli, and bergamot.",
    price: 219,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Bergamot", "Mandarin", "Pink Pepper"],
      middle: ["Rose", "Geranium", "Lily"],
      base: ["Patchouli", "Sandalwood", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@rosefanatic", text: "The most realistic and beautiful rose fragrance I've ever encountered.", rating: 5 },
      { source: "Facebook", author: "Catherine D.", text: "Elegant, timeless, and perfect for any occasion. My absolute favorite.", rating: 5 },
      { source: "Website", author: "William J.", text: "Bought this for my mother and she adores it. A true classic.", rating: 4 }
    ]
  },
  {
    id: 7,
    name: "Imperial Perfume 7",
    description: "An oriental fragrance with notes of oud, saffron, and amber.",
    price: 259,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Saffron", "Cinnamon", "Cardamom"],
      middle: ["Oud", "Rose", "Incense"],
      base: ["Amber", "Vanilla", "Sandalwood"]
    },
    reviews: [
      { source: "Instagram", author: "@oudlover", text: "The most authentic oud fragrance available outside the Middle East. Incredible quality.", rating: 5 },
      { source: "Facebook", author: "Hassan M.", text: "Reminds me of the finest fragrances from my homeland. Excellent longevity and projection.", rating: 5 },
      { source: "Website", author: "Sophia K.", text: "Worth every penny. The longevity is incredible and the scent evolution is fascinating.", rating: 4 }
    ]
  },
  {
    id: 8,
    name: "Imperial Perfume 8",
    description: "A light and airy fragrance with notes of white flowers and citrus.",
    price: 169,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Bergamot", "Lemon", "Neroli"],
      middle: ["Orange Blossom", "Jasmine", "Lily of the Valley"],
      base: ["White Musk", "Cedarwood", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@springscents", text: "Like walking through a garden in full bloom. So beautiful and uplifting.", rating: 5 },
      { source: "Facebook", author: "Laura B.", text: "The perfect everyday scent. Light enough for the office but still unique and noticeable.", rating: 4 },
      { source: "Website", author: "Daniel P.", text: "Bought this for my girlfriend and she wears it every day now. Light but distinctive.", rating: 4 }
    ]
  },
  {
    id: 9,
    name: "Imperial Perfume 9",
    description: "A woody fragrance with notes of cedar, vetiver, and bergamot.",
    price: 209,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Bergamot", "Elemi", "Cardamom"],
      middle: ["Cedar", "Cypress", "Geranium"],
      base: ["Vetiver", "Patchouli", "Amber"]
    },
    reviews: [
      { source: "Instagram", author: "@woodyfragrance", text: "The cedar note is so realistic. Like walking through a forest after rain.", rating: 5 },
      { source: "Facebook", author: "James H.", text: "Sophisticated and masculine without being overpowering. Perfect for the office.", rating: 4 },
      { source: "Website", author: "Rachel B.", text: "I love woody fragrances and this is one of the best I've tried.", rating: 5 }
    ]
  },
  {
    id: 10,
    name: "Imperial Perfume 10",
    description: "A luxurious blend of rare spices, amber, and vanilla.",
    price: 279,
    image: "/images/imperial rogue.png",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.",
    notes: {
      top: ["Saffron", "Cardamom", "Cinnamon"],
      middle: ["Amber", "Myrrh", "Rose"],
      base: ["Vanilla", "Oud", "Sandalwood"]
    },
    reviews: [
      { source: "Instagram", author: "@luxuryscents", text: "Worth every penny. The most luxurious and complex fragrance in my collection.", rating: 5 },
      { source: "Facebook", author: "Elizabeth C.", text: "Bought this for a special occasion and now I can't stop wearing it. Absolutely divine.", rating: 5 },
      { source: "Website", author: "Jonathan K.", text: "A special occasion fragrance that makes you feel like royalty.", rating: 5 }
    ]
  }
];

// Function to generate star rating display
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={i < rating ? "currentColor" : "none"} 
          stroke="currentColor"
          className={`w-4 h-4 ${i < rating ? "text-blck-gold" : "text-blck-silver"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  );
};

export default function PerfumeDetailPage({ params }: { params: { id: string } }) {
  const perfumeId = parseInt(params.id)
  const perfume = perfumes.find(p => p.id === perfumeId)
  
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  // Available sizes
  const sizes = [
    { size: "30ml", priceMultiplier: 1 },
    { size: "60ml", priceMultiplier: 1.8 },
    { size: "100ml", priceMultiplier: 2.5 }
  ]
  
  if (!perfume) {
    notFound()
  }
  
  const handleAddToCart = () => {
    setIsAddingToCart(true)
    
    // If no size is selected, use the default size
    const size = selectedSize || sizes[0].size
    
    // Find the price multiplier for the selected size
    const sizeOption = sizes.find(s => s.size === size)
    const price = sizeOption ? Math.round(perfume.price * sizeOption.priceMultiplier) : perfume.price
    
    // Add the item to the cart
    addItem({
      id: perfume.id.toString(),
      name: perfume.name,
      price: price,
      image: perfume.image,
      quantity: 1,
      size: size
    })
    
    // Show success notification
    toast.success(`${perfume.name} (${size}) added to cart`)
    
    // Reset the loading state
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 500)
  }
  
  return (
    <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16">
      <div className="container mx-auto px-4">
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
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden blck-card">
            <Image
              src={perfume.image}
              alt={perfume.name}
              fill
              className={`${
                perfume.image.includes('bottle') ? 'object-contain bg-blck-cardLight' : 'object-cover'
              }`}
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-blck-silver mb-3">{perfume.name}</h1>
            <div className="flex items-center mb-4">
              <StarRating rating={5} />
              <span className="text-blck-textMuted">(12 reviews)</span>
            </div>
            
            <p className="text-2xl font-medium text-blck-gold mb-6">₹{perfume.price}.00</p>
            
            <div className="mb-6">
              <h2 className="text-xl font-heading font-semibold text-blck-silver mb-2">Description</h2>
              <p className="text-blck-textMuted">{perfume.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-blck-silver mb-4">Select Size</h2>
              <div className="flex space-x-4 mb-4">
                {sizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => setSelectedSize(sizeOption.size)}
                    className={`px-4 py-2 rounded-md border transition-all ${
                      selectedSize === sizeOption.size
                        ? 'border-blck-gold bg-blck-accent/20 text-blck-gold'
                        : 'border-blck-purple bg-blck-purple/30 text-blck-textMuted hover:border-blck-silver'
                    }`}
                  >
                    {sizeOption.size}
                    <span className="block text-xs mt-1">
                      ₹{Math.round(perfume.price * sizeOption.priceMultiplier)}.00
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-blck-textMuted">
                {selectedSize ? `Selected: ${selectedSize}` : 'Select a size'}
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-heading font-semibold text-blck-silver mb-4">Fragrance Notes</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="blck-card p-4">
                  <h3 className="font-medium text-blck-silver mb-2">Top Notes</h3>
                  <ul className="text-blck-textMuted">
                    {perfume.notes.top.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="blck-card p-4">
                  <h3 className="font-medium text-blck-silver mb-2">Middle Notes</h3>
                  <ul className="text-blck-textMuted">
                    {perfume.notes.middle.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
                <div className="blck-card p-4">
                  <h3 className="font-medium text-blck-silver mb-2">Base Notes</h3>
                  <ul className="text-blck-textMuted">
                    {perfume.notes.base.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <div className="w-full">
                <Link href="/checkout">
                  <Button variant="blck" size="lg" className="w-full">
                    Buy Now
                  </Button>
                </Link>
              </div>
              <Button 
                variant="blckOutline" 
                size="lg" 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>
            
            {/* Reviews Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold text-blck-silver mb-6">Customer Reviews</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perfume.reviews.map((review, index) => (
                  <div key={index} className="blck-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-blck-silver">{review.author}</h3>
                        <p className="text-sm text-blck-textMuted">via {review.source}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-blck-textMuted">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold text-blck-silver mb-6">You May Also Like</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {perfumes
                  .filter(p => p.id !== perfume.id)
                  .slice(0, 4)
                  .map(relatedPerfume => (
                    <div key={relatedPerfume.id} className="blck-card overflow-hidden group">
                      <div className="relative h-60">
                        <Image
                          src={relatedPerfume.image}
                          alt={relatedPerfume.name}
                          fill
                          className={`transition-all duration-500 group-hover:scale-105 ${
                            relatedPerfume.image.includes('bottle') ? 'object-contain bg-blck-cardLight' : 'object-cover'
                          }`}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading text-lg font-semibold mb-1 text-blck-silver">{relatedPerfume.name}</h3>
                        <p className="text-blck-gold mb-2">₹{relatedPerfume.price}.00</p>
                        <Button variant="blck" size="sm" asChild className="w-full">
                          <Link href={`/collections/${relatedPerfume.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
