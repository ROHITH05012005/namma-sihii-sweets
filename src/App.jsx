import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import { CartProvider } from './context/CartContext';

// Lazy loaded page components
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Admin = lazy(() => import('./pages/Admin'));
const Profile = lazy(() => import('./pages/Profile'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Stores = lazy(() => import('./pages/Stores'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Blogs = lazy(() => import('./pages/Blogs'));
const StatutoryCompliance = lazy(() => import('./pages/StatutoryCompliance'));
const CSRActivities = lazy(() => import('./pages/CSRActivities'));
const Feedback = lazy(() => import('./pages/Feedback'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const ReturnsExchange = lazy(() => import('./pages/ReturnsExchange'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CategoryLanding = lazy(() => import('./pages/CategoryLanding'));

const PageLoader = () => (
  <div className="suspense-loader-container">
    <div className="suspense-spinner"></div>
    <p className="suspense-loader-text">Loading Sweet Delights...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CategoryProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
            </main>
            <Footer />
          </div>
        </CategoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

