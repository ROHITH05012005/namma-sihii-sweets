import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { Package, LogOut, User, MapPin, Phone, Edit3, Save, X } from 'lucide-react';
import './Admin.css'; // Reusing admin tables and badges for consistency

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile Edit State
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfileAndOrders = async () => {
      try {
        // Fetch Profile from Firestore
        const profileRef = doc(db, 'users', user.id);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile({
            name: profileSnap.data().name || user.name || '',
            phone: profileSnap.data().phone || '',
            address: profileSnap.data().address || ''
          });
        } else {
          setProfile({
            name: user.name || '',
            phone: '',
            address: ''
          });
        }

        // Fetch Orders
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.id)
        );
        const querySnapshot = await getDocs(q);
        const userOrders = [];
        querySnapshot.forEach((doc) => {
          userOrders.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by date locally
        userOrders.sort((a, b) => {
          const t1 = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt || 0).getTime();
          const t2 = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt || 0).getTime();
          return t2 - t1;
        });
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching profile and orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndOrders();
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'users', user.id), {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading || loading) return <div className="admin-loading">Loading Profile...</div>;
  if (!user) return null;

  return (
    <div className="section" style={{ minHeight: '60vh', background: 'var(--bg-primary)', padding: '60px 0' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>My Account</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details and order history.</p>
          </div>
          <button className="btn-secondary" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
          {/* Profile details column */}
          <div className="profile-info-card glass-panel" style={{ padding: '24px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}><User size={20} color="var(--primary)" /> Profile Details</h3>
              {!isEditing && (
                <button className="icon-btn edit" onClick={() => setIsEditing(true)}>
                  <Edit3 size={16} />
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)' }}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="e.g. +91 9900011122"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)' }}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Delivery Address</label>
                  <textarea
                    value={profile.address}
                    onChange={e => setProfile({ ...profile, address: e.target.value })}
                    placeholder="Enter your default delivery address"
                    rows="3"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', fontFamily: 'inherit' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)} style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <X size={16} /> Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Name</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{profile.name || 'Not provided'}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Email</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{user.email}</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Phone</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    <Phone size={16} color="var(--primary)" />
                    <span>{profile.phone || 'Not provided'}</span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase' }}>Default Delivery Address</span>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-primary)', marginTop: '4px' }}>
                    <MapPin size={16} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', lineHeight: '1.5' }}>{profile.address || 'No address added yet.'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Orders Column */}
          <div className="admin-tab-content" style={{ marginTop: 0 }}>
            <div className="tab-header" style={{ marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}><Package size={20} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px', color: 'var(--primary)' }}/> Order History</h2>
            </div>
            
            <div className="orders-table-wrapper">
              {orders.length === 0 ? (
                <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
                  <h3>No orders yet</h3>
                  <p>You haven't placed any orders with us yet!</p>
                  <button className="btn-primary" onClick={() => navigate('/shop')} style={{ marginTop: '16px' }}>Start Shopping</button>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => {
                      const date = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-IN') : (order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : 'N/A');
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
