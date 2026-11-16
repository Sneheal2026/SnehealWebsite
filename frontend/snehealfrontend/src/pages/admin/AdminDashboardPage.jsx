import React, { useEffect, useState } from 'react';
import { fetchAdminStats } from '../../lib/adminAuthService';
import {
  FiUsers,
  FiUserCheck,
  FiTruck,
  FiShoppingBag,
  FiFileText,
  FiPackage,
  FiActivity,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
} from 'react-icons/fi';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadStats = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setError('');

    try {
      const data = await fetchAdminStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load live metrics from SnehealApp2026.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      {/* Header bar */}
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
            SnehealApp2026 System Overview
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>
            Live status and operational statistics for the Sneheal healthcare platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadStats(true)}
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
          <span>{refreshing ? 'Refreshing...' : 'Refresh Metrics'}</span>
        </button>
      </div>

      {error && (
        <div className="admin-alert-error" style={{ marginBottom: '24px' }}>
          <FiAlertCircle style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          {error}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="admin-stats-grid">
        {/* Customers */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="admin-stat-card__label">Active Customers</span>
            <div style={{ padding: '8px', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#2563EB' }}>
              <FiUsers size={20} />
            </div>
          </div>
          <div className="admin-stat-card__value">
            {loading ? '...' : (stats?.customers ?? 0)}
          </div>
          <div className="admin-stat-card__hint">Registered app users</div>
        </div>

        {/* Doctors */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="admin-stat-card__label">Doctors</span>
            <div style={{ padding: '8px', backgroundColor: '#ECFDF5', borderRadius: '8px', color: '#059669' }}>
              <FiUserCheck size={20} />
            </div>
          </div>
          <div className="admin-stat-card__value">
            {loading ? '...' : (stats?.doctors?.total ?? 0)}
          </div>
          <div className="admin-stat-card__hint">
            <span style={{ color: stats?.doctors?.pendingApproval > 0 ? '#D97706' : '#64748B', fontWeight: 600 }}>
              {stats?.doctors?.pendingApproval ?? 0} pending verification
            </span>
          </div>
        </div>

        {/* Delivery Agents */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="admin-stat-card__label">Delivery Fleet</span>
            <div style={{ padding: '8px', backgroundColor: '#FEF3C7', borderRadius: '8px', color: '#D97706' }}>
              <FiTruck size={20} />
            </div>
          </div>
          <div className="admin-stat-card__value">
            {loading ? '...' : (stats?.deliveryAgents?.total ?? 0)}
          </div>
          <div className="admin-stat-card__hint">
            <span style={{ color: stats?.deliveryAgents?.pendingApproval > 0 ? '#D97706' : '#64748B', fontWeight: 600 }}>
              {stats?.deliveryAgents?.pendingApproval ?? 0} pending approval
            </span>
          </div>
        </div>

        {/* Orders */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="admin-stat-card__label">Total Orders</span>
            <div style={{ padding: '8px', backgroundColor: '#F3E8FF', borderRadius: '8px', color: '#9333EA' }}>
              <FiShoppingBag size={20} />
            </div>
          </div>
          <div className="admin-stat-card__value">
            {loading ? '...' : (stats?.orders ?? 0)}
          </div>
          <div className="admin-stat-card__hint">Orders placed on platform</div>
        </div>

        {/* Prescriptions */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="admin-stat-card__label">Prescriptions</span>
            <div style={{ padding: '8px', backgroundColor: '#E0F2FE', borderRadius: '8px', color: '#0284C7' }}>
              <FiFileText size={20} />
            </div>
          </div>
          <div className="admin-stat-card__value">
            {loading ? '...' : (stats?.prescriptions ?? 0)}
          </div>
          <div className="admin-stat-card__hint">Uploaded prescriptions</div>
        </div>

        {/* Products */}
        <div className="admin-stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="admin-stat-card__label">Catalog Medicines</span>
            <div style={{ padding: '8px', backgroundColor: '#F1F5F9', borderRadius: '8px', color: '#475569' }}>
              <FiPackage size={20} />
            </div>
          </div>
          <div className="admin-stat-card__value">
            {loading ? '...' : (stats?.catalogProducts ?? 0)}
          </div>
          <div className="admin-stat-card__hint">Active products in inventory</div>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="admin-panels-grid">
        {/* Verification & Approvals Queue Preview */}
        <div className="admin-panel">
          <div className="admin-panel__header">
            <h3 className="admin-panel__title">Operational Health & Alerts</h3>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.82rem',
                color: '#059669',
                backgroundColor: '#ECFDF5',
                padding: '4px 10px',
                borderRadius: '999px',
                fontWeight: 600,
              }}
            >
              <FiCheckCircle size={14} />
              API Connected
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                  Doctor Verifications
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  {stats?.doctors?.pendingApproval ?? 0} applications awaiting document inspection
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: stats?.doctors?.pendingApproval > 0 ? '#FEF3C7' : '#F1F5F9',
                  color: stats?.doctors?.pendingApproval > 0 ? '#B45309' : '#64748B',
                }}
              >
                {stats?.doctors?.pendingApproval > 0 ? 'Requires Action' : 'All Clear'}
              </span>
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                  Delivery Partner Approvals
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  {stats?.deliveryAgents?.pendingApproval ?? 0} driver licenses and KYC files awaiting review
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: stats?.deliveryAgents?.pendingApproval > 0 ? '#FEF3C7' : '#F1F5F9',
                  color: stats?.deliveryAgents?.pendingApproval > 0 ? '#B45309' : '#64748B',
                }}
              >
                {stats?.deliveryAgents?.pendingApproval > 0 ? 'Requires Action' : 'All Clear'}
              </span>
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                  DrugSetu Inventory Sync
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Automated medicine distributor synchronization active
                </div>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                }}
              >
                Sync Active
              </span>
            </div>
          </div>
        </div>

        {/* Security & System Status Panel */}
        <div className="admin-panel">
          <div className="admin-panel__header">
            <h3 className="admin-panel__title">Security Overview</h3>
            <FiActivity color="#10B981" size={18} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>RBAC Enforced</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>Role: Admin</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>Brute-force Shield</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>Token Auth</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>Bearer JWT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
              <span style={{ color: '#64748B' }}>Storage Isolation</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>Dedicated Admin Key</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Backend Target</span>
              <span style={{ color: '#0F172A', fontWeight: 600, fontSize: '0.78rem' }}>SnehealApp2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
