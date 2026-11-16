import React, { useEffect, useState, useMemo } from 'react';
import {
  fetchAdminDoctors,
  getCachedAdminDoctors,
  updateAdminDoctorStatus,
} from '../../lib/adminAuthService';
import {
  FiUserCheck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiRefreshCw,
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiAlertCircle,
  FiX,
} from 'react-icons/fi';

const AdminDoctorsPage = () => {
  const initialDoctors = getCachedAdminDoctors();
  const [doctors, setDoctors] = useState(initialDoctors || []);
  const [loading, setLoading] = useState(!initialDoctors);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('pending'); // default to pending queue
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset pagination when active tab or search changes
  useEffect(() => {
    setVisibleCount(10);
  }, [activeTab, searchQuery]);

  const loadDoctors = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setError('');

    try {
      const data = await fetchAdminDoctors(isManualRefresh);
      setDoctors(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch doctor applications from SnehealApp2026.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!initialDoctors) {
      loadDoctors(false);
    }
  }, [initialDoctors]);

  const handleStatusChange = async (userId, doctorName, newStatus) => {
    if (updatingId) return;
    setUpdatingId(userId);
    setError('');

    try {
      await updateAdminDoctorStatus(userId, newStatus);
      // Optimistically update local state immediately
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === String(userId) ? { ...doc, verificationStatus: newStatus } : doc
        )
      );

      const actionText =
        newStatus === 'approved'
          ? 'approved successfully'
          : newStatus === 'rejected'
          ? 'marked as rejected'
          : 'moved to pending';
      setToastMessage(`${doctorName} has been ${actionText}.`);

      // Auto dismiss toast after 4 seconds
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      setError(err.message || `Failed to update status for ${doctorName}.`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: doctors.length,
      pending: doctors.filter((d) => d.verificationStatus === 'pending').length,
      approved: doctors.filter((d) => d.verificationStatus === 'approved').length,
      rejected: doctors.filter((d) => d.verificationStatus === 'rejected').length,
    };
  }, [doctors]);

  // Filtered doctors list (100% in-memory calculation, zero API calls!)
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // Tab filter
      if (activeTab !== 'all' && doc.verificationStatus !== activeTab) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (doc.username || '').toLowerCase().includes(query);
        const phoneMatch = (doc.phone || '').includes(query);
        const cityMatch = (doc.clinic?.city || '').toLowerCase().includes(query);
        const idMatch = (doc.publicId || '').toLowerCase().includes(query);
        return nameMatch || phoneMatch || cityMatch || idMatch;
      }
      return true;
    });
  }, [doctors, activeTab, searchQuery]);

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
            Doctor Approvals & Verifications
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>
            Review registered practitioners, inspect clinic details, and approve or reject accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadDoctors(true)}
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
          <span>{refreshing ? 'Refreshing...' : 'Refresh List'}</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-alert-success" role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiCheckCircle size={18} />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage('')}
            style={{ background: 'none', border: 'none', color: '#047857', cursor: 'pointer', padding: 0 }}
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className="admin-alert-error" role="alert">
          <FiAlertCircle style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="admin-tabs-nav" role="tablist">
        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'pending' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          <FiClock size={16} />
          <span>Pending Verification</span>
          <span
            className="admin-tab-badge"
            style={counts.pending > 0 ? { backgroundColor: '#FEF3C7', color: '#B45309' } : {}}
          >
            {counts.pending}
          </span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'approved' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          <FiCheckCircle size={16} />
          <span>Approved Doctors</span>
          <span className="admin-tab-badge">{counts.approved}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'rejected' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          <FiXCircle size={16} />
          <span>Rejected Applications</span>
          <span className="admin-tab-badge">{counts.rejected}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'all' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <FiUserCheck size={16} />
          <span>All Registered</span>
          <span className="admin-tab-badge">{counts.all}</span>
        </button>
      </div>

      {/* Search Input (instant in-memory filtering) */}
      <div className="admin-search-bar">
        <FiSearch color="#94A3B8" size={18} />
        <input
          type="text"
          className="admin-search-input"
          placeholder="Filter by doctor name, phone, city, or ID..."
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
          <p style={{ margin: 0, fontSize: '0.92rem' }}>Loading doctor profiles from SnehealApp2026...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
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
            <FiUserCheck size={28} />
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: '#0F172A', fontWeight: 700 }}>
            No Doctors Found
          </h3>
          <p style={{ margin: '0 auto 16px', maxWidth: '420px', color: '#64748B', fontSize: '0.88rem' }}>
            {searchQuery
              ? `No doctors match the search term "${searchQuery}".`
              : activeTab === 'pending'
              ? 'Great news! There are currently no doctor verification requests pending review.'
              : `There are no doctors in the "${activeTab}" category.`}
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
        /* Doctor Cards List */
        <div>
          {filteredDoctors.slice(0, visibleCount).map((doc) => {
            const isUpdating = updatingId === doc.id;
            const status = doc.verificationStatus;

            return (
              <div key={doc.id} className="admin-doctor-card">
                <div className="admin-doctor-card__header">
                  <div>
                    <h3 className="admin-doctor-name">{doc.username}</h3>
                    <div className="admin-doctor-meta">
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          backgroundColor: '#F1F5F9',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          color: '#334155',
                        }}
                      >
                        {doc.publicId}
                      </span>

                      {doc.phone && (
                        <a
                          href={`tel:${doc.phone}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#0284C7',
                            textDecoration: 'none',
                            fontWeight: 500,
                          }}
                        >
                          <FiPhone size={13} />
                          <span>{doc.phone}</span>
                        </a>
                      )}

                      {doc.registeredAt && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiCalendar size={13} />
                          <span>
                            Registered: {new Date(doc.registeredAt).toLocaleDateString()}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {status === 'approved' ? (
                      <span className="admin-badge-status admin-badge-status--approved">
                        <FiCheckCircle size={12} />
                        Approved Doctor
                      </span>
                    ) : status === 'rejected' ? (
                      <span className="admin-badge-status admin-badge-status--rejected">
                        <FiXCircle size={12} />
                        Application Rejected
                      </span>
                    ) : (
                      <span className="admin-badge-status admin-badge-status--pending">
                        <FiClock size={12} />
                        Pending Verification
                      </span>
                    )}
                  </div>
                </div>

                {/* Clinic Information Box */}
                <div className="admin-clinic-box">
                  <div className="admin-clinic-box__title">
                    <FiMapPin size={15} color="#059669" />
                    <span>Clinic Location & Address</span>
                  </div>
                  <div className="admin-clinic-box__address">
                    {doc.clinic?.addressLine || 'Address not submitted yet.'}
                    {doc.clinic?.city && <span>, {doc.clinic.city}</span>}
                    {doc.clinic?.state && <span>, {doc.clinic.state}</span>}
                    {doc.clinic?.pincode && <span> - {doc.clinic.pincode}</span>}
                    {doc.clinic?.landmark && (
                      <div style={{ marginTop: '4px', color: '#64748B', fontSize: '0.82rem' }}>
                        Landmark: {doc.clinic.landmark}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="admin-action-row">
                  {status === 'pending' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(doc.id, doc.username, 'rejected')}
                        disabled={isUpdating}
                        className="admin-btn-reject"
                      >
                        <FiXCircle size={14} />
                        <span>{isUpdating ? 'Updating...' : 'Reject Application'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(doc.id, doc.username, 'approved')}
                        disabled={isUpdating}
                        className="admin-btn-approve"
                      >
                        <FiCheckCircle size={15} />
                        <span>{isUpdating ? 'Updating...' : 'Approve Doctor'}</span>
                      </button>
                    </>
                  )}

                  {status === 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(doc.id, doc.username, 'rejected')}
                      disabled={isUpdating}
                      className="admin-btn-revoke"
                      title="Revoke active approval status"
                    >
                      <span>{isUpdating ? 'Updating...' : 'Revoke Approval'}</span>
                    </button>
                  )}

                  {status === 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(doc.id, doc.username, 'approved')}
                      disabled={isUpdating}
                      className="admin-btn-approve"
                      title="Re-approve this practitioner"
                    >
                      <FiCheckCircle size={15} />
                      <span>{isUpdating ? 'Updating...' : 'Approve Application'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Show More Profiles pagination */}
          {filteredDoctors.length > visibleCount && (
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
                Show More Profiles ({filteredDoctors.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filteredDoctors.length > 10 && visibleCount >= filteredDoctors.length && (
            <div style={{ textAlign: 'center', marginTop: '18px', color: '#94A3B8', fontSize: '0.85rem' }}>
              Showing all {filteredDoctors.length} doctors
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDoctorsPage;
