import React from 'react';
import { X, MapPin, Phone, User, Package, CreditCard } from 'lucide-react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    // Handle Firebase Timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '800px', width: '90%' }}>
        <div className="modal-header">
          <h2>Order Details <span style={{fontSize:'14px', color:'var(--text-secondary)'}}>#{order.id.slice(-6).toUpperCase()}</span></h2>
          <button className="icon-btn" onClick={onClose}><X size={20}/></button>
        </div>
        
        <div className="order-details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '20px 0' }}>
          
          {/* Left Column: Customer & Shipping */}
          <div className="order-info-card" style={{ background: 'var(--surface-hover)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px' }}>Customer Info</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><User size={16}/> <strong>{order.userName}</strong></p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Phone size={16}/> {order.userPhone}</p>
            
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', margin: '24px 0 16px' }}>Shipping Address</h3>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} style={{ marginTop: '4px' }}/>
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                {order.address?.street}<br/>
                {order.address?.city}, {order.address?.state}<br/>
                PIN: {order.address?.pincode}
              </p>
            </div>
          </div>

          {/* Right Column: Payment & Summary */}
          <div className="order-info-card" style={{ background: 'var(--surface-hover)', padding: '16px', borderRadius: 'var(--radius)' }}>
            <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px' }}>Payment Info</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><CreditCard size={16}/> Method: <strong>{order.method?.toUpperCase()}</strong></p>
            {order.upiRef && (
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>UPI Ref: <strong>{order.upiRef}</strong></p>
            )}
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Package size={16}/> Status: 
              <span className={`status-badge ${order.status}`} style={{marginLeft: '8px'}}>
                {(order.status || 'pending').replace('_', ' ').toUpperCase()}
              </span>
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '16px' }}>Ordered on: {formatDate(order.createdAt)}</p>
          </div>

        </div>

        {/* Bottom Section: Order Items */}
        <div className="order-items-section" style={{ marginTop: '16px' }}>
          <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px' }}>Items Ordered</h3>
          <table className="admin-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items?.map((item, index) => (
                <tr key={index}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.weight}</div>
                    </div>
                  </td>
                  <td>₹{item.price}</td>
                  <td>x{item.quantity}</td>
                  <td><strong>₹{item.price * item.quantity}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', padding: '16px', background: 'var(--surface-hover)', borderRadius: 'var(--radius)' }}>
            <h2 style={{ margin: 0 }}>Grand Total: <span style={{ color: 'var(--primary-gold)' }}>₹{order.amount}</span></h2>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
