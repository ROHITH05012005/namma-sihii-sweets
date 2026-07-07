import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const isLocalAdmin = localStorage.getItem('adminToken') === 'true';
  
  const [user, setUser] = useState(isLocalAdmin ? {
    id: 'admin-local',
    name: 'Admin',
    email: 'admin@nammasihii.com',
    isAdmin: true
  } : null);
  
  const [token, setToken] = useState(isLocalAdmin ? 'mock-admin-token' : null);
  const [loading, setLoading] = useState(!isLocalAdmin);

  useEffect(() => {
    // Check for hardcoded admin backdoor
    if (isLocalAdmin) {
      setLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (localStorage.getItem('adminToken') === 'true') return; // Ignore if local admin is logged in

      if (currentUser) {
        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
          email: currentUser.email,
          isAdmin: currentUser.email === 'admin@nammasihii.com'
        });
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    if (localStorage.getItem('adminToken') === 'true') {
      localStorage.removeItem('adminToken');
      window.location.href = '/';
      return;
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
