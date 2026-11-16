import { adminApiRequest, adminGetRequest } from './adminApiClient';
import {
  saveAdminSession,
  clearAdminSession,
  getAdminUser,
  hasAdminSession,
} from './adminTokenManager';

/**
 * Sign in admin user with username & password
 */
export async function adminLogin(username, password) {
  const cleanUsername = String(username || '').trim();
  const cleanPassword = String(password || '');

  if (!cleanUsername || !cleanPassword) {
    throw new Error('Username and password are required');
  }

  const data = await adminApiRequest('/api/admin/auth/login', {
    method: 'POST',
    body: {
      username: cleanUsername,
      password: cleanPassword,
    },
  });

  if (data?.token && data?.user) {
    saveAdminSession({
      token: data.token,
      user: data.user,
    });
    return data.user;
  }

  throw new Error('Malformed authentication response from server');
}

/**
 * Sign out admin user
 */
export function adminLogout() {
  clearAdminSession();
}

/**
 * Fetch overview statistics for the admin dashboard
 */
export async function fetchAdminStats() {
  return adminGetRequest('/api/admin/overview-stats');
}

/**
 * Fetch current authenticated admin user profile
 */
export async function fetchAdminProfile() {
  return adminGetRequest('/api/admin/auth/me');
}

export { getAdminUser, hasAdminSession };
