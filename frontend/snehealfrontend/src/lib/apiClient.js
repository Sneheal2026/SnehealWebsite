import { getApiBaseUrl } from './apiConfig';
import { dedupeAsync } from './dedupeAsync';
import {
  ensureValidAccessToken,
  getAccessToken,
  refreshSession,
  clearSession,
} from './authTokenManager';

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message || 'Something went wrong');
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseJsonResponse(response) {
  const text = await response.text();
  if (!text) {
    return { success: response.ok, message: '', data: undefined };
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError('Invalid server response', response.status);
  }
}

function unwrapEnvelope(body, status) {
  if (body.success === false) {
    throw new ApiError(body.message || 'Request failed', status);
  }
  if (status >= 400) {
    throw new ApiError(body.message || 'Request failed', status);
  }
  if (body.success === true) {
    return body.data;
  }
  return body.data;
}

export async function apiRequest(path, options = {}) {
  const { headers: extraHeaders, body, ...rest } = options;
  const headers = {
    Accept: 'application/json',
    ...extraHeaders,
  };

  if (body !== undefined && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...rest,
    headers,
    body:
      body !== undefined && !(body instanceof FormData) && typeof body !== 'string'
        ? JSON.stringify(body)
        : body,
  });

  const json = await parseJsonResponse(response);

  if (!response.ok && json.success !== false) {
    throw new ApiError(json.message || response.statusText, response.status);
  }

  return unwrapEnvelope(json, response.status);
}

async function authenticatedApiRequestOnce(path, options = {}, isRetry = false) {
  const token = isRetry ? getAccessToken() : await ensureValidAccessToken();
  if (!token) {
    clearSession();
    throw new ApiError('Session expired. Please sign in again.', 401);
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  try {
    return await apiRequest(path, { ...options, headers });
  } catch (err) {
    if (err instanceof ApiError && err.status === 401 && !isRetry) {
      const refreshed = await refreshSession();
      if (refreshed) {
        return authenticatedApiRequestOnce(path, options, true);
      }
      clearSession();
    }
    throw err;
  }
}

export async function authenticatedApiRequest(path, options = {}, isRetry = false) {
  const method = (options.method || 'GET').toUpperCase();
  if (!isRetry && method === 'GET') {
    return dedupeAsync(`GET:${path}`, () => authenticatedApiRequestOnce(path, options, false));
  }
  return authenticatedApiRequestOnce(path, options, isRetry);
}

export async function authenticatedBlobRequest(path, options = {}, isRetry = false) {
  const token = isRetry ? getAccessToken() : await ensureValidAccessToken();
  if (!token) {
    clearSession();
    throw new ApiError('Session expired. Please sign in again.', 401);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401 && !isRetry) {
    const refreshed = await refreshSession();
    if (refreshed) {
      return authenticatedBlobRequest(path, options, true);
    }
    clearSession();
    throw new ApiError('Session expired. Please sign in again.', 401);
  }

  if (!response.ok) {
    const json = await parseJsonResponse(response);
    throw new ApiError(json.message || 'Download failed', response.status);
  }

  return response.blob();
}
