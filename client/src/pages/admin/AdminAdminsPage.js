import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { adminsApi } from '../../api/admins.js';
import { useAuth } from '../../context/AuthContext.js';
import { ROLES } from '../../constants/enums.js';

const EMPTY_FORM = { email: '', name: '', role: 'ADMIN' };

export function AdminAdminsPage() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [setupInfo, setSetupInfo] = useState(null);

  const loadAdmins = () => adminsApi.list().then(setAdmins).catch(() => {});

  useEffect(() => {
    loadAdmins();
  }, []);

  const showSetupLink = (admin, setupToken) => {
    const setupUrl = `${window.location.origin}/admin/setup-password?token=${setupToken}`;
    setSetupInfo({ email: admin.email, setupUrl });
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const created = await adminsApi.create(form);
      setForm(EMPTY_FORM);
      showSetupLink(created, created.setupToken);
      loadAdmins();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (admin, role) => {
    setError('');
    try {
      await adminsApi.update(admin.id, { role });
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleActive = async (admin) => {
    setError('');
    try {
      await adminsApi.update(admin.id, { active: !admin.active });
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendSetup = async (admin) => {
    setError('');
    try {
      const updated = await adminsApi.resendSetup(admin.id);
      showSetupLink(updated, updated.setupToken);
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently remove this admin account?')) return;
    await adminsApi.remove(id).catch((err) => setError(err.message));
    loadAdmins();
  };

  const copySetupUrl = async () => {
    try {
      await navigator.clipboard.writeText(setupInfo.setupUrl);
    } catch {
      // Clipboard access can fail (permissions, non-secure context) — the
      // link is already shown in the banner for manual copying either way.
    }
  };

  return (
    <div>
      <SEO title="Manage Admins" path="/admin/admins" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Admins</h1>
          <p className="admin-panel__description">
            SUPER_ADMIN only. You create the account and hand the admin a one-time setup link — they choose their
            own password. Nobody but them ever sees it.
          </p>
        </div>
      </div>

      {setupInfo && (
        <div className="admin-form" style={{ borderColor: 'var(--color-accent)' }}>
          <div className="admin-field admin-field--span-2">
            <span>
              Setup link for <strong>{setupInfo.email}</strong> — share this with them directly. It only works
              once and cannot be viewed again after this.
            </span>
            <input className="admin-input" readOnly value={setupInfo.setupUrl} onFocus={(e) => e.target.select()} />
          </div>
          <div className="admin-form__actions">
            <button type="button" className="button button--ghost" onClick={copySetupUrl}>
              Copy link
            </button>
            <button type="button" className="button button--ghost" onClick={() => setSetupInfo(null)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <form className="admin-form admin-form--grid-2" onSubmit={handleCreate}>
        <label className="admin-field">
          <span>Name</span>
          <input
            className="admin-input"
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Email</span>
          <input
            className="admin-input"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Role</span>
          <select
            className="admin-select"
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create admin'}
          </button>
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Account</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              const isSelf = admin.id === currentUser.id;
              return (
                <tr key={admin.id}>
                  <td>
                    {admin.name}
                    {isSelf && ' (you)'}
                  </td>
                  <td>{admin.email}</td>
                  <td>
                    <select
                      className="admin-select"
                      value={admin.role}
                      disabled={isSelf}
                      onChange={(event) => handleRoleChange(admin, event.target.value)}
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className={`admin-badge ${admin.hasPassword ? 'admin-badge--active' : ''}`}>
                      {admin.hasPassword ? 'Set up' : 'Setup pending'}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${admin.active ? 'admin-badge--active' : ''}`}>
                      {admin.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      {!admin.hasPassword && (
                        <button type="button" className="admin-button-small" onClick={() => handleResendSetup(admin)}>
                          Resend setup
                        </button>
                      )}
                      <button
                        type="button"
                        className="admin-button-small"
                        disabled={isSelf}
                        onClick={() => handleToggleActive(admin)}
                      >
                        {admin.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        className="admin-button-small admin-button-small--danger"
                        disabled={isSelf}
                        onClick={() => handleDelete(admin.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
