import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { quotesApi } from '../../api/quotes.js';
import { categoriesApi } from '../../api/categories.js';

const EMPTY_FORM = {
  text: '',
  author: '',
  attributionSource: '',
  sourceUrl: '',
  categoryId: '',
  featured: false,
  published: true,
  sortOrder: 0,
};

export function AdminQuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadQuotes = () => quotesApi.adminList().then(setQuotes).catch(() => {});

  useEffect(() => {
    loadQuotes();
    categoriesApi.adminList().then(setCategories).catch(() => {});
  }, []);

  const startEdit = (quote) => {
    setEditingId(quote.id);
    setForm({
      text: quote.text,
      author: quote.author || '',
      attributionSource: quote.attributionSource || '',
      sourceUrl: quote.sourceUrl || '',
      categoryId: quote.categoryId || '',
      featured: quote.featured,
      published: quote.published,
      sortOrder: quote.sortOrder,
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
      sortOrder: Number(form.sortOrder) || 0,
    };
    try {
      if (editingId) {
        await quotesApi.update(editingId, payload);
      } else {
        await quotesApi.create(payload);
      }
      resetForm();
      loadQuotes();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this quote?')) return;
    await quotesApi.remove(id).catch((err) => setError(err.message));
    loadQuotes();
  };

  return (
    <div>
      <SEO title="Manage Quotes" path="/admin/quotes" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Quotes</h1>
          <p className="admin-panel__description">
            Leave "Author" empty for your own original quotes — attribution is enforced automatically.
          </p>
        </div>
      </div>

      <form className="admin-form admin-form--grid-2" onSubmit={handleSubmit}>
        <label className="admin-field admin-field--span-2">
          <span>Quote text</span>
          <textarea
            className="admin-textarea"
            required
            value={form.text}
            onChange={(event) => setForm({ ...form, text: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Author (leave blank if original)</span>
          <input
            className="admin-input"
            value={form.author}
            onChange={(event) => setForm({ ...form, author: event.target.value })}
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

        <label className="admin-field">
          <span>Attribution source (optional)</span>
          <input
            className="admin-input"
            value={form.attributionSource}
            onChange={(event) => setForm({ ...form, attributionSource: event.target.value })}
          />
        </label>

        <label className="admin-field">
          <span>Source URL (optional)</span>
          <input
            className="admin-input"
            type="url"
            value={form.sourceUrl}
            onChange={(event) => setForm({ ...form, sourceUrl: event.target.value })}
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
            checked={form.published}
            onChange={(event) => setForm({ ...form, published: event.target.checked })}
          />
          Published
        </label>

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-form__actions">
          <button type="submit" className="button button--primary" disabled={submitting}>
            {editingId ? 'Save changes' : 'Add quote'}
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
              <th>Text</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td style={{ whiteSpace: 'normal', maxWidth: 320 }}>{quote.text}</td>
                <td>{quote.isOriginal ? 'Original' : quote.author}</td>
                <td>{quote.category?.label || '—'}</td>
                <td>
                  <span className={`admin-badge ${quote.published ? 'admin-badge--active' : ''}`}>
                    {quote.published ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-button-small" onClick={() => startEdit(quote)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-button-small admin-button-small--danger"
                      onClick={() => handleDelete(quote.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={5}>No quotes yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
