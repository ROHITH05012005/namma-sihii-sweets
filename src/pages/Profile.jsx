import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { Package, LogOut, User, MapPin } from 'lucide-react';
import './Admin.css'; // Reusing admin tables and badges for consistency

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.id)
        );
        const querySnapshot = await getDocs(q);
        const userOrders = [];
        querySnapshot.forEach((doc) => {
          userOrders.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by date locally since compound indexes require setup in Firebase console
        userOrders.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading || loading) return <div className="admin-loading">Loading Profile...</div>;
  if (!user) return null;

  return (
    <div className="section" style={{ minHeight: '60vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>My Account</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user.name}!</p>
          </div>
          <button className="btn-secondary" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="admin-layout" style={{ display: 'block' }}>
          <div className="admin-tab-content" style={{ marginTop: 0 }}>
            <div className="tab-header">
              <h2><Package size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }}/> My Order History</h2>
            </div>
            
            <div className="orders-table-wrapper">
              {orders.length === 0 ? (
                <div className="empty-state">
                  <h3>No orders yet</h3>
                  <p>Looks like you haven't placed any orders with us yet!</p>
                  <button className="btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '16px' }}>Start Shopping</button>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      const date = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN') : 'N/A';
                      return (
                        <tr key={order.id}>
                          <td><strong>#{order.id.slice(-6).toUpperCase()}</strong></td>
                          <td>{date}</td>
                          <td>
                            {order.items?.map((item, i) => (
                              <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </td>
                          <td><strong>₹{order.amount}</strong></td>
                          <td>
                            <span className={`status-badge ${order.status}`}>
                              {(order.status || 'pending').replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
