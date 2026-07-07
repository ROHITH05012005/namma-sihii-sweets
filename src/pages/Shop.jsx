import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, SlidersHorizontal, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Shop.css';

const categoryStructure = [
  { 
    name: 'Sweets', 
    subcategories: ['Ghewars', 'Ghee & Khova Sweets', 'Packed Sweets', 'Assorted Sweets', 'Special Kaju Sweets', 'All Sweet Delights', 'Bengali Sweets'] 
  },
  { 
    name: 'Namkeens',
    subcategories: ['Roasted Namkeens']
  },
  { 
    name: 'Snacks',
    subcategories: ['Benne Specials']
  },
  { 
    name: 'Bakery & Boulangerie',
    subcategories: ['Cakes', 'Doughnuts', 'Beverages', 'Sticks', 'Cookies and Biscuits', 'Breads', 'Crossiants & Rolls']
  },
  { name: 'Chocolates', subcategories: [] },
  { name: 'Gifting', subcategories: [] },
  { name: 'Candles', subcategories: [] },
  { name: 'Fragrances', subcategories: [] },
  { name: 'Ice creams', subcategories: [] },
  { name: 'Tea', subcategories: [] }
];

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const initialCategory = queryParams.get('category') || 'all';
  const initialSubcategory = queryParams.get('subcategory') || '';

  const [filter, setFilter] = useState(initialCategory);
  const [subFilter, setSubFilter] = useState(initialSubcategory);
  const [isSubExpanded, setIsSubExpanded] = useState(true);
  
  useEffect(() => {
    const category = queryParams.get('category') || 'all';
    const subcategory = queryParams.get('subcategory') || '';
    
    setFilter(category);
    setSubFilter(subcategory);
  }, [location.search]);

  const handleCategoryClick = (catName) => {
    navigate(`/shop${catName === 'all' ? '' : `?category=${encodeURIComponent(catName)}`}`);
  };

  const toggleSubcategory = (subName) => {
    let newSubs = [];
    if (subFilter) {
      newSubs = subFilter.split(',');
      if (newSubs.includes(subName)) {
        newSubs = newSubs.filter(s => s !== subName);
      } else {
        newSubs.push(subName);
      }
    } else {
      newSubs = [subName];
    }
    const subStr = newSubs.join(',');
    navigate(`/shop?category=${encodeURIComponent(filter)}${subStr ? `&subcategory=${encodeURIComponent(subStr)}` : ''}`);
  };

  const activeSubs = subFilter ? subFilter.split(',') : [];
  
  const filteredProducts = products.filter(p => {
    if (filter !== 'all' && p.category.toLowerCase() !== filter.toLowerCase()) return false;
    
    if (activeSubs.length > 0 && p.subcategory) {
      if (!activeSubs.some(s => s.toLowerCase() === p.subcategory.toLowerCase())) return false;
    }
    return true;
  });

  const currentCategoryData = categoryStructure.find(c => c.name.toLowerCase() === filter.toLowerCase());

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Our Sweets Collection</h1>
          <p>Discover our wide range of authentic delicacies.</p>
        </div>
      </div>
      
      <div className="container shop-container section">
        <aside className="shop-sidebar new-sidebar">
          
          <div className="filter-card">
            <div className="filter-header">
              <h3>Filter By:</h3>
              <SlidersHorizontal size={18} className="filter-icon" />
            </div>

            {currentCategoryData && currentCategoryData.subcategories.length > 0 && (
              <div className="filter-section">
                <div 
                  className="filter-section-header" 
                  onClick={() => setIsSubExpanded(!isSubExpanded)}
                >
                  <h4>Sub Category</h4>
                  {isSubExpanded ? <ChevronUp size={18} className="purple-icon" /> : <ChevronDown size={18} className="purple-icon" />}
                </div>
                
                {isSubExpanded && (
                  <div className="filter-checkboxes">
                    {currentCategoryData.subcategories.map(sub => {
                      const isChecked = activeSubs.includes(sub);
                      return (
                        <label key={sub} className="checkbox-label">
                          <div className={`custom-checkbox ${isChecked ? 'checked' : ''}`}>
                            {isChecked && <Check size={12} />}
                          </div>
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => toggleSubcategory(sub)}
                            style={{ display: 'none' }}
                          />
                          <span>{sub}</span>
                        </label>
                      );
                    })}
                    <div className="filter-divider"></div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="category-pills">
            <button 
              className={`cat-pill ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              All Products
            </button>
            {categoryStructure.map(cat => (
              <button 
                key={cat.name}
                className={`cat-pill ${filter.toLowerCase() === cat.name.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

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
            <div className="empty-state">
              <h2>No products found</h2>
              <p>Try adjusting your category filters.</p>
              <button className="btn-primary" onClick={() => handleCategoryClick('all')}>View All Products</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
