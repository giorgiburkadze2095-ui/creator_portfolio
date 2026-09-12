import { useState } from 'react';
import { contactApi } from '../../api/contact.js';
import './ContactForm.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: '', email: '', message: '', company: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.message.trim()) {
    errors.message = 'Please enter a message.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [status, setStatus] = useState('idle');

  const updateField = (field) => (event) => setForm({ ...form, [field]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError('');

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus('submitting');
    try {
      await contactApi.submit(form);
      setStatus('success');
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus('idle');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form contact-form--success" role="status">
        <p className="contact-form__success-title">Message sent.</p>
        <p className="contact-form__success-text">
          Thanks for reaching out — I read every message and will get back to you soon.
        </p>
        <button type="button" className="button button--ghost" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real visitors, left for bots to fill in. */}
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="company">Leave this field empty</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={updateField('company')}
        />
      </div>

      <label className="contact-form__field">
        <span>Name</span>
        <input
          className="contact-form__input"
          type="text"
          value={form.name}
          onChange={updateField('name')}
          aria-invalid={!!fieldErrors.name}
        />
        {fieldErrors.name && <span className="contact-form__error">{fieldErrors.name}</span>}
      </label>

      <label className="contact-form__field">
        <span>Email</span>
        <input
          className="contact-form__input"
          type="email"
          value={form.email}
          onChange={updateField('email')}
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && <span className="contact-form__error">{fieldErrors.email}</span>}
      </label>

      <label className="contact-form__field">
        <span>Message</span>
        <textarea
          className="contact-form__textarea"
          value={form.message}
          onChange={updateField('message')}
          aria-invalid={!!fieldErrors.message}
        />
        {fieldErrors.message && <span className="contact-form__error">{fieldErrors.message}</span>}
      </label>

      {serverError && <p className="contact-form__error contact-form__error--server">{serverError}</p>}

      <button type="submit" className="button button--primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
