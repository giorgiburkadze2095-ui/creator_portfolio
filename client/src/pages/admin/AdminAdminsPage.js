import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { adminsApi } from '../../api/admins.js';
import { useAuth } from '../../context/AuthContext.js';
import { ROLES } from '../../constants/enums.js';

const EMPTY_FORM = { email: '', password: '', name: '', role: 'ADMIN', active: true };

export function AdminAdminsPage() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadAdmins = () => adminsApi.list().then(setAdmins).catch(() => {});

  useEffect(() => {
    loadAdmins();
  }, []);

  const startEdit = (admin) => {
    setEditingId(admin.id);
    setForm({ email: admin.email, password: '', name: admin.name, role: admin.role, active: admin.active });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (editingId) {
        const payload = { name: form.name, role: form.role, active: form.active };
        if (form.password) payload.password = form.password;
        await adminsApi.update(editingId, payload);
      } else {
        await adminsApi.create(form);
      }
      resetForm();
      loadAdmins();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently remove this admin account?')) return;
    await adminsApi.remove(id).catch((err) => setError(err.message));
    loadAdmins();
  };

  return (
    <div>
      <SEO title="Manage Admins" path="/admin/admins" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Admins</h1>
          <p className="admin-panel__description">
            SUPER_ADMIN only. Everyone here can manage site content — only SUPER_ADMIN can manage other admins.
          </p>
        </div>
      </div>

      <form className="admin-form admin-form--grid-2" onSubmit={handleSubmit}>
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
            disabled={!!editingId}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>{editingId ? 'New password (optional)' : 'Password'}</span>
          <input
            className="admin-input"
            type="password"
            required={!editingId}
            minLength={8}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Role</span>
          <select
            className="admin-select"
            value={form.role}
            disabled={editingId === currentUser.id}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        {editingId && (
          <label className="admin-field admin-checkbox-field">
            <input
              type="checkbox"
              disabled={editingId === currentUser.id}
              checked={form.active}
              onChange={(event) => setForm({ ...form, active: event.target.checked })}
            />
            Active
          </label>
        )}

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={submitting}>
            {editingId ? 'Save changes' : 'Create admin'}
          </button>
          {editingId && (
            <button type="button" className="button button--ghost" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  {admin.name}
                  {admin.id === currentUser.id && ' (you)'}
                </td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <span className={`admin-badge ${admin.active ? 'admin-badge--active' : ''}`}>
                    {admin.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-button-small" onClick={() => startEdit(admin)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-small admin-button-small--danger"
                      disabled={admin.id === currentUser.id}
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
