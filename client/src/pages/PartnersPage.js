import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { PartnerCard } from '../components/shared/PartnerCard.js';
import { EmptyState } from '../components/shared/EmptyState.js';
import { LoadingState } from '../components/shared/LoadingState.js';
import { Reveal } from '../components/shared/Reveal.js';
import { partnersApi } from '../api/partners.js';
import './PartnersPage.css';

export function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnersApi
      .list()
      .then(setPartners)
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section container">
      <SEO title="Partners" description="Brand and collaboration partners." path="/partners" />
      <Reveal className="section-heading">
        <span className="section-heading__eyebrow">Partners</span>
        <h1 className="section-heading__title">Collaborations</h1>
      </Reveal>

      {loading ? (
        <LoadingState label="Loading partners" />
      ) : partners.length > 0 ? (
        <div className="partners-page__grid">
          {partners.map((partner, index) => (
            <Reveal key={partner.id} delay={Math.min(index * 0.05, 0.4)} y={16} scale={0.97}>
              <PartnerCard partner={partner} />
            </Reveal>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No partners to show yet"
          description="I'm open to collaborations that genuinely fit my content."
        />
      )}

      <div className="partners-page__cta">
        <Link to="/collaborate" className="button button--primary">
          Work with me
        </Link>
      </div>
    </div>
  );
}
