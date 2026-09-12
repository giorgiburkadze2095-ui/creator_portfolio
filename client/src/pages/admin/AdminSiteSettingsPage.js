import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { siteSettingsApi } from '../../api/siteSettings.js';

const FIELD_GROUPS = [
  {
    title: 'Homepage hero',
    fields: [
      { key: 'heroTagline', label: 'Eyebrow tagline', type: 'text' },
      { key: 'heroTitle', label: 'Hero title', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero subtitle', type: 'textarea' },
      { key: 'personalStatement', label: 'Personal statement', type: 'textarea' },
    ],
  },
  {
    title: 'About page',
    fields: [
      { key: 'aboutIntro', label: 'Who I am', type: 'textarea' },
      { key: 'aboutStory', label: 'My story', type: 'textarea' },
      { key: 'aboutInterests', label: 'What I care about', type: 'textarea' },
      { key: 'aboutFitnessJourney', label: 'Fitness journey', type: 'textarea' },
      { key: 'aboutMusicJourney', label: 'Music journey', type: 'textarea' },
      { key: 'aboutPhilosophy', label: 'Philosophy', type: 'textarea' },
      { key: 'collaborationInfo', label: 'Collaboration info', type: 'textarea' },
    ],
  },
  {
    title: 'Work with me',
    fields: [
      { key: 'workWithMeDescription', label: 'Collaboration description', type: 'textarea' },
      { key: 'contactEmail', label: 'Contact email', type: 'email' },
      { key: 'contactUrl', label: 'Contact form URL (optional)', type: 'url' },
    ],
  },
  {
    title: 'Homepage CTA & footer',
    fields: [
      { key: 'ctaTitle', label: 'CTA title', type: 'text' },
      { key: 'ctaText', label: 'CTA text', type: 'textarea' },
      { key: 'footerText', label: 'Footer tagline', type: 'text' },
    ],
  },
];

export function AdminSiteSettingsPage() {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    siteSettingsApi.adminGet().then(setForm).catch(() => setForm({}));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');
    setSubmitting(true);
    try {
      const updated = await siteSettingsApi.update(form);
      setForm(updated);
      setStatus('Saved.');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!form) {
    return <p>Loading…</p>;
  }

  return (
    <div>
      <SEO title="Site Content" path="/admin/site-settings" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Site Content</h1>
          <p className="admin-panel__description">
            Everything editable on the homepage, About page, and footer lives here.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {FIELD_GROUPS.map((group) => (
          <fieldset key={group.title} className="admin-form admin-form--grid-2">
            <legend className="admin-panel__title" style={{ fontSize: '1.1rem', marginBottom: 'var(--space-2)' }}>
              {group.title}
            </legend>
            {group.fields.map((field) => (
              <label
                key={field.key}
                className={`admin-field ${field.type === 'textarea' ? 'admin-field--span-2' : ''}`}
              >
                <span>{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    className="admin-textarea"
                    value={form[field.key] || ''}
                    onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                  />
                ) : (
                  <input
                    className="admin-input"
                    type={field.type}
                    value={form[field.key] || ''}
                    onChange={(event) => setForm({ ...form, [field.key]: event.target.value })}
                  />
                )}
              </label>
            ))}
          </fieldset>
        ))}

        {error && <p className="admin-error">{error}</p>}
        {status && <p style={{ color: 'var(--color-success)' }}>{status}</p>}

        <button type="submit" className="button button--primary" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
