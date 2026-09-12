import { useEffect, useState } from 'react';
import { SEO } from '../components/shared/SEO.js';
import { ContentGrid } from '../components/content/ContentGrid.js';
import { LoadingState } from '../components/shared/LoadingState.js';
import { contentApi } from '../api/content.js';

export function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list({ displayMode: 'GALLERY' })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section container">
      <SEO title="Gallery" description="A visual gallery of selected content." path="/gallery" />
      <div className="section-heading">
        <span className="section-heading__eyebrow">Gallery</span>
        <h1 className="section-heading__title">A visual look</h1>
        <p className="section-heading__description">
          Hand-picked visuals from across platforms — each one links back to the original post.
        </p>
      </div>

      {loading ? (
        <LoadingState label="Loading gallery" />
      ) : (
        <ContentGrid
          items={items}
          variant="gallery"
          emptyTitle="The gallery is empty for now"
          emptyDescription="New visuals will appear here as they're published."
        />
      )}
    </div>
  );
}
