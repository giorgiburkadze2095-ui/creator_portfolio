import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal.js';
import { ContentGrid } from '../content/ContentGrid.js';

export function FeaturedContent({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-heading__eyebrow">Featured</span>
            <h2 className="section-heading__title">Recent content worth your time</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContentGrid items={items} />
        </Reveal>
        <div style={{ marginTop: 'var(--space-5)' }}>
          <Link to="/content" className="button button--ghost">
            View all content
          </Link>
        </div>
      </div>
    </section>
  );
}
