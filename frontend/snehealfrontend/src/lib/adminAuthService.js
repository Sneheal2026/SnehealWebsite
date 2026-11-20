import { adminApiRequest, adminGetRequest } from './adminApiClient';
import {
  saveAdminSession,
  clearAdminSession,
  getAdminUser,
  hasAdminSession,
} from './adminTokenManager';

let cachedStats = null;
let lastStatsFetchTime = 0;
const STATS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes client cache

let cachedDoctors = null;
let lastDoctorsFetchTime = 0;
const DOCTORS_CACHE_TTL = 3 * 60 * 1000; // 3 minutes client cache

let cachedAgents = null;
let lastAgentsFetchTime = 0;
const AGENTS_CACHE_TTL = 3 * 60 * 1000; // 3 minutes client cache

let cachedOrders = null;
let lastOrdersFetchTime = 0;
const ORDERS_CACHE_TTL = 2 * 60 * 1000; // 2 minutes client cache

let cachedPrescriptions = null;
let lastPrescriptionsFetchTime = 0;
const PRESCRIPTIONS_CACHE_TTL = 3 * 60 * 1000; // 3 minutes client cache

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
  cachedStats = null;
  lastStatsFetchTime = 0;
  cachedDoctors = null;
  lastDoctorsFetchTime = 0;
  cachedAgents = null;
  lastAgentsFetchTime = 0;
  cachedOrders = null;
  lastOrdersFetchTime = 0;
  cachedPrescriptions = null;
  lastPrescriptionsFetchTime = 0;
  clearAdminSession();
}

/**
 * Fetch overview statistics for the admin dashboard.
 * Uses cached data to prevent unnecessary API calls unless forceRefresh=true.
 */
export async function fetchAdminStats(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedStats && now - lastStatsFetchTime < STATS_CACHE_TTL) {
    return cachedStats;
  }
  const data = await adminGetRequest('/api/admin/overview-stats');
  cachedStats = data;
  lastStatsFetchTime = now;
  return data;
}

/**
 * Synchronously get existing cached stats if any
 */
export function getCachedAdminStats() {
  return cachedStats;
}

/**
 * Fetch doctors with client caching to prevent unnecessary repeat calls
 */
export async function fetchAdminDoctors(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedDoctors && now - lastDoctorsFetchTime < DOCTORS_CACHE_TTL) {
    return cachedDoctors;
  }
  const data = await adminGetRequest('/api/admin/doctors');
  cachedDoctors = Array.isArray(data) ? data : [];
  lastDoctorsFetchTime = now;
  return cachedDoctors;
}

/**
 * Synchronously get cached doctors if already fetched
 */
export function getCachedAdminDoctors() {
  return cachedDoctors;
}

/**
 * Update doctor verification status ('approved', 'rejected', 'pending').
 * Optimistically updates client-side cache to avoid a full refetch!
 */
export async function updateAdminDoctorStatus(userId, status) {
  const result = await adminApiRequest(`/api/admin/doctors/${userId}/status`, {
    method: 'PATCH',
    body: { status },
  });

  if (cachedDoctors) {
    cachedDoctors = cachedDoctors.map((doc) =>
      doc.id === String(userId) ? { ...doc, verificationStatus: status } : doc
    );
  }

  cachedStats = null;
  return result;
}

/**
 * Fetch delivery agents with client caching (lightweight, zero base64 payload)
 */
export async function fetchAdminDeliveryAgents(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedAgents && now - lastAgentsFetchTime < AGENTS_CACHE_TTL) {
    return cachedAgents;
  }
  const data = await adminGetRequest('/api/admin/agents');
  cachedAgents = Array.isArray(data) ? data : [];
  lastAgentsFetchTime = now;
  return cachedAgents;
}

/**
 * Synchronously get cached agents if already fetched
 */
export function getCachedAdminDeliveryAgents() {
  return cachedAgents;
}

/**
 * Fetch a specific KYC document on-demand (Aadhar or License)
 */
export async function fetchAdminDeliveryAgentDocument(userId, docType) {
  return adminGetRequest(`/api/admin/agents/${userId}/document/${docType}`);
}

/**
 * Update delivery agent verification status ('approved', 'rejected', 'pending')
 */
export async function updateAdminDeliveryAgentStatus(userId, status) {
  const result = await adminApiRequest(`/api/admin/agents/${userId}/status`, {
    method: 'PATCH',
    body: { status },
  });

  if (cachedAgents) {
    cachedAgents = cachedAgents.map((agent) =>
      agent.id === String(userId) ? { ...agent, verificationStatus: status } : agent
    );
  }

  cachedStats = null;
  return result;
}

/**
 * Fetch orders list with client caching
 */
export async function fetchAdminOrders(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedOrders && now - lastOrdersFetchTime < ORDERS_CACHE_TTL) {
    return cachedOrders;
  }
  const data = await adminGetRequest('/api/admin/orders');
  cachedOrders = Array.isArray(data) ? data : [];
  lastOrdersFetchTime = now;
  return cachedOrders;
}

/**
 * Synchronously get cached orders if already fetched
 */
export function getCachedAdminOrders() {
  return cachedOrders;
}

/**
 * Fetch detailed order breakdown with items & delivery agent info on-demand
 */
export async function fetchAdminOrderDetails(orderId) {
  return adminGetRequest(`/api/admin/orders/${orderId}`);
}

/**
 * Update order status ('confirmed', 'out_for_delivery', 'delivered', 'cancelled')
 */
export async function updateAdminOrderStatus(orderId, status) {
  const result = await adminApiRequest(`/api/admin/orders/${orderId}/status`, {
    method: 'PATCH',
    body: { status },
  });

  if (cachedOrders) {
    cachedOrders = cachedOrders.map((ord) =>
      ord.id === String(orderId) || ord.publicId === String(orderId)
        ? {
            ...ord,
            status,
            deliveredAt: status === 'delivered' ? new Date().toISOString() : ord.deliveredAt,
          }
        : ord
    );
  }

  cachedStats = null;
  return result;
}

/**
 * Update order prescription status ('verified', 'rejected', 'pending_verification')
 */
export async function updateAdminOrderPrescriptionStatus(orderId, status, reason = null) {
  const result = await adminApiRequest(`/api/admin/orders/${orderId}/prescription-status`, {
    method: 'PATCH',
    body: { status, reason },
  });

  if (cachedOrders) {
    cachedOrders = cachedOrders.map((ord) =>
      ord.id === String(orderId) || ord.publicId === String(orderId)
        ? {
            ...ord,
            prescriptionStatus: status,
            prescriptionRejectedReason: reason,
          }
        : ord
    );
  }

  return result;
}

/**
 * Fetch prescriptions list with client caching
 */
export async function fetchAdminPrescriptions(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedPrescriptions && now - lastPrescriptionsFetchTime < PRESCRIPTIONS_CACHE_TTL) {
    return cachedPrescriptions;
  }
  const data = await adminGetRequest('/api/admin/prescriptions');
  cachedPrescriptions = Array.isArray(data) ? data : [];
  lastPrescriptionsFetchTime = now;
  return cachedPrescriptions;
}

/**
 * Synchronously get cached prescriptions if already fetched
 */
export function getCachedAdminPrescriptions() {
  return cachedPrescriptions;
}

/**
 * Fetch current authenticated admin user profile
 */
export async function fetchAdminProfile() {
  return adminGetRequest('/api/admin/auth/me');
}

export { getAdminUser, hasAdminSession };
