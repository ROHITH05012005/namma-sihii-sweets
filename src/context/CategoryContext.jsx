import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { defaultCategories } from '../data/defaultCategories';

const CategoryContext = createContext();
export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const cats = [];
        snapshot.forEach(doc => {
          cats.push({ id: doc.id, ...doc.data() });
        });
        setCategories(cats);
      } else {
        setCategories(defaultCategories); // Fallback
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addCategory = async (categoryData) => {
    try {
      const newId = categoryData.name.toLowerCase().replace(/\s+/g, '-');
      await setDoc(doc(db, 'categories', newId), categoryData);
    } catch (error) {
      console.error("Error adding category", error);
      throw error;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await deleteDoc(doc(db, 'categories', categoryId));
    } catch (error) {
      console.error("Error deleting category", error);
      throw error;
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, loading, addCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
