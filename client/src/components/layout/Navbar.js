import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSiteContent } from '../../context/SiteContentContext.js';
import { ThemeToggle } from '../shared/ThemeToggle.js';
import { MusicToggle } from '../shared/MusicToggle.js';
import { handleSameRouteNavClick } from '../../utils/navigation.js';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/content', label: 'Content' },
  { to: '/music', label: 'Music' },
  { to: '/partners', label: 'Partners' },
  { to: '/collaborate', label: 'Collaborate' },
];

export function Navbar() {
  const { siteContent } = useSiteContent();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const creatorName = siteContent?.creatorName || 'Your Name';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__row">
        <NavLink
          to="/"
          className="navbar__brand"
          onClick={(event) => {
            handleSameRouteNavClick(event, '/', pathname);
            setIsOpen(false);
          }}
        >
          {creatorName}
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="navbar__link"
              onClick={(event) => handleSameRouteNavClick(event, link.to, pathname)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__utility">
          <MusicToggle />
          <ThemeToggle />

          <button
            type="button"
            className={`navbar__toggle ${isOpen ? 'navbar__toggle--open' : ''}`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="navbar__mobile-link"
              onClick={(event) => {
                handleSameRouteNavClick(event, link.to, pathname);
                setIsOpen(false);
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
