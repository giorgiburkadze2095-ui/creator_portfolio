import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { contentApi } from '../../api/content.js';
import { categoriesApi } from '../../api/categories.js';
import { DISPLAY_MODES, DISPLAY_MODE_LABELS, PLATFORMS, PLATFORM_LABELS } from '../../constants/enums.js';

const EMPTY_FORM = {
  externalUrl: '',
  title: '',
  description: '',
  categoryId: '',
  platform: '',
  displayModes: [],
  thumbnailUrl: '',
  authorCredit: '',
  featured: false,
  published: true,
  sortOrder: 0,
};

export function AdminContentPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadItems = () => contentApi.adminList().then(setItems).catch(() => {});

  useEffect(() => {
    loadItems();
    categoriesApi.adminList().then(setCategories).catch(() => {});
  }, []);

  const toggleDisplayMode = (mode) => {
    setForm((prev) => ({
      ...prev,
      displayModes: prev.displayModes.includes(mode)
        ? prev.displayModes.filter((m) => m !== mode)
        : [...prev.displayModes, mode],
    }));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      externalUrl: item.externalUrl,
      title: item.title,
      description: item.description || '',
      categoryId: item.categoryId || '',
      platform: item.platform || '',
      displayModes: item.displayModes || [],
      thumbnailUrl: item.thumbnailUrl || '',
      authorCredit: item.authorCredit || '',
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
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
    const payload = {
      ...form,
      categoryId: form.categoryId ? Number(form.categoryId) : undefined,
      platform: form.platform || undefined,
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (editingId) {
        await contentApi.update(editingId, payload);
      } else {
        await contentApi.create(payload);
      }
      resetForm();
      loadItems();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this content item?')) return;
    await contentApi.remove(id).catch((err) => setError(err.message));
    loadItems();
  };

  return (
    <div>
      <SEO title="Manage Content" path="/admin/content" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Content</h1>
          <p className="admin-panel__description">
            Paste a public post URL, pick a category and where it should appear. No media upload needed.
          </p>
        </div>
      </div>

      <form className="admin-form admin-form--grid-2" onSubmit={handleSubmit}>
        <label className="admin-field admin-field--span-2">
          <span>External post URL</span>
          <input
            className="admin-input"
            type="url"
            required
            value={form.externalUrl}
            onChange={(event) => setForm({ ...form, externalUrl: event.target.value })}
            placeholder="https://www.instagram.com/p/..."
          />
        </label>

        <label className="admin-field">
          <span>Title</span>
          <input
            className="admin-input"
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Category</span>
          <select
            className="admin-select"
            value={form.categoryId}
            onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
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
          <span>Platform override (auto-detected if left blank)</span>
          <select
            className="admin-select"
            value={form.platform}
            onChange={(event) => setForm({ ...form, platform: event.target.value })}
          >
            <option value="">Auto-detect</option>
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {PLATFORM_LABELS[platform]}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Thumbnail URL (optional)</span>
          <input
            className="admin-input"
            type="url"
            value={form.thumbnailUrl}
            onChange={(event) => setForm({ ...form, thumbnailUrl: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Author / credit (optional)</span>
          <input
            className="admin-input"
            value={form.authorCredit}
            onChange={(event) => setForm({ ...form, authorCredit: event.target.value })}
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

        <div className="admin-field admin-field--span-2">
          <span>Where should it appear?</span>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {DISPLAY_MODES.map((mode) => (
              <label key={mode} className="admin-field admin-checkbox-field">
                <input
                  type="checkbox"
                  checked={form.displayModes.includes(mode)}
                  onChange={() => toggleDisplayMode(mode)}
                />
                {DISPLAY_MODE_LABELS[mode]}
              </label>
            ))}
          </div>
        </div>

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
            checked={form.published}
            onChange={(event) => setForm({ ...form, published: event.target.checked })}
          />
          Published (visible on the site)
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={submitting}>
            {editingId ? 'Save changes' : 'Add content'}
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
              <th>Title</th>
              <th>Platform</th>
              <th>Category</th>
              <th>Modes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{PLATFORM_LABELS[item.platform]}</td>
                <td>{item.category?.label || '—'}</td>
                <td>{item.displayModes?.join(', ') || '—'}</td>
                <td>
                  <span className={`admin-badge ${item.published ? 'admin-badge--active' : ''}`}>
                    {item.published ? 'Published' : 'Hidden'}
                  </span>
                  {item.featured && <span className="admin-badge admin-badge--active">Featured</span>}
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-button-small" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-small admin-button-small--danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6}>No content yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
