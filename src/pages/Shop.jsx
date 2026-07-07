import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
  const initialSubcategory = queryParams.get('subcategory') || null;

  const [filter, setFilter] = useState(initialCategory);
  const [subFilter, setSubFilter] = useState(initialSubcategory);
  const [expandedCats, setExpandedCats] = useState([initialCategory]);
  
  useEffect(() => {
    const category = queryParams.get('category');
    const subcategory = queryParams.get('subcategory');
    
    if (category) {
      setFilter(category);
      if (!expandedCats.includes(category)) {
        setExpandedCats(prev => [...prev, category]);
      }
    } else {
      setFilter('all');
    }
    
    setSubFilter(subcategory || null);
  }, [location.search]);

  const handleCategoryClick = (catName) => {
    navigate(`/shop${catName === 'all' ? '' : `?category=${encodeURIComponent(catName)}`}`);
  };

  const handleSubcategoryClick = (catName, subName) => {
    navigate(`/shop?category=${encodeURIComponent(catName)}&subcategory=${encodeURIComponent(subName)}`);
  };

  const toggleAccordion = (catName) => {
    setExpandedCats(prev => 
      prev.includes(catName) 
        ? prev.filter(c => c !== catName)
        : [...prev, catName]
    );
  };

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    if (p.category.toLowerCase() !== filter.toLowerCase()) return false;
    if (subFilter && p.subcategory && p.subcategory.toLowerCase() !== subFilter.toLowerCase()) return false;
    return true;
  });

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
            <li>
              <button 
                className={`category-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                All Products
              </button>
            </li>
            {categoryStructure.map(cat => {
              const isActiveCat = filter.toLowerCase() === cat.name.toLowerCase();
              const isExpanded = expandedCats.includes(cat.name);
              const hasSubcategories = cat.subcategories.length > 0;
              
              return (
                <li key={cat.name} className="category-item-wrapper">
                  <div className="category-btn-row">
                    <button 
                      className={`category-btn ${isActiveCat && !subFilter ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(cat.name)}
                    >
                      {cat.name}
                    </button>
                    {hasSubcategories && (
                      <button 
                        className="accordion-toggle"
                        onClick={() => toggleAccordion(cat.name)}
                      >
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                    )}
                  </div>
                  
                  {hasSubcategories && isExpanded && (
                    <ul className="subcategory-list">
                      <li>
                        <button 
                          className={`subcategory-btn ${isActiveCat && !subFilter ? 'active' : ''}`}
                          onClick={() => handleCategoryClick(cat.name)}
                        >
                          View All {cat.name}
                        </button>
                      </li>
                      {cat.subcategories.map(sub => {
                        const isActiveSub = subFilter && subFilter.toLowerCase() === sub.toLowerCase();
                        return (
                          <li key={sub}>
                            <button 
                              className={`subcategory-btn ${isActiveSub ? 'active' : ''}`}
                              onClick={() => handleSubcategoryClick(cat.name, sub)}
                            >
                              {sub}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
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
