import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { logout as clearAuth } from '../lib/authService';
import { getStoredUser, hasSession, restoreSessionIfNeeded } from '../lib/authTokenManager';
import { dedupeAsync } from '../lib/dedupeAsync';

const DoctorAuthContext = createContext(null);

export function DoctorAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (!hasSession()) {
        if (!cancelled) {
          setUser(null);
          setBootstrapping(false);
        }
        return;
      }

      const stored = getStoredUser();
      if (stored) {
        setUser(stored);
      }

      try {
        await dedupeAsync('doctor:auth-bootstrap', () => restoreSessionIfNeeded());
        if (!cancelled) {
          setUser(getStoredUser());
        }
      } catch {
        if (!cancelled) {
          setUser(getStoredUser());
        }
      } finally {
        if (!cancelled) {
          setBootstrapping(false);
        }
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      bootstrapping,
      isAuthenticated: Boolean(user && hasSession()),
      logout,
    }),
    [user, bootstrapping, logout]
  );

  return (
    <DoctorAuthContext.Provider value={value}>{children}</DoctorAuthContext.Provider>
  );
}

export function useDoctorAuth() {
  const ctx = useContext(DoctorAuthContext);
  if (!ctx) {
    throw new Error('useDoctorAuth must be used within DoctorAuthProvider');
  }
  return ctx;
}
