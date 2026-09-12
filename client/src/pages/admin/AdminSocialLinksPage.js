import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { socialLinksApi } from '../../api/socialLinks.js';
import { PLATFORMS, PLATFORM_LABELS } from '../../constants/enums.js';

const EMPTY_FORM = { platform: 'INSTAGRAM', url: '', label: '', iconType: 'instagram', sortOrder: 0, active: true };

export function AdminSocialLinksPage() {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadLinks = () => socialLinksApi.adminList().then(setLinks).catch(() => {});

  useEffect(() => {
    loadLinks();
  }, []);

  const startEdit = (link) => {
    setEditingId(link.id);
    setForm({
      platform: link.platform,
      url: link.url,
      label: link.label,
      iconType: link.iconType,
      sortOrder: link.sortOrder,
      active: link.active,
    });
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
    const payload = { ...form, sortOrder: Number(form.sortOrder) || 0 };
    try {
      if (editingId) {
        await socialLinksApi.update(editingId, payload);
      } else {
        await socialLinksApi.create(payload);
      }
      resetForm();
      loadLinks();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this social link?')) return;
    await socialLinksApi.remove(id).catch((err) => setError(err.message));
    loadLinks();
  };

  return (
    <div>
      <SEO title="Manage Social Links" path="/admin/social-links" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Social Links</h1>
          <p className="admin-panel__description">These power the footer and the Collaborate page — never hard-coded.</p>
        </div>
      </div>

      <form className="admin-form admin-form--grid-2" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>Platform</span>
          <select
            className="admin-select"
            value={form.platform}
            onChange={(event) =>
              setForm({ ...form, platform: event.target.value, iconType: event.target.value.toLowerCase() })
            }
          >
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {PLATFORM_LABELS[platform]}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Label</span>
          <input
            className="admin-input"
            required
            value={form.label}
            onChange={(event) => setForm({ ...form, label: event.target.value })}
            placeholder="Instagram"
          />
        </label>

        <label className="admin-field admin-field--span-2">
          <span>URL</span>
          <input
            className="admin-input"
            type="url"
            required
            value={form.url}
            onChange={(event) => setForm({ ...form, url: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Sort order</span>
          <input
            className="admin-input"
            type="number"
            value={form.sortOrder}
            onChange={(event) => setForm({ ...form, sortOrder: event.target.value })}
          />
        </label>

        <label className="admin-field admin-checkbox-field">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => setForm({ ...form, active: event.target.checked })}
          />
          Active
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={submitting}>
            {editingId ? 'Save changes' : 'Add link'}
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
              <th>Platform</th>
              <th>Label</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td>{PLATFORM_LABELS[link.platform]}</td>
                <td>{link.label}</td>
                <td>
                  <span className={`admin-badge ${link.active ? 'admin-badge--active' : ''}`}>
                    {link.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-button-small" onClick={() => startEdit(link)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-small admin-button-small--danger"
                      onClick={() => handleDelete(link.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {links.length === 0 && (
              <tr>
                <td colSpan={4}>No social links yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
