import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { LoadingState } from '../shared/LoadingState.js';

// Client-side gating is purely a UX convenience — every real authorization
// decision is re-checked by the NestJS guards on each API call, since
// frontend role state can never be trusted for security.
export function ProtectedRoute({ requireSuperAdmin = false }) {
  const { isAuthenticated, isSuperAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState label="Checking session" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
