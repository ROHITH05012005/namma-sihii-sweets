import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCategories } from '../../context/CategoryContext';

const CategoryModal = ({ isOpen, onClose, categoryToEdit }) => {
  const { addCategory } = useCategories();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    order: 0,
    image: '',
    dropdown: '',
    link: ''
  });

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        ...categoryToEdit,
        dropdown: categoryToEdit.dropdown ? categoryToEdit.dropdown.join(', ') : ''
      });
    } else {
      setFormData({ name: '', order: 0, image: '', dropdown: '', link: '' });
    }
  }, [categoryToEdit, isOpen]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const categoryData = {
        name: formData.name,
        order: parseInt(formData.order) || 0,
        image: formData.image,
        link: formData.link || `/shop?category=${encodeURIComponent(formData.name)}`,
        dropdown: formData.dropdown.split(',').map(item => item.trim()).filter(Boolean)
      };
      
      await addCategory(categoryData);
      onClose();
    } catch (err) {
      alert("Error saving category: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" onPaste={handlePaste}>
        <div className="modal-header">
          <h2>{categoryToEdit ? 'Edit Category' : 'Add New Category'}</h2>
          <button className="icon-btn" onClick={onClose}><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Category Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Display Order (Number)</label>
              <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} required />
            </div>
          </div>

          <div className="form-group image-upload-group">
            <label>Category Image (For Home Page Carousel)</label>
            <div className="image-upload-area">
              {formData.image ? (
                <div className="image-preview-container">
                  <img src={formData.image} alt="Preview" className="image-preview" style={{maxHeight:'100px'}} />
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
            <label>Subcategories (Comma Separated)</label>
            <input type="text" value={formData.dropdown} onChange={e => setFormData({...formData, dropdown: e.target.value})} placeholder="e.g. Cakes, Breads, Cookies" />
            <small style={{color: 'var(--text-secondary)'}}>These will appear in the Navbar dropdown menu.</small>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Category'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
