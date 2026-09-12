import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
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
        <Outlet context={{ siteContent }} />
      </main>
      <Footer footerText={siteContent?.footerText} />
    </>
  );
}
