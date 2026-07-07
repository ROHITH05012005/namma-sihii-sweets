import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero" style={{ backgroundColor: 'var(--primary-dark)' }}>
        <div className="container about-container">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img src="/images/our_story.png" alt="Vintage Indian Sweet Shop Heritage" className="about-image" />
            </div>
            <div className="about-content">
              <h1 className="about-title" style={{ color: 'var(--secondary)' }}>Our Story</h1>
              <p className="about-text" style={{ color: 'var(--background)' }}>
                Namma Sihii Sweets started with a simple vision: to bring the authentic taste of traditional Indian sweets to modern homes. 
              </p>
              <p className="about-text" style={{ color: 'var(--background)' }}>
                Using recipes passed down through generations, we prepare our delicacies with pure ghee, premium nuts, and a lot of love. Every batch is crafted exactly as it was decades ago by our ancestors, preserving a rich culinary heritage that spans across generations.
              </p>
              <p className="about-text" style={{ color: 'var(--background)' }}>
                We believe that a sweet is more than just a treat—it is a celebration of culture, family, and joy. From our kitchen to your table, we promise nothing but absolute purity and perfection.
              </p>
              <Link to="/shop" className="btn-primary" style={{ backgroundColor: 'var(--secondary)', color: 'var(--primary-dark)', borderColor: 'var(--secondary)', marginTop: '24px' }}>
                Taste The Tradition <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
