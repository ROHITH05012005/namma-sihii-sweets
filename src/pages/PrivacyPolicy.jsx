import React from 'react';
import StaticPage from './StaticPage';

const PrivacyPolicy = () => (
  <StaticPage title="Privacy Policy">
    <p><em>Last updated: July 2026</em></p>
    <p>Your privacy is important to us. This policy explains how Namma Sihii Sweets collects, uses, and protects your personal information.</p>

    <h2>1. Information We Collect</h2>
    <ul>
      <li><strong>Personal Information:</strong> Name, email address, phone number, and delivery address when you place an order or register an account.</li>
      <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and products viewed.</li>
      <li><strong>Payment Data:</strong> We do not store card details. Payments are processed securely via third-party payment gateways.</li>
    </ul>

    <h2>2. How We Use Your Information</h2>
    <ul>
      <li>To process and fulfill your orders</li>
      <li>To communicate order updates and delivery status</li>
      <li>To send promotional offers (only if you opt in)</li>
      <li>To improve our website and services</li>
      <li>To comply with legal obligations</li>
    </ul>

    <h2>3. Data Sharing</h2>
    <p>We do not sell or rent your personal data to third parties. We may share your data with:</p>
    <ul>
      <li>Delivery partners (for order fulfillment)</li>
      <li>Payment gateways (for secure transactions)</li>
      <li>Legal authorities (if required by law)</li>
    </ul>

    <h2>4. Data Security</h2>
    <p>We use industry-standard security measures including SSL encryption to protect your data. However, no method of internet transmission is 100% secure.</p>

    <h2>5. Cookies</h2>
    <p>Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings, though this may affect some functionality.</p>

    <h2>6. Your Rights</h2>
    <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:support@namsihiisweets.netlify.app">support@namsihiisweets.netlify.app</a>.</p>

    <h2>7. Changes to This Policy</h2>
    <p>We may update this policy from time to time. Changes will be posted on this page with an updated date.</p>

    <h2>8. Contact</h2>
    <p>For privacy-related queries: <a href="mailto:support@namsihiisweets.netlify.app">support@namsihiisweets.netlify.app</a> | 9900161303</p>
  </StaticPage>
);

export default PrivacyPolicy;
