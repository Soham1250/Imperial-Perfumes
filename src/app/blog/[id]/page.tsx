'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

// Sample FAQ article data (same as in blog page)
const faqs = [
  {
    id: 1,
    title: "How to Make Your Perfume Last Longer",
    excerpt: "Discover the secrets to extending the longevity of your favorite fragrances throughout the day.",
    image: "/images/imperial rogue.png",
    date: "April 10, 2025",
    content: `
        <h2>The Art of Making Your Perfume Last Longer</h2>
        
        <p>One of the most common questions we receive at Imperial Perfumes is how to make fragrances last longer. Here are our expert tips:</p>
        
        <h3>1. Moisturize Before Application</h3>
        <p>Always apply perfume to well-moisturized skin. Dry skin doesn't hold fragrance as effectively. Use an unscented lotion or the matching body lotion from your fragrance line before applying your perfume.</p>
        
        <h3>2. Apply to Pulse Points</h3>
        <p>Focus on applying fragrance to your pulse points - wrists, neck, behind ears, inside elbows, and behind knees. These areas generate heat, which helps diffuse the scent throughout the day.</p>
        
        <h3>3. Don't Rub, Just Spray</h3>
        <p>After spraying perfume on your wrists, avoid rubbing them together. This common habit actually breaks down the fragrance molecules and diminishes longevity.</p>
        
        <h3>4. Layer Your Fragrances</h3>
        <p>Use matching products from the same fragrance line (shower gel, body lotion, and perfume) to create layers of scent that last significantly longer.</p>
        
        <h3>5. Store Properly</h3>
        <p>Keep your perfumes away from direct sunlight and heat, which can break down the fragrance compounds. A cool, dark place is ideal for storage.</p>
        
        <h3>6. Apply to Clothes (Carefully)</h3>
        <p>Fragrances can last longer on fabrics than on skin, but be careful with delicate or light-colored clothing as some perfumes can stain. Test on an inconspicuous area first.</p>
        
        <h3>7. Consider Hair Application</h3>
        <p>Spray a small amount on your hairbrush before brushing, or directly onto the ends of your hair. Hair holds fragrance well, but use sparingly as alcohol can dry out your hair.</p>
        
        <h3>8. Choose the Right Concentration</h3>
        <p>Eau de Parfum and Parfum concentrations contain higher percentages of fragrance oils and naturally last longer than Eau de Toilette or Eau de Cologne.</p>
        
        <p>By following these simple tips, you can significantly extend the life of your favorite Imperial Perfumes fragrance and enjoy your signature scent from morning until night.</p>
      `
  },
  {
    id: 2,
    title: "How to Choose the Perfect Perfume for You",
    excerpt: "Finding your signature scent among countless options can be overwhelming. Here's our guide to selecting the perfect perfume.",
    image: "/images/imperial rogue.png",
    date: "March 25, 2025",
    content: `
        <h2>Finding Your Perfect Fragrance Match</h2>
        
        <p>With thousands of perfumes on the market, finding "the one" can feel overwhelming. Here's our step-by-step guide to discovering your perfect scent:</p>
        
        <h3>1. Understand Fragrance Families</h3>
        <p>Start by familiarizing yourself with the main fragrance families:</p>
        <ul>
          <li><strong>Floral:</strong> Rose, jasmine, lily (romantic, feminine)</li>
          <li><strong>Oriental:</strong> Amber, vanilla, spices (warm, sensual)</li>
          <li><strong>Woody:</strong> Sandalwood, cedar, vetiver (sophisticated, grounding)</li>
          <li><strong>Fresh:</strong> Citrus, aquatic, green notes (clean, invigorating)</li>
        </ul>
        <p>Consider which categories you're naturally drawn to in other scented products you enjoy.</p>
        
        <h3>2. Consider Your Lifestyle</h3>
        <p>Think about when and where you'll wear the perfume. A light, fresh scent might be perfect for office wear, while a rich oriental could be ideal for evening occasions.</p>
        
        <h3>3. Reflect on Your Personality</h3>
        <p>Are you bold and outgoing or subtle and reserved? Your fragrance can be an extension of your personality or complement it in interesting ways.</p>
        
        <h3>4. Test Properly</h3>
        <p>When sampling perfumes:</p>
        <ul>
          <li>Limit yourself to 3-4 fragrances per session to avoid olfactory fatigue</li>
          <li>Use blotter papers first, then try on skin</li>
          <li>Give each fragrance time to develop (15-30 minutes minimum)</li>
          <li>Test in different weather conditions if possible</li>
        </ul>
        
        <h3>5. Consider Seasonality</h3>
        <p>Lighter, fresher scents often work better in warm weather, while richer, spicier fragrances shine in cooler months. However, there are no strict rules - wear what you love!</p>
        
        <h3>6. Trust Your Instincts</h3>
        <p>While others' opinions can be helpful, ultimately you're the one wearing the fragrance. Choose something that makes YOU feel good.</p>
        
        <h3>7. Sample Before Committing</h3>
        <p>At Imperial Perfumes, we offer sample sizes of all our fragrances. Wear a scent for several days before investing in a full bottle.</p>
        
        <p>Remember that finding your signature scent is a journey, not a destination. Your preferences may evolve over time, and you might discover that you prefer different fragrances for different seasons or occasions.</p>
      `
  },
  {
    id: 3,
    title: "Understanding Pulse Points: Where to Apply Perfume",
    excerpt: "Learn about the strategic locations on your body that can enhance your fragrance experience.",
    image: "/images/imperial rogue.png",
    date: "March 15, 2025",
    content: `
        <h2>The Strategic Art of Perfume Application</h2>
        
        <p>Pulse points are areas where blood vessels are closest to the skin's surface, generating heat that helps diffuse and amplify your fragrance. Understanding these key locations can transform your perfume experience:</p>
        
        <h3>1. Wrists</h3>
        <p>The most traditional application spot. The wrist pulse points emit heat, helping to project the scent. Remember not to rub your wrists together after applying, as this crushes the fragrance molecules.</p>
        
        <h3>2. Neck</h3>
        <p>Both the front and back of the neck are excellent places to apply perfume. The front allows you to enjoy your own scent, while the back creates a subtle trail as you move.</p>
        
        <h3>3. Behind the Ears</h3>
        <p>This area is naturally warm and helps to diffuse the fragrance upward. It's also a spot where someone might come close enough to notice a more intimate aspect of your scent.</p>
        
        <h3>4. Inside of Elbows</h3>
        <p>The crook of your arm has thin skin and a pulse point, making it an ideal but often overlooked application area. The movement of your arms throughout the day helps waft the scent around you.</p>
        
        <h3>5. Behind the Knees</h3>
        <p>Similar to the inside of elbows, this area has thin skin and a pulse point. As you move, the scent rises, creating a subtle scent bubble around you. Particularly effective when wearing dresses or shorts.</p>
        
        <h3>6. Chest</h3>
        <p>Applying fragrance to your décolletage allows the scent to rise throughout the day. The warmth of this area helps the fragrance develop beautifully.</p>
        
        <h3>7. Hair</h3>
        <p>While not a pulse point, hair holds fragrance exceptionally well. Spray your brush lightly before brushing, or mist the air and walk through it to avoid the drying effects of alcohol directly on your hair.</p>
        
        <h3>8. Navel</h3>
        <p>An ancient application spot used in Middle Eastern perfume traditions. The warmth of this area helps the scent to rise and envelop you.</p>
        
        <h3>Advanced Tip: Strategic Layering</h3>
        <p>For special occasions, apply different concentrations of the same fragrance to different pulse points. For example, parfum at pulse points that are closest to others (neck, wrists), and eau de toilette on other areas for a complex, multi-dimensional effect.</p>
        
        <p>Remember that with quality fragrances like Imperial Perfumes, less is more. You want your scent to be a pleasant discovery, not an overwhelming announcement.</p>
      `
  },
  {
    id: 4,
    title: "The Art of Fragrance Layering",
    excerpt: "Explore how combining different scents can create a unique, personalized fragrance experience that's truly your own.",
    image: "/images/imperial rogue.png",
    date: "February 28, 2025",
    content: `
        <h2>Creating Your Signature Scent Through Layering</h2>
        
        <p>Fragrance layering is the art of combining different scents to create a unique, personalized aroma that's distinctly yours. This technique, long practiced in Middle Eastern perfumery traditions, has gained popularity worldwide for its creative possibilities.</p>
        
        <h3>What is Fragrance Layering?</h3>
        <p>Layering involves combining two or more fragrances either by:</p>
        <ul>
          <li>Wearing them simultaneously on different parts of the body</li>
          <li>Layering different products from the same or complementary scent families</li>
          <li>Applying one fragrance over another on the same area</li>
        </ul>
        
        <h3>Basic Principles of Successful Layering</h3>
        
        <h4>1. Start with a Foundation</h4>
        <p>Begin with a relatively simple, single-note fragrance as your base. Scents featuring vanilla, musk, amber, or sandalwood make excellent foundations.</p>
        
        <h4>2. Complement, Don't Compete</h4>
        <p>Choose fragrances that enhance each other rather than fight for dominance. Fragrances from the same family often work well together.</p>
        
        <h4>3. Consider Intensity</h4>
        <p>Balance is key. If using a powerful fragrance, pair it with something lighter so they don't overwhelm each other.</p>
        
        <h3>Recommended Layering Combinations</h3>
        
        <p><strong>For Beginners:</strong></p>
        <ul>
          <li>Vanilla + Amber: Creates a warm, cozy, slightly sweet aura</li>
          <li>Rose + Oud: A classic Middle Eastern combination of floral and woody depth</li>
          <li>Citrus + Neroli: Brightens and extends the freshness of both notes</li>
          <li>Sandalwood + Jasmine: Balances the sweetness of jasmine with grounding sandalwood</li>
        </ul>
        
        <p><strong>Advanced Combinations:</strong></p>
        <ul>
          <li>Leather + Vanilla + Tobacco: A sophisticated, rich blend with depth and warmth</li>
          <li>Bergamot + Vetiver + Amber: Fresh top notes with a warm, earthy dry-down</li>
          <li>Saffron + Rose + Oud: A luxurious, complex blend inspired by Middle Eastern perfumery</li>
        </ul>
        
        <h3>Product Layering</h3>
        <p>Beyond combining different perfumes, consider these layering techniques:</p>
        <ul>
          <li>Use scented body wash, followed by matching body lotion, then the perfume</li>
          <li>Apply unscented lotion first to help the fragrance adhere better to skin</li>
          <li>Layer perfume with a complementary scented hair mist</li>
          <li>Use scented powder as a final layer to extend longevity</li>
        </ul>
        
        <h3>Experimentation is Key</h3>
        <p>The beauty of fragrance layering is that there are no strict rules. Start with small amounts, keep notes of successful combinations, and don't be afraid to try unexpected pairings. Your perfect signature scent might be a combination no one has thought of before!</p>
        
        <p>At Imperial Perfumes, we've designed many of our fragrances with layering in mind. Visit one of our boutiques for a personalized layering consultation with our fragrance experts.</p>
      `
  },
  {
    id: 5,
    title: "Understanding Fragrance Notes and How They Develop",
    excerpt: "Learn about top, middle, and base notes and how they create the complete fragrance experience over time.",
    image: "/images/imperial rogue.png",
    date: "February 15, 2025",
    content: `
        <h2>The Symphony of Scent: Understanding Fragrance Notes</h2>
        
        <p>A fine perfume unfolds over time like a musical composition, revealing different aspects of its character as it develops on your skin. Understanding the structure of fragrance notes helps you appreciate this olfactory journey.</p>
        
        <h3>The Three-Tier Structure</h3>
        
        <p>Most fragrances are composed of three layers of notes that reveal themselves at different times:</p>
        
        <h4>1. Top Notes (Head Notes)</h4>
        <p>These are the first impression of a fragrance, what you smell immediately upon application. They are typically:</p>
        <ul>
          <li>Light, fresh, and volatile</li>
          <li>Last approximately 15-30 minutes</li>
          <li>Often feature citrus (bergamot, lemon), light fruits, or aromatic herbs</li>
          <li>Create the crucial first impression but evaporate quickly</li>
        </ul>
        
        <h4>2. Middle Notes (Heart Notes)</h4>
        <p>As top notes fade, the middle notes emerge and form the "heart" of the fragrance:</p>
        <ul>
          <li>Appear after about 30 minutes to an hour</li>
          <li>Last 2-4 hours on average</li>
          <li>Often feature florals (rose, jasmine, lily) or spices (cinnamon, cardamom)</li>
          <li>Serve as a buffer between the fleeting top notes and the long-lasting base</li>
          <li>Form the main character and theme of the fragrance</li>
        </ul>
        
        <h4>3. Base Notes</h4>
        <p>The foundation of the fragrance that creates lasting impression:</p>
        <ul>
          <li>Emerge after about 30 minutes to an hour, but become more prominent as middle notes fade</li>
          <li>Can last 6+ hours, sometimes even into the next day</li>
          <li>Typically rich, deep materials like woods (sandalwood, cedar), resins (amber, myrrh), musks, vanilla, and leather</li>
          <li>Provide depth, richness, and longevity to the composition</li>
          <li>Create the final memory of the fragrance</li>
        </ul>
        
        <h3>Why Fragrances Smell Different Over Time</h3>
        
        <p>This three-tier structure explains why a perfume can smell completely different on a blotter in the store versus several hours later on your skin. It's also why you should never judge a fragrance by its initial impression alone.</p>
        
        <p>The development process is affected by:</p>
        <ul>
          <li><strong>Skin chemistry:</strong> Your unique body chemistry interacts with the fragrance</li>
          <li><strong>Temperature:</strong> Heat accelerates evaporation and development</li>
          <li><strong>Humidity:</strong> Affects how the fragrance projects and develops</li>
          <li><strong>Skin type:</strong> Dry skin tends to absorb fragrance more quickly</li>
        </ul>
        
        <h3>How to Evaluate a Fragrance Properly</h3>
        
        <p>To truly understand a fragrance:</p>
        <ol>
          <li>Apply to skin (not just a paper blotter)</li>
          <li>Note your first impression (top notes)</li>
          <li>Check again after 30 minutes to an hour (middle notes)</li>
          <li>Evaluate after several hours (base notes)</li>
          <li>Consider how the entire journey made you feel</li>
        </ol>
        
        <p>At Imperial Perfumes, we craft our fragrances with careful attention to this development process, ensuring a harmonious transition from the initial spritz to the final dry-down hours later. This artful progression is what distinguishes a truly exceptional perfume from a simple pleasant smell.</p>
      `
  },
  {
    id: 6,
    title: "Seasonal Fragrance Guide: Adapting Your Scent to the Weather",
    excerpt: "Discover how to adjust your fragrance choices to complement different seasons and weather conditions.",
    image: "/images/imperial rogue.png",
    date: "January 30, 2025",
    content: `
        <h2>Dressing Your Senses for the Season</h2>
        
        <p>Just as you adapt your wardrobe to the changing seasons, your fragrance collection can evolve throughout the year to complement the weather and your mood. Here's our guide to seasonal scent selection:</p>
        
        <h3>Summer Fragrances</h3>
        
        <p><strong>When the temperature rises:</strong></p>
        <ul>
          <li><strong>Opt for:</strong> Light, fresh, and citrusy scents that feel cooling and invigorating</li>
          <li><strong>Key notes:</strong> Lemon, bergamot, grapefruit, neroli, light florals, aquatic notes, mint</li>
          <li><strong>Why they work:</strong> Heat amplifies fragrance, so lighter scents won't become overwhelming</li>
          <li><strong>Application tip:</strong> Apply sparingly and consider refreshing throughout the day rather than applying heavily once</li>
          <li><strong>Imperial Perfumes recommendations:</strong> Royal Bergamot, Imperial Neroli, Majestic Orange Blossom</li>
        </ul>
        
        <h3>Fall Fragrances</h3>
        
        <p><strong>As leaves change color:</strong></p>
        <ul>
          <li><strong>Opt for:</strong> Warm, spicy fragrances with moderate depth</li>
          <li><strong>Key notes:</strong> Cinnamon, cardamom, amber, fig, apple, pear, light woods</li>
          <li><strong>Why they work:</strong> These scents complement the transitional weather and evoke the coziness of the season</li>
          <li><strong>Application tip:</strong> Focus on pulse points to allow the warmth of your body to develop the spice notes</li>
          <li><strong>Imperial Perfumes recommendations:</strong> Majestic Cardamom, Imperial Cinnamon, Sovereign Spice</li>
        </ul>
        
        <h3>Winter Fragrances</h3>
        
        <p><strong>During the coldest months:</strong></p>
        <ul>
          <li><strong>Opt for:</strong> Rich, deep, and enveloping scents with substantial presence</li>
          <li><strong>Key notes:</strong> Vanilla, oud, leather, tobacco, incense, amber, dark chocolate, heavy woods</li>
          <li><strong>Why they work:</strong> Cold air doesn't carry scent as well, so richer fragrances can shine without becoming cloying</li>
          <li><strong>Application tip:</strong> You can apply more generously than in summer, and consider layering with scented body products</li>
          <li><strong>Imperial Perfumes recommendations:</strong> Royal Oud, Sovereign Leather, Imperial Vanilla, Regal Tobacco</li>
        </ul>
        
        <h3>Spring Fragrances</h3>
        
        <p><strong>As nature reawakens:</strong></p>
        <ul>
          <li><strong>Opt for:</strong> Floral, green, and gently fruity fragrances that feel optimistic and fresh</li>
          <li><strong>Key notes:</strong> Rose, lily of the valley, hyacinth, green notes, light fruits, soft woods</li>
          <li><strong>Why they work:</strong> These scents mirror the blooming world around you and feel harmonious with the season</li>
          <li><strong>Application tip:</strong> Moderate application works well, focusing on neck and wrists</li>
          <li><strong>Imperial Perfumes recommendations:</strong> Imperial Rose, Regal Lily, Noble Magnolia, Regal Hyacinth</li>
        </ul>
        
        <h3>Beyond Seasons: Consider Climate</h3>
        
        <p>Your local climate matters more than the calendar date:</p>
        <ul>
          <li><strong>Humid environments:</strong> Fragrances project more, so choose lighter concentrations</li>
          <li><strong>Dry climates:</strong> Scents can fade faster, so consider richer formulations or reapplication</li>
          <li><strong>Consistent tropical climates:</strong> Fresh, citrus, and light floral scents often work year-round</li>
        </ul>
        
        <h3>Breaking the Rules</h3>
        
        <p>While these guidelines can be helpful, the most important rule is to wear what makes you feel good. A light citrus can be wonderfully unexpected in winter, while a rich amber might be your personal signature regardless of season.</p>
        
        <p>At Imperial Perfumes, we believe in building a fragrance wardrobe that allows you to express different facets of your personality throughout the year. Visit our boutiques for personalized seasonal recommendations tailored to your preferences and local climate.</p>
      `
  }
];

