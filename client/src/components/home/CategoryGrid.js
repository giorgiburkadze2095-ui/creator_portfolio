import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal.js';
import './CategoryGrid.css';

export function CategoryGrid({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="section category-grid">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">What I make</span>
          <h2 className="section-heading__title">Areas I create around</h2>
        </div>
        <div className="category-grid__list">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.05}>
              <Link to={`/content?category=${category.slug}`} className="category-tile">
                <span className="category-tile__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="category-tile__label">{category.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
