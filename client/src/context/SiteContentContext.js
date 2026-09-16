import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { siteSettingsApi } from '../api/siteSettings.js';

// Single fetch of the site's editable copy (creator name, hero, about,
// footer, CTA, contact — everything managed in Admin -> Site Content),
// shared through context so any component (Navbar, Footer, SEO, page bodies)
// can read it without its own fetch or prop drilling.
const SiteContentContext = createContext({ siteContent: null, loading: true });

export function SiteContentProvider({ children }) {
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    siteSettingsApi
      .get()
      .then((content) => active && setSiteContent(content))
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => ({ siteContent, loading }), [siteContent, loading]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
