import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [method, setMethod] = useState('email'); // 'email' or 'google'
  const [isRegister, setIsRegister] = useState(false);
  
  // Email auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let loginEmail = email;
    // Magic backdoor for admin
    if (email.trim().toLowerCase() === 'admin' && password === 'admin123') {
      loginEmail = 'admin@nammasihii.com';
    } else if (email.trim().toLowerCase() === 'admin' && password !== 'admin123') {
       setError("Invalid admin password.");
       setLoading(false);
       return;
    }

    if (isRegister) {
      const result = await registerWithEmail(loginEmail, password);
      if (!result.success) setError(result.message);
    } else {
      let result = await loginWithEmail(loginEmail, password);
      // Automatically register the admin account if it's the first time they are logging in
      if (!result.success && loginEmail === 'admin@nammasihii.com' && (result.message.includes('auth/user-not-found') || result.message.includes('auth/invalid-credential'))) {
        result = await registerWithEmail(loginEmail, password);
      }
      if (!result.success) setError(result.message);
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
            className={`method-btn ${method === 'email' ? 'active' : ''}`}
            onClick={() => { setMethod('email'); setError(''); }}
          >
            Email Login
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

        {method === 'email' && (
          <div className="phone-login-section">
            <form onSubmit={handleEmailAuth} className="login-form">
              <div className="form-group">
                <label>Email (or 'admin')</label>
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="you@example.com"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="********"
                  required 
                />
              </div>
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? 'Processing...' : (isRegister ? 'Sign Up' : 'Sign In')}
              </button>
              <button 
                type="button" 
                className="login-back-btn" 
                onClick={() => setIsRegister(!isRegister)}
                disabled={loading}
              >
                {isRegister ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
