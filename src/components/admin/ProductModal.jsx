import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { X } from 'lucide-react';
import './ProductModal.css';

const ProductModal = ({ isOpen, onClose, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sweets',
    subcategory: '',
    price: '',
    weight: '1 Box',
    description: '',
    image: '',
    isBestseller: false,
    isNew: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({
        name: '',
        category: 'Sweets',
        subcategory: '',
        price: '',
        weight: '1 Box',
        description: '',
        image: '',
        isBestseller: false,
        isNew: false
      });
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productData = {
        ...formData,
        price: Number(formData.price)
      };

      if (productToEdit) {
        // Update
        await updateDoc(doc(db, 'products', productToEdit.id.toString()), productData);
      } else {
        // Create new
        const newId = Date.now().toString(); // Simple ID generation
        await setDoc(doc(db, 'products', newId), { id: newId, ...productData });
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required>
                <option value="Sweets">Sweets</option>
                <option value="Namkeens">Namkeens</option>
                <option value="Snacks">Snacks</option>
                <option value="Bakery & Boulangerie">Bakery & Boulangerie</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Gifting">Gifting</option>
                <option value="Candles">Candles</option>
                <option value="Fragrances">Fragrances</option>
                <option value="Ice creams">Ice creams</option>
                <option value="Tea">Tea</option>
              </select>
            </div>
            <div className="form-group">
              <label>Subcategory (Optional)</label>
              <input type="text" value={formData.subcategory || ''} onChange={e => setFormData({...formData, subcategory: e.target.value})} placeholder="e.g. Ghewars" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Weight / Quantity</label>
              <input type="text" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} required />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="/images/kaju_katli.png or https://..." required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" required></textarea>
          </div>

          <div className="form-row checkbox-row">
            <label className="custom-checkbox">
              <input type="checkbox" checked={formData.isBestseller} onChange={e => setFormData({...formData, isBestseller: e.target.checked})} />
              Mark as Bestseller
            </label>
            <label className="custom-checkbox">
              <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} />
              Mark as New Arrival
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
