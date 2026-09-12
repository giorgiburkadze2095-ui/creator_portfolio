import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { user: loggedInUser } = await authApi.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const setupPassword = useCallback(async (token, password) => {
    const { user: loggedInUser } = await authApi.setupPassword(token, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {});
    setUser(null);
  }, []);

  // Called after a self-service profile/password update so the nav, admin
  // topbar, etc. reflect the new name/email without a full reload.
  const updateSelf = useCallback((updatedUser) => {
    setUser(updatedUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      setupPassword,
      updateSelf,
      isAuthenticated: !!user,
      isSuperAdmin: user?.role === 'SUPER_ADMIN',
    }),
    [user, loading, login, logout, setupPassword, updateSelf],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
