import { useLocation } from 'react-router-dom';
import './RouteTransition.css';

// Keying on the pathname forces React to remount this wrapper on every
// navigation, which restarts the CSS enter animation below — no router
// exit-animation choreography needed, so it stays robust and instant to
// interact with (the outgoing page is simply gone, the incoming one fades
// and lifts in over content that is already fully rendered and usable).
export function RouteTransition({ children }) {
  const location = useLocation();

  return (
    <div className="route-transition" key={location.pathname}>
      {children}
    </div>
  );
}
