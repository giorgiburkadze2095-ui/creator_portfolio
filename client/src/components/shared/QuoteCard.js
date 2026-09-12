import { useSiteContent } from '../../context/SiteContentContext.js';
import './QuoteCard.css';

export function QuoteCard({ quote }) {
  const { siteContent } = useSiteContent();

  return (
    <figure className="quote-card">
      <blockquote className="quote-card__text">“{quote.text}”</blockquote>
      <figcaption className="quote-card__caption">
        {quote.isOriginal ? (
          <span>{siteContent?.creatorName || 'Original'}</span>
        ) : (
          <span>
            {quote.author}
            {quote.attributionSource && `, ${quote.attributionSource}`}
          </span>
        )}
        {quote.sourceUrl && (
          <a href={quote.sourceUrl} target="_blank" rel="noopener noreferrer" className="quote-card__source">
            Source ↗
          </a>
        )}
      </figcaption>
    </figure>
  );
}
