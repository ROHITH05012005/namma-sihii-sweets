import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import './Footer.css';

const Footer = () => {
  const { categories } = useCategories();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
            <img src="/logo_blended.png" alt="Namma Sihii Sweets Logo" style={{ height: '90px', borderRadius: '4px' }} />
          </Link>
          <p className="footer-desc">
            Authentic Indian sweets made with pure ingredients, love, and tradition. Delivered fresh to your doorstep.
          </p>
        </div>
        
        <div className="footer-links-group">
          <h3>Contact Us</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            <strong>Ph:</strong> 9900161303 / 9036611627
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '12px' }}>
            <a href="https://maps.app.goo.gl/1T4w8tC48QZykweg6" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              27, 9th Main Rd,<br/>
              opp. to Dmart Ready, Kalkere,<br/>
              Bengaluru, Karnataka 560016
            </a>
          </p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', padding: '10px 32px', textDecoration: 'none', fontWeight: 'bold' }}>
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="footer-links-group footer-categories-grid">
          <h3>Categories</h3>
          <div className="categories-grid-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {categories.map(cat => (
            <Link key={cat.id || cat.name} to={cat.link || `/shop?category=${encodeURIComponent(cat.name)}`}>
              {cat.name}
            </Link>
            ))}
          </div>
        </div>
        
        <div className="footer-newsletter">
          <h3>Stay Sweet</h3>
          <p>Subscribe to our newsletter for updates on new arrivals and special offers.</p>
          {subscribed ? (
            <div style={{ color: 'var(--secondary)', padding: '10px 0', fontWeight: 'bold' }}>
              Thanks for subscribing!
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email address" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Namma Sihi Sweets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
