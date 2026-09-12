import { ContentCard } from '../shared/ContentCard.js';
import { EmptyState } from '../shared/EmptyState.js';
import './ContentGrid.css';

export function ContentGrid({ items, variant = 'grid', emptyTitle, emptyDescription }) {
  if (!items || items.length === 0) {
    return <EmptyState title={emptyTitle || 'Nothing here yet'} description={emptyDescription} />;
  }

  return (
    <div className={`content-grid content-grid--${variant}`}>
      {items.map((item) => (
        <ContentCard key={item.id} item={item} variant={variant} />
      ))}
    </div>
  );
}
