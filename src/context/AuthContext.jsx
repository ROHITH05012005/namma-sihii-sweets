import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let isAdmin = false;
        try {
          const adminRef = doc(db, 'admin_users', currentUser.uid);
          const adminSnap = await getDoc(adminRef);
          
          if (adminSnap.exists()) {
            isAdmin = true;
          } else {
            // Bootstrap mode: If there are NO admins in the database, the first user to log in becomes the Admin.
            const adminsQuery = query(collection(db, 'admin_users'), limit(1));
            const adminsSnap = await getDocs(adminsQuery);
            
            if (adminsSnap.empty) {
              await setDoc(adminRef, { 
                email: currentUser.email, 
                role: 'admin',
                createdAt: new Date().toISOString()
              });
              isAdmin = true;
            }
          }
        } catch (error) {
          console.error("Error verifying admin status:", error);
        }

        setUser({
          id: currentUser.uid,
          name: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
          email: currentUser.email,
          isAdmin: isAdmin
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
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
