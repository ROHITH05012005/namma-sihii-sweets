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

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          processFile(file);
          break;
        }
      }
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" onPaste={handlePaste}>
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

          <div className="form-group image-upload-group">
            <label>Product Image</label>
            <div className="image-upload-area">
              {formData.image ? (
                <div className="image-preview-container">
                  <img src={formData.image} alt="Preview" className="image-preview" />
                  <button type="button" className="btn-secondary remove-image-btn" onClick={() => setFormData({...formData, image: ''})}>Remove</button>
                </div>
              ) : (
                <div className="upload-instructions">
                  <p>Click to upload or press CTRL+V to paste an image</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="3" required></textarea>
          </div>

          <div className="form-row badges-row">
            <div className={`badge-toggle ${formData.isBestseller ? 'active' : ''}`} onClick={() => setFormData({...formData, isBestseller: !formData.isBestseller})}>
              <div className="toggle-checkbox"></div>
              <span>Mark as Bestseller</span>
            </div>
            <div className={`badge-toggle ${formData.isNew ? 'active' : ''}`} onClick={() => setFormData({...formData, isNew: !formData.isNew})}>
              <div className="toggle-checkbox"></div>
              <span>Mark as New Arrival</span>
            </div>
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
