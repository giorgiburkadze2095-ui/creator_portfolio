import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/shared/SEO.js';
import { contentApi } from '../../api/content.js';
import { quotesApi } from '../../api/quotes.js';
import { partnersApi } from '../../api/partners.js';
import { socialLinksApi } from '../../api/socialLinks.js';
import './AdminDashboardPage.css';

const CARDS = [
  { key: 'content', label: 'Content items', to: '/admin/content', loader: () => contentApi.adminList() },
  { key: 'quotes', label: 'Quotes', to: '/admin/quotes', loader: () => quotesApi.adminList() },
  { key: 'partners', label: 'Partners', to: '/admin/partners', loader: () => partnersApi.adminList() },
  { key: 'socialLinks', label: 'Social links', to: '/admin/social-links', loader: () => socialLinksApi.adminList() },
];

export function AdminDashboardPage() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    CARDS.forEach((card) => {
      card
        .loader()
        .then((rows) => setCounts((prev) => ({ ...prev, [card.key]: rows.length })))
        .catch(() => setCounts((prev) => ({ ...prev, [card.key]: '—' })));
    });
  }, []);

  return (
    <div>
      <SEO title="Admin Dashboard" path="/admin" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Dashboard</h1>
          <p className="admin-panel__description">A quick overview of everything on the site.</p>
        </div>
      </div>

      <div className="admin-dashboard__grid">
        {CARDS.map((card) => (
          <Link key={card.key} to={card.to} className="admin-dashboard__card">
            <span className="admin-dashboard__count">
              {counts[card.key] === undefined ? '…' : counts[card.key]}
            </span>
            <span className="admin-dashboard__label">{card.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
