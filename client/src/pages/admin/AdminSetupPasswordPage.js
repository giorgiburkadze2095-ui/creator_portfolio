import { useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { SEO } from '../../components/shared/SEO.js';
import '../../components/admin/admin-ui.css';
import './AdminLoginPage.css';

export function AdminSetupPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { setupPassword, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  if (!token) {
    return (
      <div className="admin-login">
        <SEO title="Set up your account" path="/admin/setup-password" />
        <div className="admin-login__card">
          <h1 className="admin-login__title">Missing setup link</h1>
          <p className="admin-error">
            This page needs a setup token in the URL. Ask whoever created your account for the link again.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await setupPassword(token, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'This setup link is invalid or has expired.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login">
      <SEO title="Set up your account" path="/admin/setup-password" />
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <h1 className="admin-login__title">Set your password</h1>
        <p className="admin-panel__description">Choose a password to finish setting up your admin account.</p>

        <label className="admin-field">
          <span>New password</span>
          <input
            className="admin-input"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </label>

        <label className="admin-field">
          <span>Confirm password</span>
          <input
            className="admin-input"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="button button--primary" disabled={submitting}>
          {submitting ? 'Setting up…' : 'Set password and sign in'}
        </button>
      </form>
    </div>
  );
}
