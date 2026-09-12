import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { PartnerCard } from '../components/shared/PartnerCard.js';
import { EmptyState } from '../components/shared/EmptyState.js';
import { LoadingState } from '../components/shared/LoadingState.js';
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
      <div className="section-heading">
        <span className="section-heading__eyebrow">Partners</span>
        <h1 className="section-heading__title">Collaborations</h1>
      </div>

      {loading ? (
        <LoadingState label="Loading partners" />
      ) : partners.length > 0 ? (
        <div className="partners-page__grid">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
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
