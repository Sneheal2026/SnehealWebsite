import { authenticatedApiRequest, authenticatedBlobRequest } from './apiClient';

export function fetchEngagedPatients() {
  return authenticatedApiRequest('/api/doctor/patients');
}

export function searchCustomers(query) {
  const q = encodeURIComponent(query.trim());
  return authenticatedApiRequest(`/api/doctor/customers?q=${q}`);
}

export function fetchCustomerDetail(userId) {
  return authenticatedApiRequest(`/api/doctor/customers/${userId}`);
}

export function fetchCustomerOrders(userId) {
  return authenticatedApiRequest(`/api/doctor/customers/${userId}/orders`);
}

export function fetchCustomerPrescriptions(userId) {
  return authenticatedApiRequest(`/api/doctor/customers/${userId}/prescriptions`);
}

export function fetchCustomerReports(userId) {
  return authenticatedApiRequest(`/api/doctor/customers/${userId}/reports`);
}

export function downloadReportFile(userId, reportId) {
  return authenticatedBlobRequest(
    `/api/doctor/customers/${userId}/reports/${reportId}/file`
  );
}
