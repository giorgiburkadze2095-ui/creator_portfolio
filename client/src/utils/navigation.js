// Route changes already scroll to top instantly (see RouteTransition, keyed
// on pathname) — but clicking a nav link back to the page you're already on
// never triggers a route change at all, so nothing happens by default.
// This covers that one case with a smooth scroll instead, without touching
// the cross-page behavior.
export function handleSameRouteNavClick(event, to, pathname) {
  if (to === pathname) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
