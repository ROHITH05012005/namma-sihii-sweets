import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Simple protection: only logged in users can see this for now.
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  const markDelivered = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: 'delivered'
      });
    } catch (error) {
      alert("Failed to update status.");
      console.error(error);
    }
  };

  if (loading || fetching) return <div className="admin-loading">Loading Dashboard...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header glass-panel">
        <h1>Orders Dashboard</h1>
        <p>Manage your incoming orders securely in real-time.</p>
      </div>

      <div className="admin-orders-list">
        {orders.length === 0 ? (
          <div className="no-orders glass-panel">No orders yet.</div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="admin-order-card glass-panel">
              <div className="order-header">
                <h3>Order #{order.id.slice(-6).toUpperCase()}</h3>
                <span className={`order-status ${order.status || 'pending'}`}>{(order.status || 'pending').replace('_', ' ').toUpperCase()}</span>
              </div>
              
              <div className="order-grid">
                <div className="order-details">
                  <h4>Customer Details</h4>
                  <p><strong>Name:</strong> {order.userName || 'Unknown'}</p>
                  <p><strong>Phone:</strong> {order.userPhone || 'N/A'}</p>
                  <p><strong>Method:</strong> {order.method?.toUpperCase()}</p>
                  {order.method === 'upi' && <p><strong>UPI Ref:</strong> {order.upiRef}</p>}
                </div>
                
                <div className="order-address">
                  <h4>Delivery Address</h4>
                  <p>{order.address?.street}</p>
                  <p>{order.address?.city} - {order.address?.pincode}</p>
                  <p>{order.address?.state}</p>
                </div>
              </div>

              <div className="order-items">
                <h4>Items</h4>
                <ul>
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="order-total">
                  Total: ₹{order.amount}
                </div>
              </div>

              {order.status !== 'delivered' && (
                <div className="order-actions">
                  <button onClick={() => markDelivered(order.id)} className="deliver-btn">
                    Mark as Delivered
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
