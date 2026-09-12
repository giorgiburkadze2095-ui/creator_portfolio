import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, path = '' }) {
  const fullTitle = title ? `${title} — Giorgi Burkadze` : 'Giorgi Burkadze';
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
}
