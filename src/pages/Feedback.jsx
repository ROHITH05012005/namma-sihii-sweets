import React, { useState } from 'react';
import StaticPage from './StaticPage';
import { Send } from 'lucide-react';

const Feedback = () => {
  const [form, setForm] = useState({ name: '', email: '', rating: 0, category: '', message: '' });
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <StaticPage title="Feedback">
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🙏</div>
          <h2 style={{ color: 'var(--primary-dark)' }}>Thank You for Your Feedback!</h2>
          <p>We truly value your opinion and will use it to make Namma Sihii Sweets even better for you.</p>
          <a href="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px', padding: '12px 32px', textDecoration: 'none' }}>Back to Home</a>
        </div>
      </StaticPage>
    );
  }

  return (
    <StaticPage title="Share Your Feedback">
      <p>Your feedback helps us serve you better! Please share your experience with us.</p>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email *"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="">Select Category *</option>
          <option value="sweets">Sweets</option>
          <option value="bakery">Bakery & Boulangerie</option>
          <option value="namkeens">Namkeens</option>
          <option value="delivery">Delivery Experience</option>
          <option value="service">Customer Service</option>
          <option value="other">Other</option>
        </select>

        <div>
          <p style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: '500' }}>Rate Your Experience *</p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                style={{ color: star <= (hover || form.rating) ? '#F5A623' : '#ccc' }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setForm({ ...form, rating: star })}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          rows={5}
          placeholder="Tell us about your experience..."
          required
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 32px', width: 'fit-content' }}>
          Submit Feedback <Send size={18} />
        </button>
      </form>
    </StaticPage>
  );
};

export default Feedback;
