import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const categories = [
  { title: "Traditional Sweets", image: "/images/traditional_sweets_1783391365914.png", link: "/shop?category=traditional" },
  { title: "Bengali Sweets", image: "/images/bengali_sweets_1783391376097.png", link: "/shop?category=bengali" },
  { title: "Sugar Free", image: "/images/sugar_free_1783391385498.png", link: "/shop?category=sugar-free" },
  { title: "Namkeen & Savories", image: "/images/namkeen_1783391394817.png", link: "/shop?category=namkeen" }
];

const Home = () => {
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

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
                <Link to={cat.link} className="carousel-overlay">
                  <h3>{cat.title}</h3>
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
          
          {/* Google Reviews Widget Placeholder */}
          <div className="google-reviews-container" style={{ minHeight: '200px', border: '2px dashed var(--secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'var(--surface)' }}>
            <div id="google-reviews-widget-placeholder">
              <p style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>[Google Reviews Widget Will Go Here]</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Please paste your widget link/script into this container.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
