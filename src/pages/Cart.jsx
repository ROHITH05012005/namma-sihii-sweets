import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page container section empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any sweets yet.</p>
        <Link to="/shop" className="btn-primary">
          Explore Our Sweets
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> Continue Shopping
      </Link>
      
      <h1>Your Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item glass-panel">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-weight">{item.weight}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16} /></button>
                </div>
                
                <p className="cart-item-subtotal">₹{item.price * item.quantity}</p>
                
                <button 
                  className="btn-remove" 
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary glass-panel">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{cartTotal > 1000 ? 'Free' : '₹50'}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{cartTotal > 1000 ? cartTotal : cartTotal + 50}</span>
          </div>
          
          <button 
            className="btn-primary btn-checkout"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          
          {cartTotal < 1000 && (
            <p className="shipping-notice">Add ₹{1000 - cartTotal} more for free shipping!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
