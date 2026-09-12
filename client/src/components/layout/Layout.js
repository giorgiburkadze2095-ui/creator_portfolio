import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import { RouteTransition } from '../shared/RouteTransition.js';
import { siteSettingsApi } from '../../api/siteSettings.js';

export function Layout() {
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    let active = true;
    siteSettingsApi
      .get()
      .then((content) => active && setSiteContent(content))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <RouteTransition>
          <Outlet context={{ siteContent }} />
        </RouteTransition>
      </main>
      <Footer footerText={siteContent?.footerText} />
    </>
  );
}
