import { Helmet } from 'react-helmet-async';
import { useSiteContent } from '../../context/SiteContentContext.js';

export function SEO({ title, description, path = '' }) {
  const { siteContent } = useSiteContent();
  const siteName = siteContent?.creatorName || '';

  const fullTitle = siteName ? (title ? `${title} — ${siteName}` : siteName) : title || 'Home';
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      {siteName && <meta property="og:site_name" content={siteName} />}
    </Helmet>
  );
}
