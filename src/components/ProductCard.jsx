import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to your cart!");
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="product-card glass-panel">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.isNew && <span className="badge new-badge">New</span>}
        {product.isBestseller && <span className="badge bestseller-badge">Bestseller</span>}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price} <span className="weight-unit">/ {product.weight}</span></span>
          <button 
            className="btn-add-cart"
            onClick={handleAddToCart}
            title="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
