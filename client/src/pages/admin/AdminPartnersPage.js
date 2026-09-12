import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { partnersApi } from '../../api/partners.js';
import { COLLABORATION_TYPES, COLLABORATION_TYPE_LABELS } from '../../constants/enums.js';

const EMPTY_FORM = {
  name: '',
  logoUrl: '',
  description: '',
  websiteUrl: '',
  socialUrl: '',
  collaborationType: 'OTHER',
  featured: false,
  active: true,
  sortOrder: 0,
};

export function AdminPartnersPage() {
  const [partners, setPartners] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadPartners = () => partnersApi.adminList().then(setPartners).catch(() => {});

  useEffect(() => {
    loadPartners();
  }, []);

  const startEdit = (partner) => {
    setEditingId(partner.id);
    setForm({
      name: partner.name,
      logoUrl: partner.logoUrl || '',
      description: partner.description || '',
      websiteUrl: partner.websiteUrl || '',
      socialUrl: partner.socialUrl || '',
      collaborationType: partner.collaborationType,
      featured: partner.featured,
      active: partner.active,
      sortOrder: partner.sortOrder,
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
        await partnersApi.update(editingId, payload);
      } else {
        await partnersApi.create(payload);
      }
      resetForm();
      loadPartners();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this partner?')) return;
    await partnersApi.remove(id).catch((err) => setError(err.message));
    loadPartners();
  };

  return (
    <div>
      <SEO title="Manage Partners" path="/admin/partners" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Partners</h1>
          <p className="admin-panel__description">Logos are linked by URL — nothing is uploaded to this server.</p>
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
          <span>Collaboration type</span>
          <select
            className="admin-select"
            value={form.collaborationType}
            onChange={(event) => setForm({ ...form, collaborationType: event.target.value })}
          >
            {COLLABORATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {COLLABORATION_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field admin-field--span-2">
          <span>Description (optional)</span>
          <textarea
            className="admin-textarea"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Logo URL (optional)</span>
          <input
            className="admin-input"
            type="url"
            value={form.logoUrl}
            onChange={(event) => setForm({ ...form, logoUrl: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Website URL (optional)</span>
          <input
            className="admin-input"
            type="url"
            value={form.websiteUrl}
            onChange={(event) => setForm({ ...form, websiteUrl: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Social URL (optional)</span>
          <input
            className="admin-input"
            type="url"
            value={form.socialUrl}
            onChange={(event) => setForm({ ...form, socialUrl: event.target.value })}
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
            checked={form.featured}
            onChange={(event) => setForm({ ...form, featured: event.target.checked })}
          />
          Featured
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
            {editingId ? 'Save changes' : 'Add partner'}
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
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td>{partner.name}</td>
                <td>{COLLABORATION_TYPE_LABELS[partner.collaborationType]}</td>
                <td>
                  <span className={`admin-badge ${partner.active ? 'admin-badge--active' : ''}`}>
                    {partner.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-button-small" onClick={() => startEdit(partner)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-small admin-button-small--danger"
                      onClick={() => handleDelete(partner.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={4}>No partners yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
