import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Home, Store, Info, User, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../context/CategoryContext';
import './Navbar.css';
import './Navbar-login.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { categories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="announcement-banner">
        <p>We're happy to serve you from <strong>08:00 AM to 09:45 PM</strong> every day! Orders placed after this time will be handled on the next working day.</p>
        <p><strong>Instant delivery within 30-45mins.</strong> Shop only at <span className="highlight-text">nammasihiisweets.com</span></p>
      </div>
      
      <header className="navbar-container" style={{ backgroundColor: 'var(--primary-dark)', borderBottom: '2px solid var(--secondary)', padding: '10px 0' }}>
        <div className="container navbar-main-row">
          {/* Left: Logo */}
          <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
            <img src="/logo_blended.png" alt="Namma Sihii Sweets Logo" style={{ height: '50px', borderRadius: '4px' }} />
          </Link>
          
          {/* Center: Search Bar */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <Search size={18} className="search-icon" color="#888" />
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          {/* Right: Icon Buttons */}
          <nav className="navbar-icon-links desktop-only">
            <Link to="/" className="icon-nav-item">
              <Home size={22} />
              <span>Home</span>
            </Link>
            <Link to="/shop" className="icon-nav-item">
              <Store size={22} />
              <span>Shop</span>
            </Link>
            <Link to="/about" className="icon-nav-item">
              <Info size={22} />
              <span>About Us</span>
            </Link>
            <Link to="/contact" className="icon-nav-item">
              <PhoneCall size={22} />
              <span>Contact</span>
            </Link>
            
            {user ? (
              <div className="icon-nav-item profile-dropdown-container">
                <Link to={user.isAdmin ? "/admin" : "/profile"} className="icon-nav-item" style={{margin:0, padding:0}}>
                  <User size={22} />
                  <span>Profile</span>
                </Link>
                <div className="profile-dropdown">
                  <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                  <button className="btn-logout" onClick={logout}>Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="icon-nav-item">
                <User size={22} />
                <span>Login</span>
              </Link>
            )}
            
            <Link to="/cart" className="icon-nav-item cart-item">
              <ShoppingCart size={22} />
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-badge-new">{cartCount}</span>}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--background)' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {isOpen && (
          <nav className="mobile-dropdown-nav">
            <form className="mobile-search" onSubmit={handleSearch}>
              <Search size={18} color="#888" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            {user ? (
              <>
                <Link to={user.isAdmin ? "/admin" : "/profile"} onClick={() => setIsOpen(false)}>Profile</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="mobile-logout">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            )}
          </nav>
        )}
      </header>
      
      {/* Secondary Category Navigation */}
      <div className="category-nav">
        <div className="container category-nav-container">
          {categories.map(cat => (
            <div key={cat.name} className="nav-item-dropdown">
              <Link to={`/category/${encodeURIComponent(cat.name)}`} className="category-nav-link">
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
    </>
  );
};

export default Navbar;
