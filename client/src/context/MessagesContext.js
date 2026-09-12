import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { messagesApi } from '../api/messages.js';

// Scoped to the admin area only (mounted inside AdminLayout, not at the app
// root) so it never fires an authenticated request from the public site.
const MessagesContext = createContext({ unreadCount: 0, refreshUnreadCount: () => {} });

export function MessagesProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = useCallback(() => {
    messagesApi
      .unreadCount()
      .then(({ count }) => setUnreadCount(count))
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshUnreadCount();
  }, [refreshUnreadCount]);

  const value = useMemo(() => ({ unreadCount, refreshUnreadCount }), [unreadCount, refreshUnreadCount]);

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export function useMessagesContext() {
  return useContext(MessagesContext);
}
