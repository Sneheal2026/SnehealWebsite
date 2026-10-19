import { dedupeAsync } from './dedupeAsync';
import {
  fetchCustomerDetail,
  fetchCustomerOrders,
  fetchCustomerPrescriptions,
  fetchCustomerReports,
} from './doctorService';
function asArray(data) {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.orders && Array.isArray(data.orders)) return data.orders;
  if (data?.prescriptions && Array.isArray(data.prescriptions)) return data.prescriptions;
  if (data?.reports && Array.isArray(data.reports)) return data.reports;
  return [];
}

/**
 * Load patient profile + orders + prescriptions + reports in one parallel batch (mobile parity).
 * Deduped per userId while in flight.
 */
export function loadPatientChart(userId) {
  const id = encodeURIComponent(String(userId));
  return dedupeAsync(`doctor:patient-chart:${id}`, async () => {
    const [detail, orderData, prescriptionData, reportData] = await Promise.all([
      fetchCustomerDetail(userId),
      fetchCustomerOrders(userId),
      fetchCustomerPrescriptions(userId),
      fetchCustomerReports(userId),
    ]);

    return {
      profile: detail?.customer ?? detail?.user ?? detail,
      orders: asArray(orderData),
      prescriptions: asArray(prescriptionData),
      reports: asArray(reportData),
    };
  });
}
