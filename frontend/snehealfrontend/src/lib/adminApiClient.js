import { getApiBaseUrl } from './apiConfig';
import { getAdminToken, clearAdminSession } from './adminTokenManager';
import { dedupeAsync } from './dedupeAsync';

export class AdminApiError extends Error {
  constructor(message, status = 0) {
    super(message || 'Admin request failed');
    this.name = 'AdminApiError';
    this.status = status;
  }
}

// Global listener for 401 events to trigger smooth logout
let unauthorizedHandler = null;

export function setAdminUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export async function adminApiRequest(path, options = {}) {
  const { headers: extraHeaders, body, ...rest } = options;
  const token = getAdminToken();

  const headers = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const url = `${getApiBaseUrl()}${path}`;

  try {
    const response = await fetch(url, {
      ...rest,
      headers,
      body:
        body !== undefined && !(body instanceof FormData) && typeof body !== 'string'
          ? JSON.stringify(body)
          : body,
    });

    // Handle 401 Unauthorized globally
    if (response.status === 401) {
      clearAdminSession();
      if (typeof unauthorizedHandler === 'function') {
        unauthorizedHandler();
      }
      throw new AdminApiError('Your admin session has expired. Please sign in again.', 401);
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      throw new AdminApiError('Access denied: Admin privileges required.', 403);
    }

    const text = await response.text();
    let json = {};
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        throw new AdminApiError('Invalid server response format', response.status);
      }
    }

    if (!response.ok || json.success === false) {
      throw new AdminApiError(json.message || 'Request failed', response.status);
    }

    return json.data !== undefined ? json.data : json;
  } catch (err) {
    if (err instanceof AdminApiError) throw err;
    throw new AdminApiError(err.message || 'Network error occurred', 0);
  }
}

/**
 * Deduplicated GET request to prevent duplicate/unnecessary API calls
 */
export async function adminGetRequest(path) {
  return dedupeAsync(`admin:${path}`, () => adminApiRequest(path, { method: 'GET' }));
}
