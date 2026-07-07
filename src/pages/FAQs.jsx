import React, { useState } from 'react';
import StaticPage from './StaticPage';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  { q: 'What are your store timings?', a: 'We are open every day from 08:00 AM to 09:45 PM. Orders placed after this time will be handled the next working day.' },
  { q: 'Do you offer home delivery?', a: 'Yes! We offer instant delivery within 30–45 minutes. We serve across Bengaluru and several other cities in Karnataka.' },
  { q: 'Are your sweets made fresh daily?', a: 'Absolutely. All our sweets, namkeens, and bakery items are prepared fresh every day using pure desi ghee and premium ingredients — no artificial preservatives.' },
  { q: 'Can I place bulk/custom orders for events?', a: 'Yes, we accept bulk and custom orders for weddings, corporate events, festivals, and gifting. Please contact us at 9900161303 or 9036611627.' },
  { q: 'Do you offer sugar-free sweets?', a: 'Yes, we have a range of sugar-free sweets suitable for diabetics and health-conscious customers. Check our Shop for the Sugar-Free category.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major payment modes including Cash, UPI, Visa, Mastercard, and RuPay.' },
  { q: 'How do I track my order?', a: 'Once your order is placed, you will receive a confirmation. For online orders via Swiggy or Zomato, tracking is available directly on those apps.' },
  { q: 'Do you have a return or exchange policy?', a: 'Due to the perishable nature of our products, we generally do not accept returns. However, if there is a quality issue, please contact us within 2 hours of delivery and we will resolve it immediately.' },
];

const FAQs = () => {
  const [open, setOpen] = useState(null);
  return (
    <StaticPage title="Frequently Asked Questions">
      <p>Got questions? We've got answers. If you don't find what you're looking for, feel free to <a href="/contact">contact us</a>.</p>
      <div style={{ marginTop: '24px' }}>
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              <span>{item.q}</span>
              {open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {open === i && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </div>
    </StaticPage>
  );
};

export default FAQs;
