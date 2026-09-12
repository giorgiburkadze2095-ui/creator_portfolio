import { Link } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';

export function NotFoundPage() {
  return (
    <div className="section container" style={{ textAlign: 'center' }}>
      <SEO title="Page not found" path="/404" />
      <h1 className="section-heading__title">Page not found</h1>
      <p className="section-heading__description" style={{ margin: '0 auto var(--space-4)' }}>
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="button button--primary">
        Back to home
      </Link>
    </div>
  );
}