const ArticlePage = () => {
  const params = useParams();
  const articleId = Number(params.id);
  
  // Find the article with the matching ID
  const article = faqs.find(faq => faq.id === articleId);
  
  // If article not found, show a message
  if (!article) {
    return (
      <div className="bg-blck-darkPurple min-h-screen text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold mb-6">Article Not Found</h1>
          <p className="text-gray-300 mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/blog">
            <Button className="bg-blck-accent hover:bg-blck-accent/80 text-white">
              Return to Journal
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-blck-darkPurple min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center text-gray-300 hover:text-blck-gold transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to Journal
          </Link>
          
          {/* Article Header */}
          <div className="mb-12">
            <span className="text-blck-gold text-sm font-medium mb-2 block">{article.date}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              {article.title}
            </h1>
            <p className="text-gray-300 text-lg">
              {article.excerpt}
            </p>
          </div>
          
          {/* Featured Image */}
          <div className="relative w-full h-80 md:h-96 mb-12 rounded-lg overflow-hidden">
            <Image 
              src={article.image} 
              alt={article.title} 
              fill
              className="object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-blck-purple flex items-center">
            <div className="w-12 h-12 rounded-full bg-blck-card flex items-center justify-center mr-4">
              <span className="text-blck-gold font-serif text-lg">SP</span>
            </div>
            <div>
              <p className="font-medium text-blck-silver">Soham Pansare</p>
              <p className="text-gray-400 text-sm">Founder, Imperial Perfumes</p>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-serif font-bold mb-6 text-blck-gold">Related Articles</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs
                .filter(faq => faq.id !== articleId)
                .slice(0, 2)
                .map(relatedArticle => (
                  <Link 
                    href={`/blog/${relatedArticle.id}`} 
                    key={relatedArticle.id}
                    className="bg-blck-card rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blck-accent/20 transition-all duration-300"
                  >
                    <div className="p-6">
                      <h4 className="text-xl font-medium mb-2 text-blck-silver">{relatedArticle.title}</h4>
                      <p className="text-gray-400 mb-4">{relatedArticle.excerpt}</p>
                      <span className="text-blck-gold text-sm">Read Article →</span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-16 text-center">
            <Link href="/blog">
              <Button className="bg-transparent border border-blck-accent text-blck-accent hover:bg-blck-accent hover:text-white transition-colors">
                Back to Journal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
