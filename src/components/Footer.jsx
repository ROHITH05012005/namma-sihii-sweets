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
          <div className="map-container" style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.424674720612!2d77.6625!3d13.0084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae110000000001%3A0x0!2s27%2C%209th%20Main%20Rd%2C%20opp.%20to%20Dmart%20Ready%2C%20Kalkere%2C%20Bengaluru%2C%20Karnataka%20560016!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
          <Link to="/shop?category=traditional">Traditional</Link>
          <Link to="/shop?category=bengali">Bengali</Link>
          <Link to="/shop?category=sugar-free">Sugar Free</Link>
          <Link to="/shop?category=namkeen">Namkeen</Link>
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
