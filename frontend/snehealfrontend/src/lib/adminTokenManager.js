const ADMIN_TOKEN_KEY = 'sneheal_admin_token';
const ADMIN_USER_KEY = 'sneheal_admin_user';

/**
 * Decode JWT payload safely without external dependencies
 */
function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decodedJson = atob(payload);
    return JSON.parse(decodedJson);
  } catch {
    return null;
  }
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminUser() {
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAdminSession({ token, user }) {
  if (token) localStorage.setItem(ADMIN_TOKEN_KEY, token);
  if (user) localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

export function hasAdminSession() {
  const token = getAdminToken();
  if (!token) return false;

  const payload = decodeJwt(token);
  if (!payload || !payload.exp) {
    return Boolean(token);
  }

  // Token is valid if current time is before expiry
  return payload.exp * 1000 > Date.now();
}
