import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Drop us a message!</p>
        </div>
      </div>

      <div className="container section">
        <div className="contact-container">
          
          {/* Contact Information */}
          <div className="contact-info glass-panel">
            <h2>Contact Information</h2>
            <p className="contact-desc">Fill up the form and our team will get back to you within 24 hours.</p>
            
            <div className="info-items">
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>9900161303 / 9036611627</p>
                </div>
              </div>
              
              <div className="info-item">
                <Mail className="info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>support@nammasihiisweets.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <MapPin className="info-icon" />
                <div>
                  <h4>Address</h4>
                  <p>27, 9th Main Rd,<br/>opp. to Dmart Ready, Kalkere,<br/>Bengaluru, Karnataka 560016</p>
                </div>
              </div>
            </div>

            <div className="contact-map" style={{ marginTop: '30px', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe 
                src="https://maps.google.com/maps?q=NAMMA%20SIHII%20MANE,%20Kalkere,%20Bengaluru&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Namma Sihii Sweets Location">
              </iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper glass-panel">
            <h2>Send us a Message</h2>
            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
