import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

// Themed collections data
const collections = [
  {
    id: "office",
    name: "Office Collection",
    description: "Professional fragrances that make a subtle yet powerful impression in the workplace.",
    image: "/images/imperial rogue.png",
    perfumeCount: 8,
    notes: "Subtle woods, light citrus, and clean musk"
  },
  {
    id: "beach",
    name: "Beach Collection",
    description: "Fresh, aquatic scents perfect for sunny days and ocean breezes.",
    image: "/images/bottle in purple.png",
    perfumeCount: 6,
    notes: "Marine accords, coconut, and fresh citrus"
  },
  {
    id: "travel",
    name: "Travel Collection",
    description: "Portable and long-lasting fragrances for your journeys around the world.",
    image: "/images/perfume bottle collection blue bg.jpg",
    perfumeCount: 7,
    notes: "Exotic spices, amber, and aromatic herbs"
  },
  {
    id: "gym",
    name: "Gym Collection",
    description: "Energizing and refreshing scents that stay pleasant through your workout.",
    image: "/images/perfume bottle red.jpg",
    perfumeCount: 5,
    notes: "Mint, citrus, and light woods"
  },
  {
    id: "party",
    name: "Party Collection",
    description: "Bold, attention-grabbing fragrances for nights out and special occasions.",
    image: "/images/entire collection.png",
    perfumeCount: 9,
    notes: "Rich oud, sweet vanilla, and exotic florals"
  },
  {
    id: "date",
    name: "Date Collection",
    description: "Romantic and seductive scents designed to leave a lasting impression.",
    image: "/images/perfume-hero.jpg",
    perfumeCount: 7,
    notes: "Warm amber, sensual musk, and delicate florals"
  }
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-blck-darkPurple pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-blck-silver mb-4">Curated Collections</h1>
          <p className="text-blck-textMuted max-w-2xl mx-auto">
            Discover our carefully curated collections designed for every occasion and lifestyle.
            Each collection features perfumes selected specifically for their perfect fit with the setting.
          </p>
        </div>
        
        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link href={`/shop?collection=${collection.id}`} className="block">
                <div className="blck-card overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blck-accent/10 relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blck-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <div className="relative h-72">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="bg-blck-accent/90 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                        {collection.perfumeCount} Perfumes
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                      <h3 className="text-2xl font-serif font-medium mb-1 text-white group-hover:text-blck-gold transition-colors duration-300 drop-shadow-md">
                        {collection.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 relative">
                    <p className="text-blck-textMuted mb-5">{collection.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-blck-textMuted">Featured Notes:</p>
                        <p className="text-blck-silver text-sm font-medium">{collection.notes}</p>
                      </div>
                      <Button variant="blck" size="sm" className="group-hover:bg-blck-accent group-hover:scale-105 transition-all duration-300">
                        <span className="mr-2">Explore</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blck-accent to-blck-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 text-center fade-in" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-2xl font-heading font-semibold text-blck-silver mb-4">Can't Decide?</h2>
          <p className="text-blck-textMuted max-w-2xl mx-auto mb-8">
            Visit our shop to browse all our fragrances or contact our fragrance consultants for personalized recommendations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="blck" size="lg" asChild>
              <Link href="/shop">Browse All Perfumes</Link>
            </Button>
            <Button variant="blckOutline" size="lg" asChild>
              <Link href="/membership">Get Expert Advice</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
