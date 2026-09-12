import { Reveal } from '../shared/Reveal.js';
import { QuoteCard } from '../shared/QuoteCard.js';
import { EmptyState } from '../shared/EmptyState.js';
import './QuotesSection.css';

export function QuotesSection({ quotes }) {
  return (
    <section className="section quotes-section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-heading__eyebrow">Thoughts · Quotes · Silence</span>
            <h2 className="section-heading__title">Ideas I keep coming back to</h2>
          </div>
        </Reveal>
        {quotes && quotes.length > 0 ? (
          <div className="quotes-section__grid">
            {quotes.map((quote, index) => (
              <Reveal key={quote.id} delay={index * 0.06}>
                <QuoteCard quote={quote} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Quotes coming soon"
            description="Original thoughts and words that shaped me will appear here."
          />
        )}
      </div>
    </section>
  );
}
