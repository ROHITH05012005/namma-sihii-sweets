import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import './Navbar-login.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="navbar-container glass-panel">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          Namma Sihii<span>.</span>
        </Link>
        
        <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          {user && <Link to="/admin" onClick={() => setIsOpen(false)} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Admin</Link>}
        </nav>
        
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
              <Link to="/admin" className="btn-login" style={{ marginLeft: '10px', background: '#333' }}>Dashboard</Link>
              <button className="btn-logout" onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">Login</Link>
          )}
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingCart size={24} color="var(--primary)" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
