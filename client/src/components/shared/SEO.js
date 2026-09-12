import { Helmet } from 'react-helmet-async';
import { useSiteContent } from '../../context/SiteContentContext.js';
import { SEO as SITE_SEO } from '../../config/seo.js';

// `image`/`imageAlt` let an individual page override the default social
// image (e.g. with SITE_SEO.pageImage) — optional, unused by any page today.
export function SEO({ title, description, path = '', image, imageAlt }) {
  const { siteContent } = useSiteContent();
  const siteName = siteContent?.creatorName || '';

  const fullTitle = siteName ? (title ? `${title} — ${siteName}` : siteName) : title || SITE_SEO.title;
  const metaDescription = description || SITE_SEO.description;
  const ogTitle = title ? fullTitle : SITE_SEO.ogTitle;
  const ogDescription = description || SITE_SEO.ogDescription;
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
  const imagePath = image || SITE_SEO.ogImage;
  const imageAltText = imageAlt || SITE_SEO.ogImageAlt;
  const absoluteImage = typeof window !== 'undefined' ? `${window.location.origin}${imagePath}` : imagePath;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAltText} />
      {siteName && <meta property="og:site_name" content={siteName} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
}
