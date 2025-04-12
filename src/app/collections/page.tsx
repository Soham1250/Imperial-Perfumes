import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

// Sample perfume data
const perfumes = [
  {
    id: 1,
    name: "Imperial Perfume 1",
    description: "A captivating blend of exotic notes that transport you to distant lands.",
    price: 199,
    image: "/images/perfume-1.jpg"
  },
  {
    id: 2,
    name: "Imperial Perfume 2",
    description: "A rich and warm fragrance with notes of amber, vanilla, and sandalwood.",
    price: 229,
    image: "/images/bottle in purple.png"
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
    image: "/images/perfume-3.jpg"
  },
  {
    id: 5,
    name: "Imperial Perfume 5",
    description: "A fresh and invigorating scent with citrus and marine accords.",
    price: 179,
    image: "/images/perfume-1.jpg"
  },
  {
    id: 6,
    name: "Imperial Perfume 6",
    description: "A sophisticated blend of rose, patchouli, and bergamot.",
    price: 219,
    image: "/images/bottle in purple.png"
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
    image: "/images/perfume-3.jpg"
  },
  {
    id: 9,
    name: "Imperial Perfume 9",
    description: "A woody fragrance with notes of cedar, vetiver, and bergamot.",
    price: 209,
    image: "/images/perfume-1.jpg"
  },
  {
    id: 10,
    name: "Imperial Perfume 10",
    description: "A luxurious blend of rare spices, amber, and vanilla.",
    price: 279,
    image: "/images/bottle in purple.png"
  }
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-blck-purple pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-blck-silver mb-4">Our Collections</h1>
          <p className="text-blck-textMuted max-w-2xl mx-auto">
            Explore our exquisite range of premium fragrances, each crafted to evoke unique emotions and memories.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Button variant="blck" size="sm">All</Button>
          <Button variant="blckOutline" size="sm">For Him</Button>
          <Button variant="blckOutline" size="sm">For Her</Button>
          <Button variant="blckOutline" size="sm">Unisex</Button>
          <Button variant="blckOutline" size="sm">Limited Edition</Button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {perfumes.map((perfume) => (
            <div key={perfume.id} className="blck-card overflow-hidden group">
              <div className="relative h-80">
                <Image
                  src={perfume.image}
                  alt={perfume.name}
                  fill
                  className={`transition-all duration-500 group-hover:scale-105 ${
                    perfume.image.includes('bottle') ? 'object-contain bg-blck-cardLight' : 'object-cover'
                  }`}
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2 text-blck-silver">{perfume.name}</h3>
                <p className="text-blck-textMuted mb-4 line-clamp-2">{perfume.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-blck-gold">${perfume.price}.00</span>
                  <Button variant="blck" size="sm" asChild>
                    <Link href={`/collections/${perfume.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
