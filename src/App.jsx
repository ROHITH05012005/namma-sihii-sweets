import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import './App.css';

// A simple About component placeholder
const About = () => (
  <div className="container section" style={{ minHeight: '60vh', textAlign: 'center', paddingTop: '100px' }}>
    <h1>Our Story</h1>
    <p style={{ maxWidth: '600px', margin: '20px auto', color: 'var(--text-secondary)' }}>
      Namma Sihii Sweets started with a simple vision: to bring the authentic taste of traditional Indian sweets to modern homes. 
      Using recipes passed down through generations, we prepare our delicacies with pure ghee, premium nuts, and a lot of love.
    </p>
  </div>
);

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
