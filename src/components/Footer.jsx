import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
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
          <div className="map-container" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <iframe 
              src="https://maps.google.com/maps?q=NAMMA%20SIHII%20MANE,%20Kalkere,%20Bengaluru&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="150" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Namma Sihii Sweets Location">
            </iframe>
          </div>
        </div>
        
        <div className="footer-links-group">
          <h3>Categories</h3>
          <Link to="/shop?category=Sweets">Sweets</Link>
          <Link to="/shop?category=Namkeens">Namkeens</Link>
          <Link to="/shop?category=Snacks">Snacks</Link>
          <Link to="/shop?category=Gifting">Gifting</Link>
        </div>
        
        <div className="footer-newsletter">
          <h3>Stay Sweet</h3>
          <p>Subscribe to our newsletter for updates on new arrivals and special offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
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
