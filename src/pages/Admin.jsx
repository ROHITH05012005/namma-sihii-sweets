import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCategories } from '../context/CategoryContext';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { products as localProducts } from '../data/products';
import { Package, ShoppingBag, LayoutList, Trash2, Edit } from 'lucide-react';
import ProductModal from '../components/admin/ProductModal';
import './Admin.css';

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [activeTab, setActiveTab] = useState('orders');
  
  // Data States
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      alert("Unauthorized Access. Only admins can view this page.");
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Fetch Orders
  useEffect(() => {
    if (!user || !user.isAdmin) return;
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, [user]);

  // Fetch Products
  useEffect(() => {
    if (!user || !user.isAdmin) return;
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
      setFetching(false);
    });
    return () => unsubscribe();
  }, [user]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (error) {
      alert("Failed to update status.");
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', productId));
      } catch (error) {
        alert("Failed to delete product.");
      }
    }
  };

  const initializeDatabase = async () => {
    setInitLoading(true);
    try {
      for (let p of localProducts) {
        await setDoc(doc(db, 'products', p.id.toString()), p);
      }
      alert("Database initialized successfully with " + localProducts.length + " products!");
    } catch (error) {
      console.error(error);
      alert("Failed to initialize database.");
    } finally {
      setInitLoading(false);
    }
  };

  const handleAddProduct = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  if (loading || fetching) return <div className="admin-loading">Loading Dashboard...</div>;

  return (
    <div className="admin-container section">
      <div className="container">
        <div className="admin-layout">
          {/* Sidebar */}
          <aside className="admin-sidebar glass-panel">
            <h2>Admin Panel</h2>
            <nav className="admin-nav">
              <button 
                className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={18} /> Orders
              </button>
              <button 
                className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <Package size={18} /> Products
              </button>
              <button 
                className={`admin-nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveTab('categories')}
              >
                <LayoutList size={18} /> Categories
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="admin-main glass-panel">
            {activeTab === 'orders' && (
              <div className="admin-tab-content">
                <div className="tab-header">
                  <h2>Order Management</h2>
                </div>
                
                <div className="orders-table-wrapper">
                  {orders.length === 0 ? (
                    <p>No orders found.</p>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Method</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>{order.id.slice(-6).toUpperCase()}</td>
                            <td>{order.userName} ({order.userPhone})</td>
                            <td>₹{order.amount}</td>
                            <td>{order.method?.toUpperCase()}</td>
                            <td>
                              <span className={`status-badge ${order.status}`}>
                                {(order.status || 'pending').replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td>
                              <select 
                                value={order.status} 
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                className="status-dropdown"
                              >
                                <option value="pending_cod">Pending COD</option>
                                <option value="pending_upi">Pending UPI</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="admin-tab-content">
                <div className="tab-header">
                  <h2>Product Catalog</h2>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button 
                      className="btn-secondary" 
                      onClick={initializeDatabase}
                      disabled={initLoading}
                    >
                      {initLoading ? 'Migrating...' : 'Migrate Local Products'}
                    </button>
                    <button className="btn-primary" onClick={handleAddProduct}>Add New Product</button>
                  </div>
                </div>
                
                {products.length === 0 ? (
                  <div className="empty-state">
                    <h3>Database is empty</h3>
                    <p>Click the Migrate button above to upload your products.</p>
                  </div>
                ) : (
                  <div className="products-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id}>
                            <td><img src={product.image} alt={product.name} className="admin-product-img" /></td>
                            <td><strong>{product.name}</strong></td>
                            <td>{product.category} {product.subcategory ? `> ${product.subcategory}` : ''}</td>
                            <td>₹{product.price}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="icon-btn edit" onClick={() => handleEditProduct(product)}><Edit size={16}/></button>
                                <button className="icon-btn delete" onClick={() => deleteProduct(product.id)}><Trash2 size={16}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="admin-tab-content">
                <div className="tab-header">
                  <h2>Category Management</h2>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button className="btn-secondary" onClick={async () => {
                      try {
                        setInitLoading(true);
                        const { defaultCategories } = await import('../context/CategoryContext');
                        for (let cat of defaultCategories) {
                          const catId = cat.name.toLowerCase().replace(/\s+/g, '-');
                          await setDoc(doc(db, 'categories', catId), cat);
                        }
                        alert("Categories initialized successfully in Firebase!");
                      } catch(e) {
                        alert("Error initializing: " + e.message);
                      } finally { setInitLoading(false); }
                    }} disabled={initLoading}>
                      {initLoading ? 'Migrating...' : 'Migrate Categories to Firebase'}
                    </button>
                    <button className="btn-primary" onClick={() => alert('Add category modal coming soon!')}>Add New Category</button>
                  </div>
                </div>
                
                <div className="products-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(cat => (
                          <tr key={cat.id || cat.name}>
                            <td>{cat.order}</td>
                            <td><strong>{cat.name}</strong></td>
                            <td>{cat.image ? <img src={cat.image} style={{width:'50px', height:'50px', objectFit:'cover', borderRadius:'4px'}} /> : 'No image'}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="icon-btn edit" onClick={() => alert('Edit coming soon')}><Edit size={16}/></button>
                                <button className="icon-btn delete" onClick={async () => {
                                  if(window.confirm(`Delete ${cat.name}?`)) {
                                     try {
                                       await deleteDoc(doc(db, 'categories', cat.id));
                                     } catch(e) { alert("Delete failed: " + e.message); }
                                  }
                                }}><Trash2 size={16}/></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productToEdit={productToEdit} 
      />
    </div>
  );
};

export default Admin;
