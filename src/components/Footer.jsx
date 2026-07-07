import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import './Footer.css';

const Footer = () => {
  const { categories } = useCategories();
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div className="container footer-content" style={{ gridTemplateColumns: '2fr 1fr 2fr' }}>
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" style={{ display: 'inline-block', marginBottom: '16px' }}>
            <img src="/logo_blended.png" alt="Namma Sihii Sweets Logo" style={{ height: '90px', borderRadius: '4px' }} />
          </Link>
          <p className="footer-desc">
            Authentic Indian sweets made with pure ingredients, love, and tradition. Delivered fresh to your doorstep.
          </p>
        </div>

        {/* Contact Us */}
        <div className="footer-links-group">
          <h3>
            <Link to="/contact" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            <strong>Ph:</strong> 9900161303 / 9036611627
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.4' }}>
            <a href="https://maps.app.goo.gl/1T4w8tC48QZykweg6" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              27, 9th Main Rd,<br/>
              opp. to Dmart Ready, Kalkere,<br/>
              Bengaluru, Karnataka 560016
            </a>
          </p>
        </div>

        {/* Categories */}
        <div className="footer-links-group">
          <h3>
            <span
              onClick={() => navigate('/shop')}
              style={{ color: 'var(--secondary)', cursor: 'pointer' }}
            >
              Categories
            </span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {categories.map(cat => (
              <Link
                key={cat.id || cat.name}
                to={cat.link || `/shop?category=${encodeURIComponent(cat.name)}`}
                style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
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
