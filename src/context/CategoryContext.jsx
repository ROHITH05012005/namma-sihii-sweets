import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';

const CategoryContext = createContext();
export const useCategories = () => useContext(CategoryContext);

export const defaultCategories = [
  { 
    name: 'Sweets', 
    order: 1,
    image: "/images/kaju_katli_1783132955254.png",
    link: "/shop?category=Sweets",
    dropdown: ['Ghewars', 'Ghee & Khova Sweets', 'Packed Sweets', 'Assorted Sweets', 'Special Kaju Sweets', 'All Sweet Delights', 'Bengali Sweets', 'View All'] 
  },
  { 
    name: 'Namkeens',
    order: 2,
    image: "/images/navratan_mixture_1783133784049.png",
    link: "/shop?category=Namkeens",
    dropdown: ['Roasted Namkeens', 'View All']
  },
  { 
    name: 'Snacks',
    order: 3,
    image: "/images/namkeen_1783391394817.png",
    link: "/shop?category=Snacks",
    dropdown: ['Benne Specials', 'View All']
  },
  { 
    name: 'Bakery & Boulangerie',
    order: 4,
    image: "/images/croissant_bakery.png",
    link: "/shop?category=Bakery%20%26%20Boulangerie",
    dropdown: ['Cakes', 'Doughnuts', 'Beverages', 'Sticks', 'Cookies and Biscuits', 'Breads', 'Crossiants & Rolls', 'View All']
  },
  { name: 'Chocolates', order: 5, image: "/images/assorted_chocolates.png", link: "/shop?category=Chocolates", dropdown: [] },
  { name: 'Gifting', order: 6, image: "/images/gift_hamper.png", link: "/shop?category=Gifting", dropdown: [] },
  { name: 'Candles', order: 7, image: "/images/sandalwood_candle.png", link: "/shop?category=Candles", dropdown: [] },
  { name: 'Fragrances', order: 8, image: "/images/room_fragrance.png", link: "/shop?category=Fragrances", dropdown: [] },
  { name: 'Ice creams', order: 9, image: "/images/mango_ice_cream.png", link: "/shop?category=Ice%20creams", dropdown: [] },
  { name: 'Tea', order: 10, image: "/images/realistic_shop.png", link: "/shop?category=Tea", dropdown: [] }
];

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
