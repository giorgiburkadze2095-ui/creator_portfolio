import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { ContentGrid } from '../components/content/ContentGrid.js';
import { LoadingState } from '../components/shared/LoadingState.js';
import { Reveal } from '../components/shared/Reveal.js';
import { contentApi } from '../api/content.js';

export function FitnessPage() {
  const { siteContent } = useOutletContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list({ category: 'fitness' })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section container">
      <SEO
        title="Fitness"
        description="Training, discipline, and the mindset behind showing up consistently."
        path="/fitness"
      />
      <Reveal className="section-heading">
        <span className="section-heading__eyebrow">Fitness · Motivation</span>
        <h1 className="section-heading__title">Discipline, in progress</h1>
        <p className="section-heading__description">
          {siteContent?.aboutFitnessJourney ||
            'Training, recovery, and the mindset behind consistency — shared as it actually happens, not as a highlight reel. This is personal experience, not medical or professional advice.'}
        </p>
      </Reveal>

      {loading ? (
        <LoadingState label="Loading fitness content" />
      ) : (
        <ContentGrid
          items={items}
          emptyTitle="Fitness content is coming"
          emptyDescription="Workouts, progress, and lessons learned will show up here."
        />
      )}
    </div>
  );
}
