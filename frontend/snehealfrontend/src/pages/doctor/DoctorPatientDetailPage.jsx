import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import ImagePreviewModal from '../../components/doctor/ImagePreviewModal';
import MedicineOrderCard from '../../components/doctor/MedicineOrderCard';
import PrescriptionGallery from '../../components/doctor/PrescriptionGallery';
import { ApiError } from '../../lib/apiClient';
import { loadPatientChart } from '../../lib/doctorPatientData';
import { downloadReportFile } from '../../lib/doctorService';
import {
  formatDate,
  isReportImage,
  normalizeOrder,
  normalizePrescription,
  normalizeReport,
  patientDisplayName,
  patientInitials,
  patientSubtitle,
} from './doctorUtils';

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'prescriptions', label: 'Prescriptions' },
  { id: 'reports', label: 'Reports' },
];

function KeyValueRows({ entries }) {
  return (
    <dl className="doctor-detail-grid">
      {entries.map(([label, value]) => (
        <div className="doctor-detail-row" key={label}>
          <dt>{label}</dt>
          <dd>{value ?? '—'}</dd>
        </div>
      ))}
    </dl>
  );
}

const DoctorPatientDetailPage = () => {
  const { userId } = useParams();
  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [previewSrc, setPreviewSrc] = useState(null);
  const [previewAlt, setPreviewAlt] = useState('');
  const [reportBusyId, setReportBusyId] = useState(null);

  const normalizedOrders = useMemo(
    () => orders.map(normalizeOrder).filter(Boolean),
    [orders]
  );
  const normalizedPrescriptions = useMemo(
    () => prescriptions.map(normalizePrescription).filter(Boolean),
    [prescriptions]
  );
  const normalizedReports = useMemo(
    () => reports.map(normalizeReport).filter(Boolean),
    [reports]
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      setOrders([]);
      setPrescriptions([]);
      setReports([]);
      setProfile(null);

      try {
        const chart = await loadPatientChart(userId);
        if (cancelled) return;
        setProfile(chart.profile);
        setOrders(chart.orders);
        setPrescriptions(chart.prescriptions);
        setReports(chart.reports);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load patient.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const openPreview = (src, alt) => {
    setPreviewSrc(src);
    setPreviewAlt(alt || 'Preview');
  };

  const handleReportDownload = async (report) => {
    setReportBusyId(report.id);
    setDownloadError('');
    try {
      const blob = await downloadReportFile(userId, report.id);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = report.title || `report-${report.id}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (report.fileUrl) {
        window.open(report.fileUrl, '_blank', 'noopener,noreferrer');
      } else {
        setDownloadError(
          err instanceof ApiError ? err.message : 'Download failed.'
        );
      }
    } finally {
      setReportBusyId(null);
    }
  };

  const handleReportView = (report) => {
    if (isReportImage(report.mimeType, report.fileUrl) && report.fileUrl) {
      openPreview(report.fileUrl, report.title);
      return;
    }
    if (report.fileUrl) {
      window.open(report.fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return <div className="doctor-spinner" role="status" aria-label="Loading patient" />;
  }

  if (error && !profile) {
    return (
      <div>
        <div className="doctor-alert doctor-alert--error" role="alert">{error}</div>
        <Link to="/doctor/patients">← Back to patients</Link>
      </div>
    );
  }

  const title = patientDisplayName(profile);

  return (
    <>
      <p className="mb-md">
        <Link to="/doctor/patients">← Patients</Link>
      </p>

      <div className="doctor-identity-card">
        <div className="doctor-identity-card__avatar" aria-hidden="true">
          {patientInitials(title)}
        </div>
        <div className="doctor-identity-card__body">
          <h1 className="doctor-identity-card__name">{title}</h1>
          <p className="doctor-identity-card__meta">Patient ID {profile?.id || userId}</p>
          {patientSubtitle(profile) && (
            <p className="doctor-identity-card__meta">{patientSubtitle(profile)}</p>
          )}
        </div>
      </div>

      <div className="doctor-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`doctor-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="doctor-alert doctor-alert--error" role="alert">
          {error}
        </div>
      )}

      {downloadError && (
        <div className="doctor-alert doctor-alert--error" role="alert">
          {downloadError}
        </div>
      )}

      {tab === 'profile' && profile && (
        <KeyValueRows
          entries={[
            ['Name', patientDisplayName(profile)],
            ['Phone', profile.phone || profile.phoneMasked],
          ]}
        />
      )}

      {tab === 'orders' && (
        <>
          <p className="doctor-section-hint">Medicines ordered by this patient on Sneheal.</p>
          {normalizedOrders.length === 0 ? (
            <div className="doctor-empty">No orders found.</div>
          ) : (
            <div className="doctor-order-list">
              {normalizedOrders.map((order) => (
                <MedicineOrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'prescriptions' && (
        <>
          <p className="doctor-section-hint">
            Uploaded prescription photos. Tap an image to view full size.
          </p>
          {normalizedPrescriptions.length === 0 ? (
            <div className="doctor-empty">No prescriptions found.</div>
          ) : (
            <PrescriptionGallery
              items={normalizedPrescriptions}
              onOpen={(item) => {
                if (item.imageUrl) {
                  openPreview(item.imageUrl, `Prescription ${formatDate(item.createdAt)}`);
                }
              }}
            />
          )}
        </>
      )}

      {tab === 'reports' && (
        <>
          <p className="doctor-section-hint">Lab reports and health documents.</p>
          {normalizedReports.length === 0 ? (
            <div className="doctor-empty">No health reports found.</div>
          ) : (
            <div className="doctor-list">
              {normalizedReports.map((report) => (
                <div key={report.id} className="doctor-list-item doctor-list-item--actions">
                  <div className="doctor-list-item__content">
                    <div className="doctor-list-item__name">{report.title}</div>
                    <div className="doctor-list-item__meta">
                      {formatDate(report.createdAt)}
                      {isReportImage(report.mimeType, report.fileUrl) ? ' · Image' : ' · PDF'}
                    </div>
                  </div>
                  <div className="doctor-list-item__buttons">
                    <Button
                      type="button"
                      variant="outline"
                      size="small"
                      disabled={!report.fileUrl && reportBusyId === report.id}
                      onClick={() => handleReportView(report)}
                    >
                      View
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="small"
                      disabled={reportBusyId === report.id}
                      onClick={() => handleReportDownload(report)}
                    >
                      {reportBusyId === report.id ? '…' : 'Download'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <ImagePreviewModal
        src={previewSrc}
        alt={previewAlt}
        onClose={() => setPreviewSrc(null)}
      />
    </>
  );
};

export default DoctorPatientDetailPage;
