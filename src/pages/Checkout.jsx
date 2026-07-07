import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiRef, setUpiRef] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    }
  }, [token, navigate]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const result = await response.json();
        const data = result.address;
        
        setAddress({
          street: data.road || data.suburb || data.neighbourhood || '',
          city: data.city || data.town || data.county || '',
          state: data.state || '',
          pincode: data.postcode || ''
        });
      } catch (error) {
        console.error('Location detection failed:', error);
        alert('Could not detect location. Please enter manually.');
      }
    }, () => {
      alert('Location access denied. Please enter manually.');
    });
  };
  const handlePayment = async () => {
    if (!address.street || !address.city || !address.pincode) {
      alert("Please fill the address details");
      return;
    }
    if (paymentMethod === 'upi' && !upiRef) {
      alert("Please enter the UPI transaction reference ID.");
      return;
    }

    setLoading(true);
    const shippingFee = cartTotal > 1000 ? 0 : 50;
    const finalAmount = cartTotal + shippingFee;

    try {
      if (paymentMethod === 'cod' || paymentMethod === 'upi') {
        // Save order directly to Firestore
        await addDoc(collection(db, 'orders'), {
          userId: user?.id || 'guest',
          userName: address.name || user?.name || 'Guest',
          userPhone: address.phone || user?.phone || 'N/A',
          amount: finalAmount,
          method: paymentMethod,
          upiRef: upiRef,
          address: address,
          items: cart,
          status: paymentMethod === 'cod' ? 'pending_cod' : 'pending_upi',
          createdAt: serverTimestamp()
        });
        
        alert(`Order Placed Successfully! Payment Method: ${paymentMethod.toUpperCase()}`);
        clearCart();
        navigate('/');
        return;
      }
    } catch (err) {
      console.error(err);
      alert('Failed to place order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  const shippingFee = cartTotal > 1000 ? 0 : 50;
  const finalAmount = cartTotal + shippingFee;

  return (
    <div className="checkout-page section">
      <div className="container checkout-container">
        <div className="checkout-form glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <h2 style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>Shipping Details</h2>
            <button 
              className="btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={detectLocation}
              type="button"
            >
              <MapPin size={16} /> Detect My Location
            </button>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={address.name} 
                onChange={e => setAddress({...address, name: e.target.value})} 
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number (For Delivery & Tracking)</label>
              <input 
                type="tel" 
                value={address.phone} 
                onChange={e => setAddress({...address, phone: e.target.value})} 
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Street Address</label>
            <input 
              type="text" 
              value={address.street} 
              onChange={e => setAddress({...address, street: e.target.value})} 
              placeholder="House/Flat No, Building, Street" 
            />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                value={address.city} 
                onChange={e => setAddress({...address, city: e.target.value})} 
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input 
                type="text" 
                value={address.pincode} 
                onChange={e => setAddress({...address, pincode: e.target.value})} 
              />
            </div>
          </div>
          <h2 style={{ marginTop: '32px' }}>Payment Method</h2>
          <div className="payment-options">
            <div className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cod')}>
              <input type="radio" checked={paymentMethod === 'cod'} readOnly />
              <div>
                <strong>Cash on Delivery (COD)</strong>
                <p>Pay with cash upon delivery.</p>
              </div>
            </div>
            <div className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setPaymentMethod('upi')}>
              <input type="radio" checked={paymentMethod === 'upi'} readOnly />
              <div>
                <strong>Manual UPI Payment</strong>
                <p>Scan QR code and enter Transaction ID.</p>
              </div>
            </div>
          </div>

          {paymentMethod === 'upi' && (
            <div className="upi-payment-section" style={{ marginTop: '24px', padding: '16px', background: 'var(--surface-hover)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
              <h3>Scan to Pay</h3>
              <div style={{ width: '150px', height: '150px', margin: '16px auto', background: '#fff', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#666' }}>
                [Dummy QR Code]
              </div>
              <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Please pay <strong>₹{finalAmount}</strong> to complete your order.</p>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label>UPI Transaction ID</label>
                <input 
                  type="text" 
                  value={upiRef} 
                  onChange={e => setUpiRef(e.target.value)} 
                  placeholder="Enter 12-digit Ref No" 
                />
              </div>
            </div>
          )}
        </div>

        <div className="checkout-summary glass-panel">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total Payable</span>
            <span>₹{finalAmount}</span>
          </div>
          
          <button 
            className="btn-primary btn-pay" 
            onClick={handlePayment} 
            disabled={loading}
          >
            {loading ? 'Processing...' : (paymentMethod === 'cod' ? `Place Order` : `Pay ₹${finalAmount}`)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
