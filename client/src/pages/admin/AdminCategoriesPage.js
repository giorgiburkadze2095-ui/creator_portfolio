import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { categoriesApi } from '../../api/categories.js';

const EMPTY_FORM = { slug: '', label: '', description: '', sortOrder: 0, active: true };

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadCategories = () => categoriesApi.adminList().then(setCategories).catch(() => {});

  useEffect(() => {
    loadCategories();
  }, []);

  const startEdit = (category) => {
    setEditingId(category.id);
    setForm({
      slug: category.slug,
      label: category.label,
      description: category.description || '',
      sortOrder: category.sortOrder,
      active: category.active,
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
        await categoriesApi.update(editingId, payload);
      } else {
        await categoriesApi.create(payload);
      }
      resetForm();
      loadCategories();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? Content using it will be uncategorized.')) return;
    await categoriesApi.remove(id).catch((err) => setError(err.message));
    loadCategories();
  };

  return (
    <div>
      <SEO title="Manage Categories" path="/admin/categories" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Categories</h1>
          <p className="admin-panel__description">
            These power every category filter across the public site — nothing is hard-coded in React.
          </p>
        </div>
      </div>

      <form className="admin-form admin-form--grid-2" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>Slug (lowercase, hyphenated)</span>
          <input
            className="admin-input"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            disabled={!!editingId}
          />
        </label>

        <label className="admin-field">
          <span>Label</span>
          <input
            className="admin-input"
            required
            value={form.label}
            onChange={(event) => setForm({ ...form, label: event.target.value })}
          />
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
            {editingId ? 'Save changes' : 'Add category'}
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
              <th>Label</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.label}</td>
                <td>{category.slug}</td>
                <td>
                  <span className={`admin-badge ${category.active ? 'admin-badge--active' : ''}`}>
                    {category.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-button-small" onClick={() => startEdit(category)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-small admin-button-small--danger"
                      onClick={() => handleDelete(category.id)}
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
