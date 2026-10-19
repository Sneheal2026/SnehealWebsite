export function patientDisplayName(patient) {
  if (!patient) return 'Patient';
  return (
    patient.username ||
    patient.name ||
    patient.fullName ||
    patient.phone ||
    patient.id ||
    'Patient'
  );
}

export function patientSubtitle(patient) {
  if (!patient) return '';
  const parts = [];
  if (patient.phone) parts.push(patient.phone);
  if (patient.phoneMasked && !patient.phone) parts.push(patient.phoneMasked);
  return parts.join(' · ');
}

export function asArray(data) {
  if (Array.isArray(data)) return data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  if (data?.orders && Array.isArray(data.orders)) return data.orders;
  if (data?.prescriptions && Array.isArray(data.prescriptions)) return data.prescriptions;
  if (data?.reports && Array.isArray(data.reports)) return data.reports;
  if (data?.patients && Array.isArray(data.patients)) return data.patients;
  if (data?.customers && Array.isArray(data.customers)) return data.customers;
  return [];
}

export function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function normalizeOrder(order) {
  if (!order) return null;
  const rawItems = order.items || order.orderItems || order.lines || [];
  return {
    id: String(order.id ?? ''),
    publicId: order.publicId || order.public_id || `SNH-${order.id}`,
    status: order.status || '',
    createdAt: order.createdAt || order.created_at,
    items: rawItems.map((item) => ({
      name: item.name || item.medicineName || item.productName || 'Medicine',
      quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
    })),
  };
}

export function normalizePrescription(rx) {
  if (!rx) return null;
  return {
    id: String(rx.id ?? ''),
    imageUrl: rx.imageUrl || rx.image_url || '',
    createdAt: rx.createdAt || rx.created_at,
  };
}

export function normalizeReport(report) {
  if (!report) return null;
  return {
    id: String(report.id ?? report.reportId ?? ''),
    title: report.title || report.name || 'Health report',
    fileUrl: report.fileUrl || report.file_url || '',
    mimeType: report.mimeType || report.mime_type || '',
    createdAt: report.createdAt || report.created_at,
  };
}

export function orderStatusLabel(status) {
  const s = String(status || '').toLowerCase();
  if (s === 'delivered') return 'Delivered';
  if (s === 'out_for_delivery') return 'Out for delivery';
  if (s === 'confirmed') return 'Confirmed';
  if (s === 'cancelled') return 'Cancelled';
  return s.replace(/_/g, ' ') || '—';
}

export function orderStatusClass(status) {
  const s = String(status || '').toLowerCase();
  if (s === 'delivered') return 'doctor-status--done';
  if (s === 'cancelled') return 'doctor-status--muted';
  return 'doctor-status--active';
}

export function isReportImage(mimeType, fileUrl) {
  const mime = String(mimeType || '').toLowerCase();
  if (mime.startsWith('image/')) return true;
  const url = String(fileUrl || '').toLowerCase();
  return /\.(jpe?g|png|gif|webp)(\?|$)/i.test(url);
}

export function patientInitials(name) {
  return (
    String(name || '')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('') || 'P'
  );
}
