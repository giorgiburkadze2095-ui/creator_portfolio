import { useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { useAuth } from '../../context/AuthContext.js';
import { authApi } from '../../api/auth.js';

export function AdminAccountPage() {
  const { user, updateSelf } = useAuth();

  const [profileForm, setProfileForm] = useState({ name: user?.name || '', email: user?.email || '', currentPassword: '' });
  const [profileError, setProfileError] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);

  const emailChanged = profileForm.email.trim().toLowerCase() !== (user?.email || '').toLowerCase();

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileError('');
    setProfileStatus('');
    setProfileSubmitting(true);
    try {
      const payload = { name: profileForm.name };
      if (emailChanged) {
        payload.email = profileForm.email;
        payload.currentPassword = profileForm.currentPassword;
      }
      const updated = await authApi.updateProfile(payload);
      updateSelf(updated);
      setProfileForm({ name: updated.name, email: updated.email, currentPassword: '' });
      setProfileStatus('Saved.');
    } catch (err) {
      setProfileError(err.message || 'Something went wrong.');
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError('');
    setPasswordStatus('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setPasswordSubmitting(true);
    try {
      await authApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordStatus('Password updated.');
    } catch (err) {
      setPasswordError(err.message || 'Something went wrong.');
    } finally {
      setPasswordSubmitting(false);
    }
  };

  return (
    <div>
      <SEO title="My Account" path="/admin/account" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">My Account</h1>
          <p className="admin-panel__description">
            Your name, email and password belong only to you — not even a SUPER_ADMIN can change them for you.
          </p>
        </div>
      </div>

      <form className="admin-form admin-form--grid-2" onSubmit={handleProfileSubmit}>
        <label className="admin-field">
          <span>Name</span>
          <input
            className="admin-input"
            required
            value={profileForm.name}
            onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Email</span>
          <input
            className="admin-input"
            type="email"
            required
            value={profileForm.email}
            onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })}
          />
        </label>

        {emailChanged && (
          <label className="admin-field admin-field--span-2">
            <span>Current password (required to change your email)</span>
            <input
              className="admin-input"
              type="password"
              required
              value={profileForm.currentPassword}
              onChange={(event) => setProfileForm({ ...profileForm, currentPassword: event.target.value })}
            />
          </label>
        )}

        {profileError && <p className="admin-error">{profileError}</p>}
        {profileStatus && <p style={{ color: 'var(--color-success)' }}>{profileStatus}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={profileSubmitting}>
            {profileSubmitting ? 'Saving…' : 'Save profile'}
          </button>
        </div>
      </form>

      <form className="admin-form admin-form--grid-2" onSubmit={handlePasswordSubmit}>
        <label className="admin-field admin-field--span-2">
          <span>Current password</span>
          <input
            className="admin-input"
            type="password"
            required
            value={passwordForm.currentPassword}
            onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>New password</span>
          <input
            className="admin-input"
            type="password"
            required
            minLength={8}
            value={passwordForm.newPassword}
            onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Confirm new password</span>
          <input
            className="admin-input"
            type="password"
            required
            minLength={8}
            value={passwordForm.confirmPassword}
            onChange={(event) => setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })}
          />
        </label>

        {passwordError && <p className="admin-error">{passwordError}</p>}
        {passwordStatus && <p style={{ color: 'var(--color-success)' }}>{passwordStatus}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={passwordSubmitting}>
            {passwordSubmitting ? 'Updating…' : 'Change password'}
          </button>
        </div>
      </form>
    </div>
  );
}
