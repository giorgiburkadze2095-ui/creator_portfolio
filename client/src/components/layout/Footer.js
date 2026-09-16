import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { socialLinksApi } from '../../api/socialLinks.js';
import { PlatformIcon } from '../shared/PlatformIcon.js';
import { useSiteContent } from '../../context/SiteContentContext.js';
import { handleSameRouteNavClick } from '../../utils/navigation.js';
import './Footer.css';

export function Footer() {
  const { siteContent } = useSiteContent();
  const { pathname } = useLocation();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    let active = true;
    socialLinksApi
      .list()
      .then((links) => active && setSocialLinks(links))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const year = new Date().getFullYear();
  const creatorName = siteContent?.creatorName || 'Your Name';

  return (
    <footer className="footer">
      <div className="container footer__row">
        <div className="footer__brand">
          <p className="footer__name">{creatorName}</p>
          {siteContent?.footerText && <p className="footer__tagline">{siteContent.footerText}</p>}
        </div>

        {socialLinks.length > 0 && (
          <div className="footer__social" aria-label="Social media">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="footer__social-link"
              >
                <PlatformIcon type={link.iconType} size={18} />
              </a>
            ))}
          </div>
        )}

        <nav className="footer__links" aria-label="Footer">
          <Link to="/collaborate" onClick={(event) => handleSameRouteNavClick(event, '/collaborate', pathname)}>
            Work with me
          </Link>
          <Link to="/about" onClick={(event) => handleSameRouteNavClick(event, '/about', pathname)}>
            About
          </Link>
          <Link to="/content" onClick={(event) => handleSameRouteNavClick(event, '/content', pathname)}>
            Content
          </Link>
          <Link to="/terms-of-use" onClick={(event) => handleSameRouteNavClick(event, '/terms-of-use', pathname)}>
            Terms of Use
          </Link>
        </nav>
      </div>
      <div className="container">
        <p className="footer__copyright">© {year} {creatorName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
