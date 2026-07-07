import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import './Footer.css';

const Footer = () => {
  const { categories } = useCategories();
  const navigate = useNavigate();

  return (
    <footer className="footer-container">

      {/* Available On Section */}
      <div className="footer-available">
        <div className="container">
          <h3 className="available-title">We Are Also Available On</h3>
          <div className="available-logos">
            <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" className="platform-link swiggy">
              🛵 Swiggy
            </a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className="platform-link zomato">
              🍽 Zomato
            </a>
            <a href="https://www.ownly.in" target="_blank" rel="noopener noreferrer" className="platform-link ownly">
              🛍 Ownly
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="footer-main">
        <div className="container footer-grid">

          {/* Shop Now */}
          <div className="footer-col">
            <h4 className="footer-col-title" onClick={() => navigate('/shop')}>Shop Now</h4>
            <ul className="footer-links">
              {categories.map(cat => (
                <li key={cat.id || cat.name}>
                  <Link to={cat.link || `/shop?category=${encodeURIComponent(cat.name)}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/stores">Stores</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/statutory-compliance">Statutory Compliance</Link></li>
              <li><Link to="/csr-activities">CSR Activities</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
              <li><Link to="/returns-exchange">Returns &amp; Exchange</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links no-hover">
              <li><a href="mailto:support@nammasihiisweets.com">support@nammasihiisweets.com</a></li>
              <li><a href="tel:9900161303">9900161303 / 9036611627</a></li>
              <li style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>(Timings: 08:00 AM – 09:45 PM)</li>
            </ul>
            <div className="footer-social">
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '8px', display: 'block' }}>Follow Us On</span>
              <div className="social-icons">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷 Instagram</a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">👍 Facebook</a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶️ YouTube</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* We Serve In */}
      <div className="footer-serve">
        <div className="container">
          <p className="serve-title">📍 We Serve In</p>
          <p className="serve-cities">
            Bengaluru | Mysore | Mandya | Hassan | Kolar | Udupi | Tumkur | Chikkaballapura | Hosur | Ramanagara | Mangalore | Hoskote | Devanahalli | Doddaballapura | Gauribidanur | Malur | Sarjapura
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-copy">
            <p>© {new Date().getFullYear()} Namma Sihi Sweets. All Rights Reserved.</p>
            <p className="developed-by">
              Developed by <a href="https://fuera.in" target="_blank" rel="noopener noreferrer">Fuera</a>
            </p>
          </div>
          <div className="footer-payments">
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginRight: '10px' }}>We accept</span>
            <div className="payment-icons">
              <span className="payment-badge">VISA</span>
              <span className="payment-badge" style={{ background: '#eb001b', color: '#fff' }}>MC</span>
              <span className="payment-badge" style={{ background: '#1565C0', color: '#fff' }}>RuPay</span>
              <span className="payment-badge" style={{ background: '#5f259f', color: '#fff' }}>UPI</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
