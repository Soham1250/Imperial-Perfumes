import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Custom component for highlighted terms
const HighlightTerm = ({ children }: { children: React.ReactNode }) => (
  <span className="relative group cursor-pointer">
    <span className="text-blck-gold transition-colors duration-300 group-hover:text-white">
      {children}
    </span>
    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blck-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    <span className="absolute -inset-1 bg-blck-accent/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </span>
);

const AboutPage = () => {
  return (
    <div className="bg-blck-darkPurple min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-gradient-gold">Our</span> Story
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            The journey of Imperial Perfumes, from passion to luxury
          </p>
        </div>
        
        {/* Founder Story - Centered */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-serif font-bold mb-6 text-blck-gold text-center">
            The Founder's Journey
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-4">
              Imperial Perfumes was born from a singular vision—to craft fragrances that <HighlightTerm>transcend time</HighlightTerm> and leave a lasting impression. Founded by Soham Pansare, a passionate creator with a deep appreciation for artistry and detail, the brand emerged at the intersection of tradition, sophistication, and modern sensibility.
            </p>
            
            <p className="mb-4">
              For Soham, perfume is more than scent—it's <HighlightTerm>emotion, identity, and memory</HighlightTerm> bottled into elegance. Driven by the belief that a fragrance should tell a story before a word is spoken, he set out to build a house of perfumes that would carry signature notes of power, poise, and personality.
            </p>
            
            <p className="mb-4">
              The journey began in the quiet corners of Mumbai, where Soham spent countless hours studying the art of <HighlightTerm>perfumery</HighlightTerm>. His fascination with scent started in childhood, where the aromatic spice markets and incense-filled temples of India created a rich tapestry of olfactory memories. These early experiences would later inform his unique approach to fragrance creation—blending <HighlightTerm>Eastern mystique</HighlightTerm> with <HighlightTerm>Western refinement</HighlightTerm>.
            </p>
            
            <p className="mb-4">
              After years of research and experimentation, Soham identified a significant gap in the Indian fragrance market. Luxury international brands were prohibitively expensive for most consumers, while local options often lacked sophistication and longevity. This realization sparked the foundation of Imperial Perfumes in January 2024—a brand committed to <HighlightTerm>democratizing luxury</HighlightTerm> without compromising on quality.
            </p>
            
            <p className="mb-4">
              "I wanted to create fragrances that didn't just smell expensive, but felt <HighlightTerm>meaningful</HighlightTerm>," Soham explains. "Each bottle should contain not just scent, but story and soul." This philosophy guided his meticulous selection of ingredients, partnering with ethical suppliers who shared his commitment to quality and sustainability.
            </p>
            
            <p className="mb-4">
              Each Imperial fragrance is carefully curated, blending <HighlightTerm>rare ingredients</HighlightTerm> and refined olfactory techniques. From warm woody undertones to fresh citrus highs, every note is chosen with intention, precision, and soul. The result is a collection that doesn't just smell luxurious—it feels imperial.
            </p>
            
            <p className="mb-4">
              The creative process behind each fragrance is both <HighlightTerm>scientific and deeply intuitive</HighlightTerm>. Soham works closely with master perfumers, often spending months perfecting a single formulation. "Creating a fragrance is like composing music," he notes. "You need technical expertise, but also an understanding of how notes harmonize and evolve over time." This attention to detail extends to every aspect of the brand—from the weight of each bottle to the texture of the packaging.
            </p>
            
            <p className="mb-4">
              What truly sets Imperial Perfumes apart is its commitment to creating <HighlightTerm>scent experiences</HighlightTerm> rather than mere products. Each fragrance is designed to evolve throughout the day, revealing different facets of its character as it interacts with the wearer's skin chemistry. This dynamic quality ensures that no two experiences are identical—each person discovers their own unique relationship with the scent.
            </p>
            
            <p className="mb-4">
              By June 2024, Imperial Perfumes had expanded its collection to 25 distinct fragrances, each telling its own story. Word spread quickly throughout Mumbai's discerning circles, with customers drawn to both the exceptional quality and the brand's distinctive aesthetic. The minimalist, elegant design language—characterized by deep purples, blacks, and subtle gold accents—became instantly recognizable.
            </p>
            
            <p className="mb-4">
              Rooted in <HighlightTerm>quality, minimalism, and timeless design</HighlightTerm>, our perfumes are crafted not only to captivate but to become part of your identity. We believe scent is an extension of self—subtle yet unforgettable. This philosophy extends beyond the fragrances themselves to the entire customer experience, from discovery to purchase and beyond.
            </p>
            
            <p className="mb-4">
              January 2025 marked a pivotal moment in the Imperial Perfumes journey with the launch of the brand's online presence. This expansion allowed the fragrances to reach a wider audience throughout Mumbai, while maintaining the personalized service that had become the brand's hallmark. <HighlightTerm>Digital storytelling</HighlightTerm> became an essential component, with detailed descriptions of fragrance notes and inspiration helping customers navigate the often intimidating world of fine perfumery.
            </p>
            
            <p className="mb-4">
              Looking toward the future, Soham envisions Imperial Perfumes as more than just a fragrance house—but as a <HighlightTerm>curator of sensory experiences</HighlightTerm> that enrich daily life. Plans include expanding into complementary categories like home fragrances and personal care, always with the same unwavering commitment to quality and artistry.
            </p>
            
            <p className="mb-4">
              "Fragrance has the unique power to <HighlightTerm>transport us across time and space</HighlightTerm>, to evoke memories we thought forgotten, and to create new ones that will linger for years to come," Soham reflects. "At Imperial Perfumes, we're not just selling scent—we're offering the opportunity to write new chapters of your personal story."
            </p>
            
            <p className="text-center font-medium text-xl text-blck-gold mt-8">
              At Imperial Perfumes, we don't follow trends. <br/>
              We create <HighlightTerm>legacies</HighlightTerm>.
            </p>
            
            <p className="text-center mt-4">
              Each bottle represents our commitment to craftsmanship, our respect for tradition, and our belief that true luxury lies in experiences that engage all the senses. We invite you to discover our collection and find the fragrance that speaks to your own personal story.
            </p>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center text-blck-gold">
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blck-accent/30"></div>
            
            {/* Timeline Items */}
            <div className="relative z-10">
              {/* 2024 - January */}
              <div className="mb-12 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-medium mb-2 text-blck-gold">January 2024</h3>
                  <p className="text-gray-300">Imperial Perfumes founded by Soham Pansare as an offline business with no physical store</p>
                </div>
                <div className="bg-blck-accent w-10 h-10 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              {/* 2024 - June */}
              <div className="mb-12 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="bg-blck-accent w-10 h-10 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                  <h3 className="text-xl font-medium mb-2 text-blck-gold">June 2024</h3>
                  <p className="text-gray-300">Expanded collection to 25 fragrances and gained local recognition in Mumbai</p>
                </div>
              </div>
              
              {/* 2025 - January */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                  <h3 className="text-xl font-medium mb-2 text-blck-gold">January 2025</h3>
                  <p className="text-gray-300">Launched online store and began shipping locally in Mumbai</p>
                </div>
                <div className="bg-blck-accent w-10 h-10 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold mb-10 text-center text-blck-gold">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blck-card p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blck-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blck-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-blck-silver">Quality</h3>
              <p className="text-gray-400">
                We source only the finest ingredients from around the world, ensuring each fragrance meets our exacting standards of complexity, balance, and longevity.
              </p>
            </div>
            
            <div className="bg-blck-card p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blck-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blck-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-blck-silver">Innovation</h3>
              <p className="text-gray-400">
                We blend traditional perfumery techniques with modern innovation, creating unique scent profiles that stand apart in an overcrowded market.
              </p>
            </div>
            
            <div className="bg-blck-card p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blck-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blck-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-blck-silver">Heritage</h3>
              <p className="text-gray-400">
                We honor India's rich perfumery traditions while creating fragrances that appeal to contemporary global sensibilities.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blck-card rounded-xl p-10 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4 text-blck-gold">Experience Imperial Perfumes</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our collection of exquisite fragrances crafted with passion and precision.
            Each bottle tells a story, each scent creates a memory.
          </p>
          <Link href="/shop">
            <Button className="bg-blck-accent hover:bg-blck-accent/80 text-white px-8 py-3 text-lg">
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
