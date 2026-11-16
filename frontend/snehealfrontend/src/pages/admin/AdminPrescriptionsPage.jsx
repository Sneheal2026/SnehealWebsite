import React, { useEffect, useState, useMemo } from 'react';
import {
  fetchAdminPrescriptions,
  getCachedAdminPrescriptions,
} from '../../lib/adminAuthService';
import {
  FiFileText,
  FiSearch,
  FiRefreshCw,
  FiPhone,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiShoppingBag,
  FiEye,
  FiX,
  FiDownload,
  FiRotateCw,
  FiAlertCircle,
} from 'react-icons/fi';

const AdminPrescriptionsPage = () => {
  const initialPrescriptions = getCachedAdminPrescriptions();
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions || []);
  const [loading, setLoading] = useState(!initialPrescriptions);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState('');

  // Modal inspection state
  const [activeModalRx, setActiveModalRx] = useState(null);
  const [rotation, setRotation] = useState(0);

  const loadPrescriptions = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setError('');

    try {
      const data = await fetchAdminPrescriptions(isManualRefresh);
      setPrescriptions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch customer prescriptions from SnehealApp2026.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!initialPrescriptions) {
      loadPrescriptions(false);
    }
  }, [initialPrescriptions]);

  // Reset pagination when search changes
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery]);

  const openModal = (rx) => {
    setActiveModalRx(rx);
    setRotation(0);
  };

  const closeModal = () => {
    setActiveModalRx(null);
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Filtered prescriptions list (in-memory, 0 API calls)
  const filteredPrescriptions = useMemo(() => {
    if (!searchQuery.trim()) return prescriptions;
    const query = searchQuery.toLowerCase().trim();
    return prescriptions.filter((rx) => {
      const idMatch = (rx.publicId || '').toLowerCase().includes(query);
      const nameMatch = (rx.customer?.name || '').toLowerCase().includes(query);
      const phoneMatch = (rx.customer?.phone || '').includes(query);
      const addrMatch = (rx.customer?.primaryAddress || '').toLowerCase().includes(query);
      return idMatch || nameMatch || phoneMatch || addrMatch;
    });
  }, [prescriptions, searchQuery]);

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.4rem', color: '#0B2545', fontWeight: 800 }}>
            Customer Prescriptions Desk
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>
            Review customer-uploaded prescription scans, medical documents, and patient profile details.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadPrescriptions(true)}
          disabled={refreshing || loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            color: '#334155',
            cursor: refreshing ? 'not-allowed' : 'pointer',
          }}
        >
          <FiRefreshCw className={refreshing ? 'admin-spin' : ''} size={15} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Prescriptions'}</span>
        </button>
      </div>

      {error && (
        <div className="admin-alert-error" role="alert">
          <FiAlertCircle style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="admin-search-bar">
        <FiSearch color="#94A3B8" size={18} />
        <input
          type="text"
          className="admin-search-input"
          placeholder="Search by customer name, phone, address, or Rx ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
          >
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="admin-panel" style={{ textAlign: 'center', padding: '40px 20px', color: '#64748B' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid #E2E8F0',
              borderTopColor: '#10B981',
              borderRadius: '50%',
              animation: 'admin-spin 0.8s linear infinite',
              margin: '0 auto 12px',
            }}
          />
          <p style={{ margin: 0, fontSize: '0.92rem' }}>Loading prescription documents from SnehealApp2026...</p>
        </div>
      ) : filteredPrescriptions.length === 0 ? (
        /* Empty State */
        <div className="admin-panel" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
            }}
          >
            <FiFileText size={28} />
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: '#0F172A', fontWeight: 700 }}>
            No Prescriptions Found
          </h3>
          <p style={{ margin: '0 auto 16px', maxWidth: '420px', color: '#64748B', fontSize: '0.88rem' }}>
            {searchQuery
              ? `No prescriptions match the search query "${searchQuery}".`
              : 'There are currently no customer prescription uploads in the database.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                color: '#334155',
                fontWeight: 600,
              }}
            >
              Clear Search Filter
            </button>
          )}
        </div>
      ) : (
        /* Prescriptions List */
        <div>
          {filteredPrescriptions.slice(0, visibleCount).map((rx) => {
            return (
              <div key={rx.id} className="admin-doctor-card">
                <div className="admin-doctor-card__header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.88rem',
                        }}
                      >
                        {rx.publicId}
                      </span>

                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: '#E0F2FE',
                          color: '#0284C7',
                          padding: '4px 10px',
                          borderRadius: '999px',
                        }}
                      >
                        Prescription Scan
                      </span>
                    </div>

                    <div className="admin-doctor-meta" style={{ marginTop: '8px' }}>
                      {rx.uploadedAt && (
                        <span>
                          <FiCalendar size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          Uploaded on: {new Date(rx.uploadedAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customer Who Saved It Information Box */}
                <div className="admin-clinic-box">
                  <div className="admin-clinic-box__title">
                    <FiUser size={15} color="#059669" />
                    <span>Customer Details (Saved by)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0F172A' }}>
                        {rx.customer.name}
                      </span>

                      {rx.customer.phone && (
                        <a
                          href={`tel:${rx.customer.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#0284C7',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.88rem',
                          }}
                        >
                          <FiPhone size={13} />
                          <span>{rx.customer.phone}</span>
                        </a>
                      )}

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: '#F1F5F9',
                          color: '#475569',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <FiShoppingBag size={11} />
                        {rx.customer.orderCount} Orders Placed
                      </span>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: '#ECFDF5',
                          color: '#047857',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {rx.customer.totalPrescriptions} Total Uploads
                      </span>
                    </div>

                    {/* Customer Address */}
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                      <FiMapPin size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      <span>{rx.customer.primaryAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Thumbnail Preview and Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                    paddingTop: '8px',
                  }}
                >
                  <div
                    onClick={() => openModal(rx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '8px',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    <img
                      src={rx.imageUrl}
                      alt={`Prescription ${rx.publicId}`}
                      style={{
                        width: '56px',
                        height: '56px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0F172A' }}>
                        Click to Inspect Prescription Scan
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        High-resolution document viewer
                      </div>
                    </div>
                  </div>

                  <div className="admin-action-row" style={{ paddingTop: 0, borderTop: 'none' }}>
                    <button
                      type="button"
                      onClick={() => openModal(rx)}
                      className="admin-btn-doc"
                      style={{ border: '1.5px solid #0B2545', color: '#0B2545' }}
                    >
                      <FiEye size={14} />
                      <span>Inspect Document</span>
                    </button>

                    <a
                      href={rx.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn-doc"
                      title="Open full resolution in new tab"
                    >
                      <FiDownload size={14} />
                      <span>Direct Link</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Show More Pagination (10 at a time) */}
          {filteredPrescriptions.length > visibleCount && (
            <div style={{ textAlign: 'center', marginTop: '24px', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 10)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease',
                }}
              >
                Show More Prescriptions ({filteredPrescriptions.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filteredPrescriptions.length > 10 && visibleCount >= filteredPrescriptions.length && (
            <div style={{ textAlign: 'center', marginTop: '18px', color: '#94A3B8', fontSize: '0.85rem' }}>
              Showing all {filteredPrescriptions.length} prescriptions
            </div>
          )}
        </div>
      )}

      {/* Prescription Inspection Modal */}
      {activeModalRx && (
        <div className="admin-modal-backdrop" onClick={closeModal}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: '800px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">
                  Prescription Document: {activeModalRx.publicId}
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Uploaded by: <strong>{activeModalRx.customer.name}</strong> ({activeModalRx.customer.phone})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleRotate}
                  className="admin-btn-doc"
                  style={{ padding: '6px 12px' }}
                  title="Rotate image 90 degrees"
                >
                  <FiRotateCw size={14} />
                  <span>Rotate</span>
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                  }}
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <div
              className="admin-modal-body"
              style={{
                backgroundColor: '#0F172A',
                overflow: 'auto',
                minHeight: '380px',
              }}
            >
              <img
                src={activeModalRx.imageUrl}
                alt={activeModalRx.publicId}
                style={{
                  maxWidth: '100%',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  borderRadius: '6px',
                  transform: `rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                }}
              />
            </div>

            <div
              className="admin-modal-footer"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                Uploaded on: {new Date(activeModalRx.uploadedAt).toLocaleString()}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={activeModalRx.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn-doc"
                >
                  <FiDownload size={14} />
                  <span>Open Full Size</span>
                </a>

                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    backgroundColor: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    color: '#334155',
                    borderRadius: '6px',
                    padding: '8px 18px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrescriptionsPage;
