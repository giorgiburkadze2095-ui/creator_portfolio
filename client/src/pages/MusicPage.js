import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { ContentGrid } from '../components/content/ContentGrid.js';
import { LoadingState } from '../components/shared/LoadingState.js';
import { contentApi } from '../api/content.js';

export function MusicPage() {
  const { siteContent } = useOutletContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list({ category: 'music' })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section container">
      <SEO title="Music" description="My music journey — learning, creating, and discovering sound." path="/music" />
      <div className="section-heading">
        <span className="section-heading__eyebrow">Music</span>
        <h1 className="section-heading__title">Learning to make sound</h1>
        <p className="section-heading__description">
          {siteContent?.aboutMusicJourney ||
            "I'm early in my music journey — this is the honest, in-progress process of learning to create and discovering music that moves me. Not a finished body of work, just the real path."}
        </p>
      </div>

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
