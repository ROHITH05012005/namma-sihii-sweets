import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Shop.css';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [filter, setFilter] = useState(initialCategory);
  
  useEffect(() => {
    const category = queryParams.get('category');
    if (category) {
      setFilter(category);
    }
  }, [location.search]);

  const categories = ['all', 'Traditional', 'Bengali', 'Sugar-Free', 'Namkeen'];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Our Sweets Collection</h1>
          <p>Discover our wide range of authentic delicacies.</p>
        </div>
      </div>
      
      <div className="container shop-container section">
        <aside className="shop-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  className={`category-btn ${filter.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat === 'all' ? 'All Products' : cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        
        <main className="shop-main">
          <div className="shop-meta">
            <span>Showing {filteredProducts.length} products</span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No products found in this category.</h3>
              <button className="btn-primary" onClick={() => setFilter('all')}>View All Products</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
