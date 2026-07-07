import React from 'react';
import StaticPage from './StaticPage';

const ReturnsExchange = () => (
  <StaticPage title="Returns & Exchange">
    <p>At Namma Sihii Sweets, we take pride in the quality and freshness of our products. Please read our Returns & Exchange policy carefully.</p>

    <h2>Perishable Products</h2>
    <p>Due to the perishable nature of our sweets, namkeens, and bakery items, we generally <strong>do not accept returns</strong> once the product has been delivered and accepted.</p>

    <h2>Quality Issues</h2>
    <p>If you receive a product that is:</p>
    <ul>
      <li>Damaged during delivery</li>
      <li>Incorrect (wrong item delivered)</li>
      <li>Spoiled or stale upon arrival</li>
    </ul>
    <p>Please contact us <strong>within 2 hours of delivery</strong> with a photo of the issue. We will either replace the product or issue a full refund — whichever you prefer.</p>

    <h2>How to Raise a Complaint</h2>
    <ul>
      <li>Call us: <strong>9900161303 / 9036611627</strong></li>
      <li>Email: <a href="mailto:support@namsihiisweets.netlify.in">support@namsihiisweets.netlify.in</a></li>
      <li>Use the <a href="/feedback">Feedback</a> form on our website</li>
    </ul>

    <h2>Refund Timeline</h2>
    <p>Approved refunds will be processed within <strong>3–5 business days</strong> to your original payment method.</p>

    <h2>Non-Returnable Items</h2>
    <ul>
      <li>Items that have been consumed partially</li>
      <li>Items returned beyond the 2-hour window without valid reason</li>
      <li>Gift hampers once opened</li>
    </ul>

    <h2>Exchange Policy</h2>
    <p>Exchanges are available for sealed, unopened packaged products if reported within 2 hours of delivery. Subject to availability.</p>
  </StaticPage>
);

export default ReturnsExchange;
