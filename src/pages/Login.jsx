import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { loginWithGoogle, setupRecaptcha, sendOTP, verifyOTP, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState('phone'); // 'phone' or 'google'
  
  // Phone auth state
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: enter phone, 2: enter otp
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    setupRecaptcha('recaptcha-container');
  }, [setupRecaptcha]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic phone validation (+91 followed by 10 digits)
    const phoneRegex = /^\+91[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number (e.g. +919876543210)');
      return;
    }

    setLoading(true);
    const result = await sendOTP(phone);
    if (result.success) {
      setStep(2);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await verifyOTP(otp);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card glass-panel">
        <h2 className="login-title">Welcome to Namma Sihii Sweets</h2>
        
        {error && <div className="login-error">{error}</div>}

        <div className="login-methods">
          <button 
            className={`method-btn ${method === 'phone' ? 'active' : ''}`}
            onClick={() => { setMethod('phone'); setStep(1); setError(''); }}
          >
            Phone Login
          </button>
          <button 
            className={`method-btn ${method === 'google' ? 'active' : ''}`}
            onClick={() => { setMethod('google'); setError(''); }}
          >
            Google Login
          </button>
        </div>

        {method === 'google' && (
          <div className="google-login-section">
            <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              Sign in with Google
            </button>
          </div>
        )}

        {method === 'phone' && (
          <div className="phone-login-section">
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="login-form">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+919876543210"
                    required 
                  />
                </div>
                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="login-form">
                <div className="form-group">
                  <label>Enter OTP</label>
                  <input 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    placeholder="123456"
                    required 
                  />
                </div>
                <button type="submit" className="login-submit-btn" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button 
                  type="button" 
                  className="login-back-btn" 
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Change Phone Number
                </button>
              </form>
            )}
            {/* Invisible Recaptcha Container */}
            <div id="recaptcha-container"></div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
