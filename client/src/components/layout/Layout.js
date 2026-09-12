import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';
import { RouteTransition } from '../shared/RouteTransition.js';

export function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <RouteTransition>
          <Outlet />
        </RouteTransition>
      </main>
      <Footer />
    </>
  );
}
