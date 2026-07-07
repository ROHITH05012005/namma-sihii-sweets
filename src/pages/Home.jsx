import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCategories } from '../context/CategoryContext';
import './Home.css';

const Home = () => {
  const { categories } = useCategories();
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (categories.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [categories.length]);

  return (
    <div className="home-page">
      {/* Hero Slideshow Section */}
      <section className="hero-section" style={{ backgroundColor: 'var(--background)' }}>
        {categories.map((cat, index) => (
          <div 
            key={`hero-${index}`}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${cat.image})` }}
          />
        ))}
        
        <div className="container hero-content">
          <div className="hero-text" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
            <h1 style={{ color: 'var(--background)', textShadow: '0 4px 16px rgba(0,0,0,0.9)' }}>Sweets that Celebrate Tradition</h1>
            <p style={{ color: '#fff', fontSize: '1.2rem', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>Experience the rich, authentic taste of Indian heritage with our handcrafted, premium sweets made fresh daily.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary-dark)', borderColor: 'var(--secondary)', fontWeight: 'bold' }}>
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-secondary" style={{ color: 'var(--background)', borderColor: 'var(--background)' }}>Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slideshow Section */}
      <section className="section categories-section" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="carousel-container">
            {categories.map((cat, index) => (
              <div 
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <Link to={cat.link || `/shop?category=${encodeURIComponent(cat.name)}`} className="carousel-overlay">
                  <h3>{cat.name}</h3>
                  <span className="btn-secondary" style={{ marginTop: '16px', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>Explore <ArrowRight size={16} style={{ marginLeft: '8px' }}/></span>
                </Link>
              </div>
            ))}
            
            <div className="carousel-dots">
              {categories.map((_, index) => (
                <button 
                  key={index} 
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="section bestsellers-section">
        <div className="container">
          <div className="section-header-flex">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Our Bestsellers</h2>
            <Link to="/shop" className="view-all-link">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="bestsellers-grid">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Arrivals Section */}
      <section className="section latest-arrivals-section" style={{ backgroundColor: 'var(--surface-hover)' }}>
        <div className="container">
          <div className="section-header-flex">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Latest Arrivals</h2>
            <Link to="/shop" className="view-all-link">Shop New <ArrowRight size={16} /></Link>
          </div>
          <div className="bestsellers-grid">
            {products.filter(p => p.isNew).slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Category Landing Sections (Alternating Layouts) */}
      <section className="category-landing-sections" style={{ backgroundColor: 'var(--background)' }}>
        {[
          {
            name: 'Gifting',
            tagline: 'Make Every Celebration Sweeter',
            description: 'The perfect gift is one that comes from the heart. Our curated gift hampers combine the finest sweets, chocolates, and artisanal treats into beautiful packages for weddings, festivals, corporate events, and every occasion worth celebrating.',
            highlight: 'Thoughtful. Timeless. Truly delightful.',
            image: '/images/gift_hamper.png',
            link: '/category/Gifting'
          },
          {
            name: 'Sweets',
            tagline: 'Crafted with Love, Served with Tradition',
            description: "Every sweet at Namma Sihii Sweets carries the warmth of a grandmother's kitchen and the precision of a master artisan. Made from pure desi ghee, fresh milk, and premium ingredients — our sweets are a celebration in every bite.",
            highlight: 'No artificial preservatives. 100% fresh. Made daily.',
            image: '/images/ghewar_sweet.png',
            link: '/category/Sweets',
            subCards: [
              { title: 'Jaggery Sweets', image: '/images/traditional_sweets_1783391365914.png' },
              { title: 'Zero-Sugar Sweets', image: '/images/sugar_free_1783391385498.png' },
              { title: 'Spirulina Chikki', image: '/images/pure_ingredients_1783392308887.png' },
              { title: 'Spirulina Nutberry', image: '/images/bengali_sweets_1783391376097.png' }
            ]
          },
          {
            name: 'Namkeens',
            tagline: 'Crunchy, Spicy, Irresistible',
            description: 'From light roasted mixes to bold, spiced snacks — our Namkeen range is crafted for those moments when you crave something perfectly salty and satisfying. Made in small batches to guarantee freshness.',
            highlight: 'Bold flavours. Freshly roasted. Zero compromise.',
            image: '/images/navratan_mixture_1783133784049.png',
            link: '/category/Namkeens'
          },
          {
            name: 'Snacks',
            tagline: 'Perfect Bites for Every Moment',
            description: "Whether it's a quick evening hunger or a party snack platter, our Snacks range has you covered. Light, flavorful, and made with care — these are bites you'll keep coming back for.",
            highlight: 'Crispy perfection in every pack.',
            image: '/images/namkeen_1783391394817.png',
            link: '/category/Snacks'
          },
          {
            name: 'Bakery & Boulangerie',
            tagline: 'From Our Oven to Your Table',
            description: 'Our bakery blends classic Indian baking with modern French techniques. From flaky croissants to rich cakes, from artisan breads to delicate cookies — every item is baked fresh, every single day.',
            highlight: 'Baked fresh. Delivered with love.',
            image: '/images/croissant_bakery.png',
            link: '/category/Bakery%20%26%20Boulangerie'
          },
          {
            name: 'Chocolates',
            tagline: 'Indulge in Pure Chocolate Bliss',
            description: 'Our chocolate range celebrates the art of fine chocolate-making. From smooth milk chocolates to intense dark varieties, from delicate truffles to beautiful gift boxes — each piece is a moment of pure indulgence.',
            highlight: 'Premium cocoa. Handcrafted. Extraordinary.',
            image: '/images/assorted_chocolates.png',
            link: '/category/Chocolates'
          },
          {
            name: 'Candles',
            tagline: 'Light Up Moments, Breathe in Luxury',
            description: 'Transform your space with our exquisite candle collection. Hand-poured with premium wax and infused with carefully curated fragrances — from calming sandalwood to energising citrus — each candle creates an atmosphere of pure luxury.',
            highlight: 'Hand-poured. Long-lasting. Beautifully crafted.',
            image: '/images/sandalwood_candle.png',
            link: '/category/Candles'
          },
          {
            name: 'Fragrances',
            tagline: 'Scents That Tell a Story',
            description: 'Our fragrance collection is a tribute to the art of perfumery. Each scent is a harmonious blend of rare botanicals and precious essences, crafted through traditional distillation. Non-alcoholic, long-lasting, and truly extraordinary.',
            highlight: 'Rare botanicals. Non-alcoholic. Timeless.',
            image: '/images/room_fragrance.png',
            link: '/category/Fragrances'
          },
          {
            name: 'Ice creams',
            tagline: 'Cool, Creamy, and Utterly Delightful',
            description: 'Made with real fruits, natural flavours, and the finest dairy — our ice creams are a celebration of summer in every scoop. From classic Indian kulfi flavours to modern gelato-style creations — cool down in the most delicious way possible.',
            highlight: 'Real ingredients. Pure joy. Every scoop.',
            image: '/images/mango_ice_cream.png',
            link: '/category/Ice%20creams'
          },
          {
            name: 'Tea',
            tagline: 'A Cup of Calm in Every Sip',
            description: 'Our premium tea collection is sourced from the finest gardens across India. From the delicate first-flush Darjeeling to robust Assam blends and soothing herbal infusions — find your perfect cup and make every moment a ritual.',
            highlight: 'Finest leaves. Rich aroma. Perfect every time.',
            image: '/images/realistic_shop.png',
            link: '/category/Tea'
          }
        ].map((sec, idx) => (
          <div key={sec.name} className={`rich-category-section ${idx % 2 === 1 ? 'alt' : ''}`}>
            <div className="container">
              <div className={`rich-category-grid ${idx % 2 === 1 ? 'reversed' : ''}`}>
                <div className="rich-category-img-wrapper">
                  <img src={sec.image} alt={sec.name} className="rich-category-img" />
                </div>
                <div className="rich-category-content">
                  <h3>{sec.name}</h3>
                  <div className="rich-category-tagline">{sec.tagline}</div>
                  <p className="rich-category-desc">{sec.description}</p>
                  <div className="rich-category-highlight">{sec.highlight}</div>
                  <div>
                    <Link to={sec.link} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                      Shop Collection <ArrowRight size={16} />
                    </Link>
                  </div>
                  
                  {sec.subCards && (
                    <div className="rich-category-subgrid">
                      {sec.subCards.map((sub, sIdx) => (
                        <div key={sIdx} className="rich-category-subcard">
                          <img src={sub.image} alt={sub.title} className="rich-category-subcard-img" />
                          <div className="rich-category-subcard-title">{sub.title}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Feature Highlight */}
      <section className="section feature-section" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container feature-container">
          <div className="feature-grid">
            <div className="feature-image-wrapper">
              <img src="/images/natural_ingredients_1783392496282.png" alt="Pure Indian sweet ingredients like desi ghee and premium nuts" className="feature-image" />
            </div>
            <div className="feature-content" style={{ color: 'var(--text-primary)' }}>
              <h2 style={{ color: 'var(--primary-dark)', marginBottom: '24px' }}>Pure Ingredients. Pure Joy.</h2>
              <p style={{ color: 'var(--text-secondary)', opacity: 0.9, lineHeight: 1.8, marginBottom: '32px' }}>
                We source only the finest quality ingredients—pure desi ghee, premium nuts, and fresh milk—to ensure every bite is a moment of pure bliss. No artificial preservatives, just authentic taste.
              </p>
              <Link to="/about" className="btn-primary" style={{ backgroundColor: 'var(--primary)', color: 'var(--text-on-primary)', borderColor: 'var(--primary)' }}>
                Discover Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Experiences Section */}
      <section className="section experiences-section" style={{ backgroundColor: 'var(--surface-hover)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>Hear Their Sweet Experiences</h2>
          <h3 style={{ color: 'var(--secondary)', marginBottom: '32px', fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            Our Journey Together
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '48px' }}>
            At Namma Sihii Sweets, our story is not just about the sweets we craft but the people who bring them to life. From our skilled artisans and bakers to our dedicated team across every department, each member plays a vital role in shaping our legacy. With passion, precision, and an unwavering commitment to excellence, they pour their heart into every creation, ensuring that tradition and innovation go hand in hand. This space is dedicated to their voices—their experiences, growth, and the moments that make Namma Sihii Sweets more than just a workplace. Because our journey is not just about what we create, but the people who make it possible.
          </p>
          
          {/* Elfsight Google Reviews Widget */}
          <div className="google-reviews-container" style={{ width: '100%', marginTop: '16px' }}>
            <div className="elfsight-app-c2f1278c-746b-4b58-ba90-f2c6b629e308" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
