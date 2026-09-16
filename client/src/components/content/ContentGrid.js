import { ContentCard } from '../shared/ContentCard.js';
import { EmptyState } from '../shared/EmptyState.js';
import { Reveal } from '../shared/Reveal.js';
import './ContentGrid.css';

export function ContentGrid({ items, variant = 'grid', emptyTitle, emptyDescription }) {
  if (!items || items.length === 0) {
    return <EmptyState title={emptyTitle || 'Nothing here yet'} description={emptyDescription} />;
  }

  return (
    <div className={`content-grid content-grid--${variant}`}>
      {items.map((item, index) => (
        <Reveal key={item.id} delay={Math.min(index * 0.05, 0.4)}>
          <ContentCard item={item} variant={variant} />
        </Reveal>
      ))}
    </div>
  );
}
