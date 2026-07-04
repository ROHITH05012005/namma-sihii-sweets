import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Sweets that Celebrate Tradition</h1>
            <p>Experience the rich, authentic taste of Indian heritage with our handcrafted, premium sweets made fresh daily.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn-primary">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-secondary">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/shop?category=traditional" className="category-card">
              <div className="category-overlay">
                <h3>Traditional Sweets</h3>
              </div>
            </Link>
            <Link to="/shop?category=bengali" className="category-card">
              <div className="category-overlay">
                <h3>Bengali Sweets</h3>
              </div>
            </Link>
            <Link to="/shop?category=sugar-free" className="category-card">
              <div className="category-overlay">
                <h3>Sugar Free</h3>
              </div>
            </Link>
            <Link to="/shop?category=namkeen" className="category-card">
              <div className="category-overlay">
                <h3>Namkeen & Savories</h3>
              </div>
            </Link>
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

      {/* Feature Highlight */}
      <section className="section feature-section">
        <div className="container feature-container glass-panel">
          <div className="feature-content">
            <h2>Pure Ingredients. Pure Joy.</h2>
            <p>We source only the finest quality ingredients—pure desi ghee, premium nuts, and fresh milk—to ensure every bite is a moment of pure bliss. No artificial preservatives, just authentic taste.</p>
            <Link to="/about" className="btn-primary">Learn More</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
