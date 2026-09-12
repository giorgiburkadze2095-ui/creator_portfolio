import { useEffect, useState } from 'react';
import { SEO } from '../../components/shared/SEO.js';
import { messagesApi } from '../../api/messages.js';
import { useMessagesContext } from '../../context/MessagesContext.js';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
  { key: 'starred', label: 'Starred' },
  { key: 'archived', label: 'Archived' },
];

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function AdminMessagesPage() {
  const { refreshUnreadCount } = useMessagesContext();
  const [filter, setFilter] = useState('all');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const loadMessages = () => {
    setLoading(true);
    messagesApi
      .list(filter)
      .then(setMessages)
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const openMessage = async (message) => {
    setError('');
    try {
      const full = await messagesApi.getOne(message.id);
      setSelected(full);
      loadMessages();
      refreshUnreadCount();
    } catch (err) {
      setError(err.message || 'Could not open this message.');
    }
  };

  const toggleField = async (message, field) => {
    setError('');
    try {
      const updated = await messagesApi.update(message.id, { [field]: !message[field] });
      if (selected?.id === message.id) setSelected(updated);
      loadMessages();
      refreshUnreadCount();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div>
      <SEO title="Messages" path="/admin/messages" />
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">Messages</h1>
          <p className="admin-panel__description">Submissions from the public contact form.</p>
        </div>
      </div>

      <div className="admin-filter-tabs">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`admin-filter-tab ${filter === item.key ? 'admin-filter-tab--active' : ''}`}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error && <p className="admin-error">{error}</p>}

      {selected && (
        <div className="admin-message-detail">
          <div className="admin-panel__header" style={{ marginBottom: 0 }}>
            <div>
              <strong>{selected.name}</strong>
              <p className="admin-panel__description">
                {selected.email} · {formatDate(selected.createdAt)}
              </p>
            </div>
            <button type="button" className="admin-button-small" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
          <p className="admin-message-detail__text">{selected.message}</p>
          <div className="admin-row-actions">
            <button type="button" className="admin-button-small" onClick={() => toggleField(selected, 'read')}>
              Mark {selected.read ? 'unread' : 'read'}
            </button>
            <button type="button" className="admin-button-small" onClick={() => toggleField(selected, 'starred')}>
              {selected.starred ? 'Unstar' : 'Star'}
            </button>
            <button type="button" className="admin-button-small" onClick={() => toggleField(selected, 'archived')}>
              {selected.archived ? 'Restore from archive' : 'Archive'}
            </button>
          </div>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>From</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr
                key={message.id}
                className={`admin-message-row ${!message.read ? 'admin-message-row--unread' : ''}`}
              >
                <td onClick={() => openMessage(message)}>
                  {!message.read && <span className="admin-badge admin-badge--active">Unread</span>}
                  {message.read && <span className="admin-badge">Read</span>}
                  {message.starred && (
                    <span className="admin-badge admin-badge--active" style={{ marginLeft: 4 }}>
                      Starred
                    </span>
                  )}
                  {message.archived && <span className="admin-badge" style={{ marginLeft: 4 }}>Archived</span>}
                </td>
                <td onClick={() => openMessage(message)}>
                  {message.name}
                  <br />
                  <span style={{ color: 'var(--color-text-faint)', fontWeight: 400 }}>{message.email}</span>
                </td>
                <td onClick={() => openMessage(message)} style={{ whiteSpace: 'normal', maxWidth: 320 }}>
                  {message.message.length > 100 ? `${message.message.slice(0, 100)}…` : message.message}
                </td>
                <td onClick={() => openMessage(message)}>{formatDate(message.createdAt)}</td>
                <td>
                  <div className="admin-row-actions">
                    <button
                      type="button"
                      className="admin-button-small"
                      onClick={() => toggleField(message, 'read')}
                    >
                      {message.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <button
                      type="button"
                      className="admin-button-small"
                      onClick={() => toggleField(message, 'starred')}
                    >
                      {message.starred ? 'Unstar' : 'Star'}
                    </button>
                    <button
                      type="button"
                      className="admin-button-small"
                      onClick={() => toggleField(message, 'archived')}
                    >
                      {message.archived ? 'Restore' : 'Archive'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan={5}>No messages in this view.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
