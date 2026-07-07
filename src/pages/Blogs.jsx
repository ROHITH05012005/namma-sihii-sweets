import React from 'react';
import StaticPage from './StaticPage';

const blogs = [
  {
    title: 'The Art of Making Ghee-Based Sweets',
    date: 'June 20, 2026',
    excerpt: 'Dive into the rich tradition of crafting sweets with pure desi ghee — from the farm to your plate. Learn how our artisans preserve age-old recipes.',
    img: '/images/pure_ingredients.png'
  },
  {
    title: 'Why Bengali Sweets Are a Festival Staple',
    date: 'June 05, 2026',
    excerpt: 'From Rasgulla to Sandesh, Bengali sweets hold a special place in Indian culture. Discover the stories behind these beloved delicacies.',
    img: '/images/bengali_sweets.png'
  },
  {
    title: 'Sugar-Free Sweets: Indulge Without Guilt',
    date: 'May 18, 2026',
    excerpt: "Diabetes doesn't have to mean giving up on sweets! Explore our sugar-free range crafted with natural sweeteners that taste just as divine.",
    img: '/images/sugar_free.png'
  },
  {
    title: 'Gifting Guide: Sweets for Every Occasion',
    date: 'May 02, 2026',
    excerpt: "Whether it's Diwali, a wedding, or a corporate event — our curated gift hampers make the perfect impression every time.",
    img: '/images/gift_hamper.png'
  },
];

const Blogs = () => (
  <StaticPage title="Our Blog">
    <p>Stories, recipes, and sweet traditions from the world of Namma Sihii Sweets.</p>
    <div className="blog-grid">
      {blogs.map((blog, i) => (
        <div key={i} className="blog-card">
          <img src={blog.img} alt={blog.title} className="blog-card-img" onError={e => e.target.style.display='none'} />
          <div className="blog-card-body">
            <p style={{ color: 'var(--secondary)', fontSize: '0.8rem', marginBottom: '6px' }}>{blog.date}</p>
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  </StaticPage>
);

export default Blogs;
