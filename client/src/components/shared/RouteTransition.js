import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './RouteTransition.css';

// Keying on the pathname forces React to remount this wrapper's children on
// every navigation, which (a) restarts the CSS enter animation below and
// (b) gives every scroll-reveal inside a brand new component instance, so
// none of them can start out already "seen" just because the previous page
// had been scrolled — each one re-arms its own IntersectionObserver against
// the freshly mounted, freshly scrolled-to-top layout.
//
// The scroll reset itself runs in a layout effect (before the browser
// paints, and before the new page's reveal components install their own
// observers in effects that run after this one) so nothing ever flashes at
// the previous page's scroll position first. Query-only changes don't
// retrigger this — it depends on pathname, not the full location — so
// in-page filters (e.g. the Content page's platform filter) don't reset scroll.
export function RouteTransition({ children }) {
  const location = useLocation();

  useLayoutEffect(() => {
    // `behavior: 'instant'` overrides the site-wide `scroll-behavior: smooth`
    // (index.css, meant for in-page anchor scrolling) — a route change must
    // land at the top immediately, not animate there across the outgoing
    // page's content.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="route-transition" key={location.pathname}>
      {children}
    </div>
  );
}
