import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { RouteTransition } from '../shared/RouteTransition.js';
import './AdminLayout.css';
import './admin-ui.css';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/content', label: 'Content' },
  { to: '/admin/quotes', label: 'Quotes' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/partners', label: 'Partners' },
  { to: '/admin/social-links', label: 'Social Links' },
  { to: '/admin/site-settings', label: 'Site Content' },
];

export function AdminLayout() {
  const { user, logout, isSuperAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = isSuperAdmin ? [...NAV_ITEMS, { to: '/admin/admins', label: 'Admins' }] : NAV_ITEMS;

  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <p className="admin-layout__brand">Admin</p>
        <nav>
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="admin-layout__nav-link">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="admin-layout__main">
        <header className="admin-layout__topbar">
          <select
            className="admin-layout__mobile-nav"
            aria-label="Admin section"
            value={items.find((item) => item.to === location.pathname)?.to || items[0].to}
            onChange={(event) => navigate(event.target.value)}
          >
            {items.map((item) => (
              <option key={item.to} value={item.to}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="admin-layout__user-block">
            <p className="admin-layout__user">{user?.name}</p>
            <p className="admin-layout__role">{user?.role}</p>
          </div>
          <button type="button" className="button button--ghost" onClick={logout}>
            Log out
          </button>
        </header>
        <main className="admin-layout__content">
          <RouteTransition>
            <Outlet />
          </RouteTransition>
        </main>
      </div>
    </div>
  );
}
