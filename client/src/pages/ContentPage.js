import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { ContentFilters } from '../components/content/ContentFilters.js';
import { ContentGrid } from '../components/content/ContentGrid.js';
import { LoadingState } from '../components/shared/LoadingState.js';
import { Reveal } from '../components/shared/Reveal.js';
import { contentApi } from '../api/content.js';

export function ContentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = searchParams.get('platform') || '';
  const featuredOnly = searchParams.get('featured') === 'true';

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    contentApi
      .list({ platform, featured: featuredOnly ? 'true' : undefined })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [platform, featuredOnly]);

  const handleChange = (partial) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(partial).forEach(([key, value]) => {
      if (value) {
        next.set(key, value === true ? 'true' : value);
      } else {
        next.delete(key);
      }
    });
    setSearchParams(next);
  };

  return (
    <div className="section container">
      <SEO title="Content" description="Browse fitness, motivation, music and thought content." path="/content" />
      <Reveal className="section-heading">
        <span className="section-heading__eyebrow">Content</span>
        <h1 className="section-heading__title">Everything I've shared, in one place</h1>
        <p className="section-heading__description">
          Every card links back to the original post on the platform it was published on.
        </p>
      </Reveal>

      <ContentFilters platform={platform} featuredOnly={featuredOnly} onChange={handleChange} />

      {loading ? (
        <LoadingState label="Loading content" />
      ) : (
        <ContentGrid
          items={items}
          emptyTitle="No content matches these filters"
          emptyDescription="Try a different platform."
        />
      )}
    </div>
  );
}
