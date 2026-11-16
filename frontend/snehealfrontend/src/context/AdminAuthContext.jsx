import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  adminLogin as performLogin,
  adminLogout as performLogout,
  getAdminUser,
  hasAdminSession,
} from '../lib/adminAuthService';
import { setAdminUnauthorizedHandler } from '../lib/adminApiClient';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionError, setSessionError] = useState('');

  // Logout callback
  const logout = useCallback((reason = '') => {
    performLogout();
    setAdminUser(null);
    if (reason) {
      setSessionError(reason);
    }
  }, []);

  // Initialize session on mount
  useEffect(() => {
    // Register global 401 unauthorized handler
    setAdminUnauthorizedHandler(() => {
      logout('Your session has expired. Please sign in again.');
    });

    if (hasAdminSession()) {
      const stored = getAdminUser();
      setAdminUser(stored);
    } else {
      performLogout();
      setAdminUser(null);
    }
    setIsLoading(false);
  }, [logout]);

  const login = useCallback(async (username, password) => {
    setSessionError('');
    const user = await performLogin(username, password);
    setAdminUser(user);
    return user;
  }, []);

  const value = useMemo(
    () => ({
      adminUser,
      isAuthenticated: Boolean(adminUser && hasAdminSession()),
      isLoading,
      sessionError,
      login,
      logout,
    }),
    [adminUser, isLoading, sessionError, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return ctx;
}
