'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// Sample perfume data - 50 perfumes
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
  { id: 11, name: "Noble Vetiver", description: "Earthy vetiver with citrus and spicy notes", price: 189 },
  { id: 12, name: "Imperial Jasmine", description: "Intoxicating jasmine with tuberose and musk", price: 199 },
  { id: 13, name: "Regal Sandalwood", description: "Creamy sandalwood with rose and vanilla", price: 209 },
  { id: 14, name: "Majestic Cedar", description: "Aromatic cedar with bergamot and amber", price: 179 },
  { id: 15, name: "Crown Amber", description: "Golden amber with vanilla and tonka bean", price: 229 },
  { id: 16, name: "Imperial Vanilla", description: "Rich vanilla with spices and woody notes", price: 189 },
  { id: 17, name: "Royal Incense", description: "Mystical incense with resins and woods", price: 219 },
  { id: 18, name: "Sovereign Spice", description: "Warm spices with amber and leather", price: 199 },
  { id: 19, name: "Noble Patchouli", description: "Deep patchouli with dark chocolate and woods", price: 209 },
  { id: 20, name: "Regal Tobacco", description: "Aromatic tobacco with honey and spices", price: 229 },
  { id: 21, name: "Imperial Neroli", description: "Fresh neroli with orange blossom and musk", price: 179 },
  { id: 22, name: "Majestic Cardamom", description: "Spicy cardamom with citrus and woods", price: 189 },
  { id: 23, name: "Royal Saffron", description: "Precious saffron with rose and amber", price: 249 },
  { id: 24, name: "Crown Myrrh", description: "Ancient myrrh with frankincense and amber", price: 219 },
  { id: 25, name: "Noble Agarwood", description: "Rare agarwood with rose and spices", price: 269 },
  { id: 26, name: "Imperial Cinnamon", description: "Warm cinnamon with vanilla and amber", price: 189 },
  { id: 27, name: "Regal Frankincense", description: "Sacred frankincense with myrrh and woods", price: 229 },
  { id: 28, name: "Sovereign Amber", description: "Deep amber with vanilla and musk", price: 199 },
  { id: 29, name: "Majestic Tuberose", description: "Opulent tuberose with jasmine and vanilla", price: 209 },
  { id: 30, name: "Royal Gardenia", description: "Lush gardenia with green notes and musk", price: 189 },
  { id: 31, name: "Imperial Lavender", description: "Aromatic lavender with vanilla and amber", price: 169 },
  { id: 32, name: "Noble Magnolia", description: "Delicate magnolia with citrus and woods", price: 179 },
  { id: 33, name: "Regal Lily", description: "Elegant lily with jasmine and musk", price: 189 },
  { id: 34, name: "Crown Violet", description: "Powdery violet with iris and woods", price: 199 },
  { id: 35, name: "Majestic Peony", description: "Fresh peony with rose and fruity notes", price: 189 },
  { id: 36, name: "Imperial Orris", description: "Precious orris with violet and powdery notes", price: 229 },
  { id: 37, name: "Royal Narcissus", description: "Elegant narcissus with green notes and woods", price: 209 },
  { id: 38, name: "Sovereign Osmanthus", description: "Delicate osmanthus with apricot and leather", price: 199 },
  { id: 39, name: "Noble Ylang", description: "Exotic ylang-ylang with jasmine and vanilla", price: 189 },
  { id: 40, name: "Regal Frangipani", description: "Tropical frangipani with coconut and vanilla", price: 179 },
  { id: 41, name: "Imperial Lotus", description: "Pure lotus with water notes and musk", price: 189 },
  { id: 42, name: "Majestic Orange Blossom", description: "Fresh orange blossom with neroli and honey", price: 199 },
  { id: 43, name: "Royal Mimosa", description: "Delicate mimosa with violet and almond", price: 209 },
  { id: 44, name: "Crown Champaca", description: "Exotic champaca with ylang and sandalwood", price: 219 },
  { id: 45, name: "Noble Freesia", description: "Fresh freesia with citrus and green notes", price: 179 },
  { id: 46, name: "Imperial Carnation", description: "Spicy carnation with clove and vanilla", price: 189 },
  { id: 47, name: "Regal Hyacinth", description: "Green hyacinth with floral and woody notes", price: 199 },
  { id: 48, name: "Sovereign Heliotrope", description: "Sweet heliotrope with vanilla and almond", price: 189 },
  { id: 49, name: "Majestic Immortelle", description: "Golden immortelle with honey and tobacco", price: 229 },
  { id: 50, name: "Royal Balsam", description: "Warm balsam with vanilla and amber", price: 209 }
];

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  
  const filteredPerfumes = perfumes.filter(perfume => {
    const matchesSearch = perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         perfume.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (priceFilter === 'all') return matchesSearch;
    if (priceFilter === 'under2000' && perfume.price < 2000) return matchesSearch;
    if (priceFilter === '2000to2500' && perfume.price >= 2000 && perfume.price <= 2500) return matchesSearch;
    if (priceFilter === 'over2500' && perfume.price > 2500) return matchesSearch;
    
    return false;
  });

  return (
    <div className="bg-blck-darkPurple min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-center">
          <span className="text-gradient-gold">Imperial</span> Collection
        </h1>
        <p className="text-gray-300 text-center mb-12">Discover our exclusive range of luxury fragrances</p>
        
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search perfumes..."
              className="w-full px-4 py-2 bg-blck-purple text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blck-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto">
            <select 
              className="w-full px-4 py-2 bg-blck-purple text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blck-gold"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under2000">Under ₹2000</option>
              <option value="2000to2500">₹2000 - ₹2500</option>
              <option value="over2500">Over ₹2500</option>
            </select>
          </div>
        </div>
        
        {/* Perfume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPerfumes.map((perfume) => (
            <Link href={`/checkout`} key={perfume.id}>
              <div className="bg-blck-card rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blck-accent/20 transition-all duration-300 h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-medium mb-2 text-blck-silver">{perfume.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{perfume.description}</p>
                  <p className="text-blck-gold font-medium">₹{perfume.price}</p>
                </div>
                <div className="px-6 pb-6">
                  <Button className="w-full bg-blck-accent hover:bg-blck-accent/80 text-white">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredPerfumes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No perfumes found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
