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
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import Stores from './pages/Stores';
import FAQs from './pages/FAQs';
import Blogs from './pages/Blogs';
import StatutoryCompliance from './pages/StatutoryCompliance';
import CSRActivities from './pages/CSRActivities';
import Feedback from './pages/Feedback';
import TermsConditions from './pages/TermsConditions';
import ReturnsExchange from './pages/ReturnsExchange';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CategoryLanding from './pages/CategoryLanding';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CategoryProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                {/* New Pages */}
                <Route path="/stores" element={<Stores />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/statutory-compliance" element={<StatutoryCompliance />} />
                <Route path="/csr-activities" element={<CSRActivities />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/returns-exchange" element={<ReturnsExchange />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/category/:slug" element={<CategoryLanding />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CategoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
