import { apiRequest } from './apiClient';
import { isTokenExpired, isTokenExpiringSoon } from './jwt';
const ACCESS_TOKEN_KEY = 'sneheal_accessToken';
const REFRESH_TOKEN_KEY = 'sneheal_refreshToken';
const USER_KEY = 'sneheal_user';

let refreshPromise = null;

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveSession({ accessToken, refreshToken, user }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function hasSession() {
  return Boolean(getAccessToken() && getRefreshToken());
}

async function refreshSessionInternal() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  try {
    const data = await apiRequest('/api/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
    });
    saveSession(data);
    return true;
  } catch {
    clearSession();
    return false;
  }
}

export async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = refreshSessionInternal().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

/**
 * Returns a valid access token, refreshing only when expired or expiring soon.
 */
export async function ensureValidAccessToken() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken) {
    return null;
  }

  if (!isTokenExpiringSoon(accessToken)) {
    return accessToken;
  }

  const refreshed = await refreshSession();
  if (refreshed) {
    return getAccessToken();
  }

  if (!isTokenExpired(accessToken)) {
    return accessToken;
  }

  return null;
}

/**
 * App startup: use stored session; refresh only when the access token needs it.
 */
export async function restoreSessionIfNeeded() {
  if (!hasSession()) {
    return null;
  }

  const accessToken = getAccessToken();
  if (accessToken && !isTokenExpiringSoon(accessToken)) {
    return getStoredUser();
  }

  const ok = await refreshSession();
  return ok ? getStoredUser() : null;
}
