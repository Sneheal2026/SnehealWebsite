import { apiRequest, authenticatedApiRequest } from './apiClient';
import {
  saveSession,
  clearSession,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
} from './authTokenManager';

/**
 * @returns {Promise<{ resendAfterSeconds?: number, devOtp?: string }|undefined>}
 */
export async function sendOtp(phone) {
  return apiRequest('/api/auth/send-otp', {
    method: 'POST',
    body: { phone },
  });
}

/** OTP returned by send-otp in dev/staging (mirrors mobile `getOtp` helper). */
export function getOtpFromSendOtpResponse(sendOtpData) {
  const value = sendOtpData?.devOtp ?? sendOtpData?.otp;
  if (value === undefined || value === null || value === '') {
    return null;
  }
  return String(value).replace(/\D/g, '').slice(0, 6);
}

export async function verifyOtp(phone, otp) {
  const data = await apiRequest('/api/auth/verify-otp', {
    method: 'POST',
    body: { phone, otp },
  });
  saveSession(data);
  return data;
}

export async function completeRegistration(payload) {
  const data = await authenticatedApiRequest('/api/auth/complete-registration', {
    method: 'POST',
    body: payload,
  });

  if (data?.accessToken) {
    saveSession(data);
    return data.user ?? data;
  }

  const user = data?.user ?? data;
  const previous = getStoredUser() || {};
  const merged = {
    ...previous,
    ...user,
    role: 'doctor',
    profileCompleted: true,
  };
  saveSession({
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    user: merged,
  });
  return merged;
}

export function logout() {
  clearSession();
}
