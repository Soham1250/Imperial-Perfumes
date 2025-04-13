import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const PerfumeryArtPage = () => {
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
            <span className="text-blck-gold text-sm font-medium mb-2 block">FEATURED ARTICLE • APRIL 8, 2025</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              The Art of Perfumery: A Journey Through Time
            </h1>
            <p className="text-gray-300 text-lg">
              From ancient Egyptian rituals to modern molecular science, explore the fascinating evolution of perfume creation and appreciation throughout human history.
            </p>
          </div>
          
          {/* Featured Image */}
          <div className="relative w-full h-80 md:h-96 mb-12 rounded-lg overflow-hidden">
            <Image 
              src="/images/imperial rogue.png" 
              alt="The Art of Perfumery" 
              fill
              className="object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            <h2>The Ancient Origins of Perfumery</h2>
            
            <p>
              The word "perfume" comes from the Latin "per fumum," meaning "through smoke," a reference to the earliest form of fragrance: incense. The art of perfumery dates back over 4,000 years, with evidence of perfume-making found in ancient Mesopotamia, Egypt, and the Indus Valley. These early fragrances were primarily used in religious ceremonies, where aromatic woods and resins were burned as offerings to the gods.
            </p>
            
            <p>
              Ancient Egyptians elevated perfumery to an art form, developing sophisticated techniques for extracting and preserving scents. They created the first recorded perfumes by steeping flowers, herbs, and woods in oils, producing fragrant unguents used for both religious and personal purposes. The tomb of Tutankhamun contained several alabaster jars that once held precious perfumes, demonstrating their cultural significance.
            </p>
            
            <h2>From East to West: The Spread of Perfumery</h2>
            
            <p>
              The knowledge of perfume-making spread through trade routes, with significant contributions from Persian and Arab cultures. The Persian physician Avicenna (980-1037 CE) is credited with refining the process of steam distillation, revolutionizing the extraction of essential oils from plant materials. This innovation allowed for more concentrated and stable fragrances.
            </p>
            
            <p>
              By the 14th century, perfumery had reached Europe, with Hungary Water (a blend of rosemary and other herbs in alcohol) becoming the first alcohol-based perfume widely used in the Western world. The Renaissance period saw Italy emerge as a center of perfumery, particularly in Florence and Venice, where Catherine de' Medici's personal perfumer created exclusive scents that she introduced to the French court upon her marriage to Henry II.
            </p>
            
            <h2>The Birth of Modern Perfumery in France</h2>
            
            <p>
              France became the undisputed capital of perfumery during the 17th and 18th centuries. The town of Grasse, with its ideal climate for growing aromatic plants, developed into the world's perfume capital. The reign of Louis XV, known as "the perfumed court," saw fragrance reach new heights of sophistication and social importance.
            </p>
            
            <p>
              The 19th century brought significant technological advances. The synthesis of coumarin in 1868 marked the beginning of modern perfumery, introducing the first synthetic fragrance ingredients. This innovation expanded the perfumer's palette beyond natural materials, allowing for entirely new scent creations. Fougère Royale (1882) by Houbigant was the first perfume to incorporate a synthetic component, establishing a new fragrance family that continues to influence men's perfumery today.
            </p>
            
            <h2>The 20th Century: Perfume as Art and Industry</h2>
            
            <p>
              The early 20th century saw the emergence of iconic fragrances that would define modern perfumery. In 1921, Chanel No. 5 revolutionized the industry with its abstract composition and pioneering use of aldehydes. This era marked the transition from simple soliflores (single-flower scents) to complex, multi-faceted compositions that told stories and evoked emotions.
            </p>
            
            <p>
              The post-war period witnessed the democratization of perfume. Once a luxury for the elite, fragrance became accessible to the middle class, with ready-to-wear fashion houses launching their own perfume lines. The 1970s and 80s brought bold, statement fragrances that reflected the cultural shifts of their time, while the 90s saw a trend toward cleaner, more minimalist scents.
            </p>
            
            <h2>Contemporary Perfumery: Between Science and Art</h2>
            
            <p>
              Today's perfumery exists at the intersection of cutting-edge science and timeless artistry. Advanced analytical techniques like gas chromatography and mass spectrometry allow perfumers to analyze and recreate virtually any scent in nature. Meanwhile, headspace technology captures the aroma of living flowers and objects that cannot be extracted through traditional methods.
            </p>
            
            <p>
              The rise of niche perfumery in the late 20th and early 21st centuries has pushed creative boundaries, with independent houses prioritizing artistic expression over mass appeal. These perfumers often return to traditional techniques and high-quality natural materials, while simultaneously embracing innovative molecules and unconventional inspirations.
            </p>
            
            <h2>The Future of Fragrance</h2>
            
            <p>
              As we look to the future, several trends are shaping the evolution of perfumery. Sustainability has become a central concern, with brands exploring eco-friendly sourcing, biodegradable packaging, and ethical production methods. Advances in biotechnology are enabling the creation of lab-grown fragrance ingredients that reduce environmental impact without compromising quality.
            </p>
            
            <p>
              Personalization represents another frontier, with technology enabling custom fragrances based on individual preferences, skin chemistry, and even DNA. Artificial intelligence is beginning to play a role in fragrance creation, analyzing successful formulas and suggesting new combinations of notes.
            </p>
            
            <p>
              Despite these technological advances, the essence of perfumery remains unchanged: to create sensory experiences that evoke emotion, trigger memories, and tell stories. At Imperial Perfumes, we honor this rich heritage while embracing innovation, creating fragrances that bridge the ancient and the contemporary—timeless scents for the modern connoisseur.
            </p>
            
            <p>
              The journey of perfumery continues to unfold, with each new creation adding to a legacy thousands of years in the making. As you explore our collection, you're not just experiencing a fragrance—you're participating in one of humanity's oldest and most intimate art forms.
            </p>
          </div>
          
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
              <Link href="/blog/1" className="bg-blck-card rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blck-accent/20 transition-all duration-300">
                <div className="p-6">
                  <h4 className="text-xl font-medium mb-2 text-blck-silver">How to Make Your Perfume Last Longer</h4>
                  <p className="text-gray-400 mb-4">Discover the secrets to extending the longevity of your favorite fragrances throughout the day.</p>
                  <span className="text-blck-gold text-sm">Read Article →</span>
                </div>
              </Link>
              
              <Link href="/blog/2" className="bg-blck-card rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blck-accent/20 transition-all duration-300">
                <div className="p-6">
                  <h4 className="text-xl font-medium mb-2 text-blck-silver">How to Choose the Perfect Perfume for You</h4>
                  <p className="text-gray-400 mb-4">Finding your signature scent among countless options can be overwhelming. Here's our guide.</p>
                  <span className="text-blck-gold text-sm">Read Article →</span>
                </div>
              </Link>
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

export default PerfumeryArtPage;
