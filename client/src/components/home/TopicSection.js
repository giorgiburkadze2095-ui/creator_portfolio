import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal.js';
import { ContentGrid } from '../content/ContentGrid.js';
import './TopicSection.css';

export function TopicSection({ eyebrow, title, description, items, ctaTo, ctaLabel, reverse }) {
  return (
    <section className="section topic-section">
      <div className={`container topic-section__row ${reverse ? 'topic-section__row--reverse' : ''}`}>
        <Reveal className="topic-section__intro">
          <span className="section-heading__eyebrow">{eyebrow}</span>
          <h2 className="section-heading__title">{title}</h2>
          {description && <p className="section-heading__description">{description}</p>}
          {ctaTo && (
            <Link to={ctaTo} className="button button--ghost topic-section__cta">
              {ctaLabel || 'See more'}
            </Link>
          )}
        </Reveal>
        <Reveal delay={0.1} className="topic-section__content">
          <ContentGrid
            items={items}
            emptyTitle="More on the way"
            emptyDescription="New content in this category is coming soon."
          />
        </Reveal>
      </div>
    </section>
  );
}
