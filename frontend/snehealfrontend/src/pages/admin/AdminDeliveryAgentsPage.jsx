import React, { useEffect, useState, useMemo } from 'react';
import {
  fetchAdminDeliveryAgents,
  getCachedAdminDeliveryAgents,
  fetchAdminDeliveryAgentDocument,
  updateAdminDeliveryAgentStatus,
} from '../../lib/adminAuthService';
import {
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiRefreshCw,
  FiPhone,
  FiCalendar,
  FiFileText,
  FiAlertCircle,
  FiX,
  FiEye,
} from 'react-icons/fi';

const AdminDeliveryAgentsPage = () => {
  const initialAgents = getCachedAdminDeliveryAgents();
  const [agents, setAgents] = useState(initialAgents || []);
  const [loading, setLoading] = useState(!initialAgents);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [updatingId, setUpdatingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  // Document modal state
  const [activeModal, setActiveModal] = useState(null); // { userId, agentName, docType, title }
  const [modalLoading, setModalLoading] = useState(false);
  const [modalDoc, setModalDoc] = useState(null);
  const [modalError, setModalError] = useState('');

  const loadAgents = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setError('');

    try {
      const data = await fetchAdminDeliveryAgents(isManualRefresh);
      setAgents(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch delivery agent profiles from SnehealApp2026.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!initialAgents) {
      loadAgents(false);
    }
  }, [initialAgents]);

  // Reset pagination when active tab or search changes
  useEffect(() => {
    setVisibleCount(10);
  }, [activeTab, searchQuery]);

  const handleStatusChange = async (userId, agentName, newStatus) => {
    if (updatingId) return;
    setUpdatingId(userId);
    setError('');

    try {
      await updateAdminDeliveryAgentStatus(userId, newStatus);
      // Optimistically update local state immediately
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === String(userId) ? { ...agent, verificationStatus: newStatus } : agent
        )
      );

      const actionText =
        newStatus === 'approved'
          ? 'approved as active delivery partner'
          : newStatus === 'rejected'
          ? 'marked as rejected'
          : 'moved to pending';
      setToastMessage(`${agentName} has been ${actionText}.`);

      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      setError(err.message || `Failed to update status for ${agentName}.`);
    } finally {
      setUpdatingId(null);
    }
  };

  // Open Document Modal (Fetches the heavy base64 image on-demand only!)
  const openDocumentModal = async (userId, agentName, docType) => {
    const title = docType === 'aadhar' ? 'Aadhar Card Document' : 'Driving License';
    setActiveModal({ userId, agentName, docType, title });
    setModalLoading(true);
    setModalDoc(null);
    setModalError('');

    try {
      const data = await fetchAdminDeliveryAgentDocument(userId, docType);
      setModalDoc(data);
    } catch (err) {
      setModalError(err.message || 'Failed to download document preview.');
    } finally {
      setModalLoading(false);
    }
  };

  const closeDocumentModal = () => {
    setActiveModal(null);
    setModalDoc(null);
    setModalError('');
  };

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: agents.length,
      pending: agents.filter((a) => a.verificationStatus === 'pending').length,
      approved: agents.filter((a) => a.verificationStatus === 'approved').length,
      rejected: agents.filter((a) => a.verificationStatus === 'rejected').length,
    };
  }, [agents]);

  // Filtered agents list (100% in-memory calculation)
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      // Tab filter
      if (activeTab !== 'all' && agent.verificationStatus !== activeTab) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (agent.username || '').toLowerCase().includes(query);
        const phoneMatch = (agent.phone || '').includes(query);
        const idMatch = (agent.publicId || '').toLowerCase().includes(query);
        return nameMatch || phoneMatch || idMatch;
      }
      return true;
    });
  }, [agents, activeTab, searchQuery]);

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
            Delivery Fleet Approvals & KYC
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>
            Verify delivery personnel, inspect driving licenses & Aadhar identification cards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadAgents(true)}
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
          <span>Active Delivery Partners</span>
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
          <FiTruck size={16} />
          <span>All Registered Fleet</span>
          <span className="admin-tab-badge">{counts.all}</span>
        </button>
      </div>

      {/* Search Input (instant in-memory filtering) */}
      <div className="admin-search-bar">
        <FiSearch color="#94A3B8" size={18} />
        <input
          type="text"
          className="admin-search-input"
          placeholder="Filter by agent name, phone, or ID..."
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
          <p style={{ margin: 0, fontSize: '0.92rem' }}>Loading delivery fleet from SnehealApp2026...</p>
        </div>
      ) : filteredAgents.length === 0 ? (
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
            <FiTruck size={28} />
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: '#0F172A', fontWeight: 700 }}>
            No Delivery Agents Found
          </h3>
          <p style={{ margin: '0 auto 16px', maxWidth: '420px', color: '#64748B', fontSize: '0.88rem' }}>
            {searchQuery
              ? `No delivery partners match the search query "${searchQuery}".`
              : activeTab === 'pending'
              ? 'Great! There are currently no pending delivery agent verification requests.'
              : `There are no delivery agents in the "${activeTab}" category.`}
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
        /* Delivery Agent Cards List */
        <div>
          {filteredAgents.slice(0, visibleCount).map((agent) => {
            const isUpdating = updatingId === agent.id;
            const status = agent.verificationStatus;

            return (
              <div key={agent.id} className="admin-doctor-card">
                <div className="admin-doctor-card__header">
                  <div>
                    <h3 className="admin-doctor-name">{agent.username}</h3>
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
                        {agent.publicId}
                      </span>

                      {agent.phone && (
                        <a
                          href={`tel:${agent.phone}`}
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
                          <span>{agent.phone}</span>
                        </a>
                      )}

                      {agent.registeredAt && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <FiCalendar size={13} />
                          <span>
                            Applied: {new Date(agent.registeredAt).toLocaleDateString()}
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
                        Active Partner
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

                {/* KYC Verification Documents Box */}
                <div className="admin-clinic-box">
                  <div className="admin-clinic-box__title">
                    <FiFileText size={15} color="#059669" />
                    <span>Submitted KYC Credentials</span>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {/* Aadhar Card Button */}
                    {agent.hasAadhar ? (
                      <button
                        type="button"
                        onClick={() => openDocumentModal(agent.id, agent.username, 'aadhar')}
                        className="admin-btn-doc"
                      >
                        <FiEye size={14} />
                        <span>Inspect Aadhar Card</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                        Aadhar Card not submitted
                      </span>
                    )}

                    {/* Driving License Button */}
                    {agent.hasLicense ? (
                      <button
                        type="button"
                        onClick={() => openDocumentModal(agent.id, agent.username, 'license')}
                        className="admin-btn-doc"
                      >
                        <FiEye size={14} />
                        <span>Inspect Driving License</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                        Driving License not submitted
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="admin-action-row">
                  {status === 'pending' && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleStatusChange(agent.id, agent.username, 'rejected')}
                        disabled={isUpdating}
                        className="admin-btn-reject"
                      >
                        <FiXCircle size={14} />
                        <span>{isUpdating ? 'Updating...' : 'Reject Application'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(agent.id, agent.username, 'approved')}
                        disabled={isUpdating}
                        className="admin-btn-approve"
                      >
                        <FiCheckCircle size={15} />
                        <span>{isUpdating ? 'Updating...' : 'Approve Partner'}</span>
                      </button>
                    </>
                  )}

                  {status === 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(agent.id, agent.username, 'rejected')}
                      disabled={isUpdating}
                      className="admin-btn-revoke"
                      title="Deactivate partner status"
                    >
                      <span>{isUpdating ? 'Updating...' : 'Revoke Approval'}</span>
                    </button>
                  )}

                  {status === 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(agent.id, agent.username, 'approved')}
                      disabled={isUpdating}
                      className="admin-btn-approve"
                      title="Re-approve this partner"
                    >
                      <FiCheckCircle size={15} />
                      <span>{isUpdating ? 'Updating...' : 'Approve Application'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Show More Pagination (10 at a time) */}
          {filteredAgents.length > visibleCount && (
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
                Show More Profiles ({filteredAgents.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filteredAgents.length > 10 && visibleCount >= filteredAgents.length && (
            <div style={{ textAlign: 'center', marginTop: '18px', color: '#94A3B8', fontSize: '0.85rem' }}>
              Showing all {filteredAgents.length} delivery partners
            </div>
          )}
        </div>
      )}

      {/* Document Inspection Modal */}
      {activeModal && (
        <div className="admin-modal-backdrop" onClick={closeDocumentModal}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">{activeModal.title}</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Applicant: {activeModal.agentName}
                </span>
              </div>
              <button
                type="button"
                onClick={closeDocumentModal}
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

            <div className="admin-modal-body">
              {modalLoading ? (
                <div style={{ textAlign: 'center', color: '#64748B' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      border: '3px solid #E2E8F0',
                      borderTopColor: '#10B981',
                      borderRadius: '50%',
                      animation: 'admin-spin 0.8s linear infinite',
                      margin: '0 auto 10px',
                    }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>Downloading document preview...</span>
                </div>
              ) : modalError ? (
                <div className="admin-alert-error" style={{ width: '100%', boxSizing: 'border-box' }}>
                  <FiAlertCircle style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  {modalError}
                </div>
              ) : modalDoc?.imageBase64 ? (
                <img
                  src={
                    modalDoc.imageBase64.startsWith('data:')
                      ? modalDoc.imageBase64
                      : `data:${modalDoc.mimeType || 'image/jpeg'};base64,${modalDoc.imageBase64}`
                  }
                  alt={activeModal.title}
                  className="admin-modal-image"
                />
              ) : (
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>No document image found.</p>
              )}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={closeDocumentModal}
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
      )}
    </div>
  );
};

export default AdminDeliveryAgentsPage;
