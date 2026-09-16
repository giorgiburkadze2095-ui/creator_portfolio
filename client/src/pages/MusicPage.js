import { useEffect, useState } from 'react';
import { SEO } from '../components/shared/SEO.js';
import { ContentGrid } from '../components/content/ContentGrid.js';
import { LoadingState } from '../components/shared/LoadingState.js';
import { Reveal } from '../components/shared/Reveal.js';
import { contentApi } from '../api/content.js';

export function MusicPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list({ music: 'true' })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section container">
      <SEO title="Music" description="Music, in progress — creation, discovery, and behind-the-scenes." path="/music" />
      <Reveal className="section-heading">
        <span className="section-heading__eyebrow">Music</span>
        <h1 className="section-heading__title">Sound, in progress</h1>
        <p className="section-heading__description">
          Music updates and behind-the-scenes content will appear here as they are published.
        </p>
      </Reveal>

      {loading ? (
        <LoadingState label="Loading music content" />
      ) : (
        <ContentGrid
          items={items}
          emptyTitle="Music content is coming"
          emptyDescription="Progress, discoveries, and behind-the-scenes posts will show up here."
        />
      )}
    </div>
  );
}
