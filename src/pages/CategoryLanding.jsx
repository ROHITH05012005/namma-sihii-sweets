import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';
import { products as allProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './CategoryLanding.css';

const categoryContent = {
  sweets: {
    tagline: 'Crafted with Love, Served with Tradition',
    description: 'Every sweet at Namma Sihii Sweets carries the warmth of a grandmother\'s kitchen and the precision of a master artisan. Made from pure desi ghee, fresh milk, and premium ingredients — our sweets are a celebration in every bite.',
    highlight: 'No artificial preservatives. 100% fresh. Made daily.',
    color: '#8B1A1A',
    emoji: '🍬',
  },
  namkeens: {
    tagline: 'Crunchy, Spicy, Irresistible',
    description: 'From light roasted mixes to bold, spiced snacks — our Namkeen range is crafted for those moments when you crave something perfectly salty and satisfying. Made in small batches to guarantee freshness.',
    highlight: 'Bold flavours. Freshly roasted. Zero compromise.',
    color: '#D4521A',
    emoji: '🥜',
  },
  snacks: {
    tagline: 'Perfect Bites for Every Moment',
    description: 'Whether it\'s a quick evening hunger or a party snack platter, our Snacks range has you covered. Light, flavorful, and made with care — these are bites you\'ll keep coming back for.',
    highlight: 'Crispy perfection in every pack.',
    color: '#C0922A',
    emoji: '🍿',
  },
  'bakery & boulangerie': {
    tagline: 'From Our Oven to Your Table',
    description: 'Our bakery blends classic Indian baking with modern French techniques. From flaky croissants to rich cakes, from artisan breads to delicate cookies — every item is baked fresh, every single day.',
    highlight: 'Baked fresh. Delivered with love.',
    color: '#7B4F2E',
    emoji: '🥐',
  },
  chocolates: {
    tagline: 'Indulge in Pure Chocolate Bliss',
    description: 'Our chocolate range celebrates the art of fine chocolate-making. From smooth milk chocolates to intense dark varieties, from delicate truffles to beautiful gift boxes — each piece is a moment of pure indulgence.',
    highlight: 'Premium cocoa. Handcrafted. Extraordinary.',
    color: '#3D1C02',
    emoji: '🍫',
  },
  gifting: {
    tagline: 'Make Every Celebration Sweeter',
    description: 'The perfect gift is one that comes from the heart. Our curated gift hampers combine the finest sweets, chocolates, and artisanal treats into beautiful packages for weddings, festivals, corporate events, and every occasion worth celebrating.',
    highlight: 'Thoughtful. Timeless. Truly delightful.',
    color: '#8B1A6B',
    emoji: '🎁',
  },
  candles: {
    tagline: 'Light Up Moments, Breathe in Luxury',
    description: 'Transform your space with our exquisite candle collection. Hand-poured with premium wax and infused with carefully curated fragrances — from calming sandalwood to energising citrus — each candle creates an atmosphere of pure luxury.',
    highlight: 'Hand-poured. Long-lasting. Beautifully crafted.',
    color: '#6B4E1A',
    emoji: '🕯️',
  },
  fragrances: {
    tagline: 'Scents That Tell a Story',
    description: 'Our fragrance collection is a tribute to the art of perfumery. Each scent is a harmonious blend of rare botanicals and precious essences, crafted through traditional distillation. Non-alcoholic, long-lasting, and truly extraordinary.',
    highlight: 'Rare botanicals. Non-alcoholic. Timeless.',
    color: '#4A1A6B',
    emoji: '🌸',
  },
  'ice creams': {
    tagline: 'Cool, Creamy, and Utterly Delightful',
    description: 'Made with real fruits, natural flavours, and the finest dairy — our ice creams are a celebration of summer in every scoop. From classic Indian kulfi flavours to modern gelato-style creations — cool down in the most delicious way possible.',
    highlight: 'Real ingredients. Pure joy. Every scoop.',
    color: '#1A6B8B',
    emoji: '🍦',
  },
  tea: {
    tagline: 'A Cup of Calm in Every Sip',
    description: 'Our premium tea collection is sourced from the finest gardens across India. From the delicate first-flush Darjeeling to robust Assam blends and soothing herbal infusions — find your perfect cup and make every moment a ritual.',
    highlight: 'Finest leaves. Rich aroma. Perfect every time.',
    color: '#2E6B1A',
    emoji: '🍵',
  },
};

const CategoryLanding = () => {
  const { categories } = useCategories();
  const { slug } = useParams();
  const decodedName = decodeURIComponent(slug || '');
  const [activeSubcat, setActiveSubcat] = useState('all');

  // Find category from context
  const category = categories.find(
    c => c.name.toLowerCase() === decodedName.toLowerCase()
  );

  const content = categoryContent[decodedName.toLowerCase()] || {
    tagline: `Explore Our ${decodedName} Collection`,
    description: `Discover our full range of premium ${decodedName} — crafted with care and delivered fresh to your doorstep.`,
    highlight: 'Fresh. Premium. Delivered daily.',
    color: '#8B1A1A',
    emoji: '🛍️',
  };

  // Filter products for this category
  const categoryProducts = allProducts.filter(
    p => p.category?.toLowerCase() === decodedName.toLowerCase()
  );

  // Get unique subcategories
  const subcategories = ['all', ...new Set(
    categoryProducts.filter(p => p.subcategory).map(p => p.subcategory)
  )];

  const displayedProducts = activeSubcat === 'all'
    ? categoryProducts
    : categoryProducts.filter(p => p.subcategory === activeSubcat);

  return (
    <div className="category-landing">
      {/* Hero Section */}
      <section
        className="category-hero"
        style={{
          backgroundImage: category?.image ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${category.image})` : `linear-gradient(135deg, ${content.color}dd, ${content.color}88)`,
        }}
      >
        <div className="container category-hero-content">
          <span className="category-emoji">{content.emoji}</span>
          <h1>{decodedName}</h1>
          <p className="category-tagline">{content.tagline}</p>
          <p className="category-desc">{content.description}</p>
          <p className="category-highlight">{content.highlight}</p>
          <Link to={`/shop?category=${encodeURIComponent(decodedName)}`} className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} /> Shop All {decodedName}
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="section category-products-section">
        <div className="container">
          <h2 className="section-title">Our {decodedName} Collection</h2>

          {/* Subcategory Tabs */}
          {subcategories.length > 1 && (
            <div className="subcat-tabs">
              {subcategories.map(sub => (
                <button
                  key={sub}
                  className={`subcat-tab ${activeSubcat === sub ? 'active' : ''}`}
                  onClick={() => setActiveSubcat(sub)}
                >
                  {sub === 'all' ? `All ${decodedName}` : sub}
                </button>
              ))}
            </div>
          )}

          {displayedProducts.length > 0 ? (
            <div className="products-grid">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '3rem' }}>🍬</p>
              <h3>Coming Soon!</h3>
              <p>We're preparing something special for you. Check back soon!</p>
              <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px', textDecoration: 'none' }}>
                Browse All Products <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryLanding;
