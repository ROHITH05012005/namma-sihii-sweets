import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../context/CategoryContext';
import './Navbar.css';
import './Navbar-login.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="navbar-container" style={{ backgroundColor: 'var(--primary-dark)', borderBottom: '2px solid var(--secondary)', padding: '8px 0' }}>
      <div className="container navbar-container" style={{ backgroundColor: 'transparent' }}>
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo_blended.png" alt="Namma Sihii Sweets Logo" style={{ height: '70px', borderRadius: '4px' }} />
        </Link>
        
        <nav className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ color: 'var(--background)' }}>Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} style={{ color: 'var(--background)' }}>Shop</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} style={{ color: 'var(--background)' }}>About Us</Link>
          {user && <Link to="/admin" onClick={() => setIsOpen(false)} style={{ color: 'var(--background)' }}>Admin</Link>}
        </nav>
        
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name" style={{ color: 'var(--background)' }}>Hi, {user.name.split(' ')[0]}</span>
              <Link to="/admin" className="btn-admin" style={{ fontSize: '0.9rem', color: 'var(--secondary)', textDecoration: 'underline', marginLeft: '10px' }}>Dashboard</Link>
              <button className="btn-logout" onClick={logout} style={{ marginLeft: '10px', backgroundColor: 'transparent', color: 'var(--background)', border: '1px solid var(--secondary)', padding: '4px 8px', borderRadius: '4px' }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-login" style={{ color: 'var(--primary)', backgroundColor: 'var(--secondary)', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold' }}>Login</Link>
          )}
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingCart size={24} color="var(--secondary)" />
            {cartCount > 0 && <span className="cart-badge" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary)' }}>{cartCount}</span>}
          </Link>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--secondary)' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Secondary Category Navigation */}
      <div className="category-nav">
        <div className="container category-nav-container">
          {categories.map(cat => (
            <div key={cat.name} className="nav-item-dropdown">
              <Link to={`/shop?category=${encodeURIComponent(cat.name)}`} className="category-nav-link">
                {cat.name} {cat.dropdown && cat.dropdown.length > 0 && <span className="dropdown-arrow">▼</span>}
              </Link>
              {cat.dropdown && cat.dropdown.length > 0 && (
                <div className="dropdown-menu">
                  {cat.dropdown.map(subItem => (
                    <Link 
                      key={subItem} 
                      to={subItem === 'View All' ? `/shop?category=${encodeURIComponent(cat.name)}` : `/shop?category=${encodeURIComponent(cat.name)}&subcategory=${encodeURIComponent(subItem)}`} 
                      className="dropdown-item"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
