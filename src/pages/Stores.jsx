import React from 'react';
import StaticPage from './StaticPage';
import { MapPin, Phone, Clock } from 'lucide-react';

const Stores = () => (
  <StaticPage title="Our Stores">
    <p>Visit us at our store and experience the freshest sweets, namkeens, and bakery items made daily with pure ingredients.</p>

    <div className="store-card">
      <div className="store-icon">🏪</div>
      <div>
        <h2 style={{ marginTop: 0 }}>Namma Sihii Sweets — Kalkere</h2>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} /> 27, 9th Main Rd, opp. to Dmart Ready, Kalkere, Bengaluru, Karnataka 560016
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={16} /> 9900161303 / 9036611627
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} /> Open: 08:00 AM – 09:45 PM (Mon–Sun)
        </p>
        <a
          href="https://maps.app.goo.gl/1T4w8tC48QZykweg6"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'inline-block', marginTop: '12px', padding: '10px 24px', textDecoration: 'none' }}
        >
          Get Directions
        </a>
      </div>
    </div>

    <h2>We're Also Available On</h2>
    <p>Can't visit us? Order online through your favourite platform:</p>
    <ul>
      <li><strong>Swiggy</strong> — Search "Namma Sihii Sweets" on the Swiggy app</li>
      <li><strong>Zomato</strong> — Search "Namma Sihii Sweets" on the Zomato app</li>
      <li><strong>Ownly</strong> — Available on Ownly for quick delivery</li>
    </ul>

    <h2>We Serve In</h2>
    <p>Bengaluru | Mysore | Mandya | Hassan | Kolar | Udupi | Tumkur | Chikkaballapura | Hosur | Ramanagara | Mangalore | Hoskote | Devanahalli | Doddaballapura | Gauribidanur | Malur | Sarjapura</p>
  </StaticPage>
);

export default Stores;
