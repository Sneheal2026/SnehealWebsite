import React, { useEffect, useState, useMemo } from 'react';
import {
  fetchAdminOrders,
  getCachedAdminOrders,
  fetchAdminOrderDetails,
  updateAdminOrderStatus,
} from '../../lib/adminAuthService';
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiRefreshCw,
  FiPhone,
  FiCalendar,
  FiTruck,
  FiAlertCircle,
  FiX,
  FiEye,
  FiMapPin,
  FiPackage,
} from 'react-icons/fi';

const AdminOrdersPage = () => {
  const initialOrders = getCachedAdminOrders();
  const [orders, setOrders] = useState(initialOrders || []);
  const [loading, setLoading] = useState(!initialOrders);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  // Order Details Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);
  const [modalError, setModalError] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadOrders = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    setError('');

    try {
      const data = await fetchAdminOrders(isManualRefresh);
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch customer orders from SnehealApp2026.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!initialOrders) {
      loadOrders(false);
    }
  }, [initialOrders]);

  // Reset pagination when active tab or search changes
  useEffect(() => {
    setVisibleCount(10);
  }, [activeTab, searchQuery]);

  // View order breakdown modal
  const openOrderModal = async (order) => {
    setSelectedOrder(order);
    setModalLoading(true);
    setModalDetails(null);
    setModalError('');

    try {
      const data = await fetchAdminOrderDetails(order.id);
      setModalDetails(data);
    } catch (err) {
      setModalError(err.message || 'Failed to fetch order items.');
    } finally {
      setModalLoading(false);
    }
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setModalDetails(null);
    setModalError('');
  };

  // Change fulfillment status
  const handleStatusChange = async (orderId, newStatus) => {
    if (updatingStatus) return;
    setUpdatingStatus(true);
    setError('');

    try {
      await updateAdminOrderStatus(orderId, newStatus);
      // Optimistically update orders list
      setOrders((prev) =>
        prev.map((o) =>
          o.id === String(orderId) || o.publicId === String(orderId)
            ? { ...o, status: newStatus }
            : o
        )
      );

      if (modalDetails) {
        setModalDetails((prev) => ({ ...prev, status: newStatus }));
      }

      setToastMessage(`Order status updated to ${newStatus.replace(/_/g, ' ')}.`);
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      setError(err.message || 'Failed to update order status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: orders.length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      out_for_delivery: orders.filter((o) => o.status === 'out_for_delivery').length,
      confirmed: orders.filter((o) => o.status === 'confirmed').length,
      awaiting_payment: orders.filter((o) => o.status === 'awaiting_payment').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  }, [orders]);

  // Filtered orders list (100% in-memory calculation)
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Tab filter
      if (activeTab !== 'all' && o.status !== activeTab) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const idMatch = (o.publicId || '').toLowerCase().includes(query);
        const customerMatch = (o.customer?.name || '').toLowerCase().includes(query);
        const receiverMatch = (o.receiver?.name || '').toLowerCase().includes(query);
        const phoneMatch = (o.receiver?.phone || '').includes(query) || (o.customer?.phone || '').includes(query);
        const agentMatch = (o.deliveryAgent?.name || '').toLowerCase().includes(query);
        return idMatch || customerMatch || receiverMatch || phoneMatch || agentMatch;
      }
      return true;
    });
  }, [orders, activeTab, searchQuery]);

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
            Orders & Sales Management
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>
            Live customer orders, payment verification, delivery partner assignments, and order tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadOrders(true)}
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
          <span>{refreshing ? 'Refreshing...' : 'Refresh Orders'}</span>
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
          className={`admin-tab-btn${activeTab === 'all' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <FiShoppingBag size={16} />
          <span>All Orders</span>
          <span className="admin-tab-badge">{counts.all}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'delivered' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          <FiCheckCircle size={16} />
          <span>Delivered</span>
          <span
            className="admin-tab-badge"
            style={counts.delivered > 0 ? { backgroundColor: '#ECFDF5', color: '#059669' } : {}}
          >
            {counts.delivered}
          </span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'out_for_delivery' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('out_for_delivery')}
        >
          <FiTruck size={16} />
          <span>Out for Delivery</span>
          <span
            className="admin-tab-badge"
            style={counts.out_for_delivery > 0 ? { backgroundColor: '#EFF6FF', color: '#2563EB' } : {}}
          >
            {counts.out_for_delivery}
          </span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'confirmed' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('confirmed')}
        >
          <FiPackage size={16} />
          <span>Confirmed</span>
          <span className="admin-tab-badge">{counts.confirmed}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'awaiting_payment' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('awaiting_payment')}
        >
          <FiClock size={16} />
          <span>Awaiting Payment</span>
          <span className="admin-tab-badge">{counts.awaiting_payment}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-btn${activeTab === 'cancelled' ? ' is-active' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          <FiXCircle size={16} />
          <span>Cancelled</span>
          <span className="admin-tab-badge">{counts.cancelled}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="admin-search-bar">
        <FiSearch color="#94A3B8" size={18} />
        <input
          type="text"
          className="admin-search-input"
          placeholder="Filter by Order ID (SNH-...), customer, phone, or delivery agent..."
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
          <p style={{ margin: 0, fontSize: '0.92rem' }}>Loading live orders from SnehealApp2026...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
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
            <FiShoppingBag size={28} />
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: '#0F172A', fontWeight: 700 }}>
            No Orders Found
          </h3>
          <p style={{ margin: '0 auto 16px', maxWidth: '420px', color: '#64748B', fontSize: '0.88rem' }}>
            {searchQuery
              ? `No orders match "${searchQuery}".`
              : `There are currently no orders in the "${activeTab.replace(/_/g, ' ')}" status.`}
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
        /* Orders List */
        <div>
          {filteredOrders.slice(0, visibleCount).map((ord) => {
            const statusKey = ord.status || 'awaiting_payment';
            const statusClass = `admin-badge-status--${statusKey}`;
            const statusLabel = statusKey.replace(/_/g, ' ');

            return (
              <div key={ord.id} className="admin-doctor-card">
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
                        {ord.publicId}
                      </span>

                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>
                        ₹{ord.pricing.grandTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="admin-doctor-meta" style={{ marginTop: '8px' }}>
                      <span>
                        Customer: <strong>{ord.customer?.name}</strong>
                      </span>
                      {ord.customer?.phone && (
                        <a
                          href={`tel:${ord.customer.phone}`}
                          style={{ color: '#0284C7', textDecoration: 'none' }}
                        >
                          <FiPhone size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {ord.customer.phone}
                        </a>
                      )}
                      {ord.createdAt && (
                        <span>
                          <FiCalendar size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {new Date(ord.createdAt).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status & Payment Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span
                      className={`admin-badge-payment ${
                        ord.payment.status === 'paid'
                          ? 'admin-badge-payment--paid'
                          : 'admin-badge-payment--pending'
                      }`}
                    >
                      {ord.payment.provider?.toUpperCase()} • {ord.payment.status?.toUpperCase()}
                    </span>

                    <span className={`admin-badge-status ${statusClass}`}>
                      {statusKey === 'delivered' ? (
                        <FiCheckCircle size={12} />
                      ) : statusKey === 'out_for_delivery' ? (
                        <FiTruck size={12} />
                      ) : (
                        <FiClock size={12} />
                      )}
                      <span>{statusLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.45 }}>
                  <FiMapPin size={13} style={{ verticalAlign: 'middle', marginRight: '4px', color: '#64748B' }} />
                  <strong>Deliver to: </strong>
                  {ord.receiver.name} ({ord.receiver.phone}) — {ord.receiver.flatNumber},{' '}
                  {ord.receiver.addressLine}
                  {ord.receiver.landmark ? ` (Landmark: ${ord.receiver.landmark})` : ''}
                </div>

                {/* Delivery Agent Information Section */}
                {ord.deliveryAgent ? (
                  <div className="admin-agent-callout">
                    <div>
                      <div className="admin-agent-callout__title">
                        <FiTruck size={14} />
                        <span>
                          {ord.status === 'delivered' ? 'Delivered By' : 'Assigned Fleet Partner'}
                        </span>
                      </div>
                      <div className="admin-agent-callout__info">
                        <span>
                          <strong>{ord.deliveryAgent.name}</strong>
                        </span>
                        {ord.deliveryAgent.phone && (
                          <a
                            href={`tel:${ord.deliveryAgent.phone}`}
                            style={{ color: '#0284C7', textDecoration: 'none' }}
                          >
                            <FiPhone size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                            {ord.deliveryAgent.phone}
                          </a>
                        )}
                        {ord.deliveredAt && (
                          <span style={{ color: '#047857', fontWeight: 600 }}>
                            Delivered on: {new Date(ord.deliveredAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}
                    >
                      Fleet Assigned
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: '#94A3B8',
                      backgroundColor: '#F8FAFC',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px dashed #CBD5E1',
                    }}
                  >
                    Delivery Partner: <em>Not assigned yet</em>
                  </div>
                )}

                {/* Action Row */}
                <div className="admin-action-row">
                  <button
                    type="button"
                    onClick={() => openOrderModal(ord)}
                    className="admin-btn-doc"
                    style={{ border: '1.5px solid #0B2545', color: '#0B2545' }}
                  >
                    <FiEye size={14} />
                    <span>View Order Breakdown & Items</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Show More Pagination (10 at a time) */}
          {filteredOrders.length > visibleCount && (
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
                Show More Orders ({filteredOrders.length - visibleCount} remaining)
              </button>
            </div>
          )}

          {filteredOrders.length > 10 && visibleCount >= filteredOrders.length && (
            <div style={{ textAlign: 'center', marginTop: '18px', color: '#94A3B8', fontSize: '0.85rem' }}>
              Showing all {filteredOrders.length} orders
            </div>
          )}
        </div>
      )}

      {/* Order Detail & Items Breakdown Modal */}
      {selectedOrder && (
        <div className="admin-modal-backdrop" onClick={closeOrderModal}>
          <div
            className="admin-modal-card"
            style={{ maxWidth: '720px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Order Details: {selectedOrder.publicId}</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Customer: {selectedOrder.customer?.name} ({selectedOrder.customer?.phone})
                </span>
              </div>
              <button
                type="button"
                onClick={closeOrderModal}
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

            <div className="admin-modal-body" style={{ alignItems: 'stretch' }}>
              {modalLoading ? (
                <div style={{ textAlign: 'center', color: '#64748B', padding: '30px' }}>
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
                  <span>Loading itemized medicines breakdown...</span>
                </div>
              ) : modalError ? (
                <div className="admin-alert-error">{modalError}</div>
              ) : modalDetails ? (
                <div>
                  {/* Delivery Agent Section inside Modal */}
                  {modalDetails.deliveryAgent && (
                    <div className="admin-agent-callout" style={{ marginTop: 0, marginBottom: '16px' }}>
                      <div>
                        <div className="admin-agent-callout__title">
                          <FiTruck size={14} />
                          <span>
                            {modalDetails.status === 'delivered'
                              ? 'Delivered By'
                              : 'Assigned Fleet Partner'}
                          </span>
                        </div>
                        <div className="admin-agent-callout__info">
                          <span>
                            <strong>{modalDetails.deliveryAgent.name}</strong>
                          </span>
                          {modalDetails.deliveryAgent.phone && (
                            <a
                              href={`tel:${modalDetails.deliveryAgent.phone}`}
                              style={{ color: '#0284C7', textDecoration: 'none' }}
                            >
                              <FiPhone size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                              {modalDetails.deliveryAgent.phone}
                            </a>
                          )}
                          {modalDetails.deliveredAt && (
                            <span style={{ color: '#047857', fontWeight: 600 }}>
                              Delivered at: {new Date(modalDetails.deliveredAt).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Controller inside Modal */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '14px',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748B' }}>
                        CURRENT FULFILLMENT STATUS
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>
                        {modalDetails.status?.replace(/_/g, ' ')}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {modalDetails.status !== 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(modalDetails.id, 'confirmed')}
                          disabled={updatingStatus}
                          className="admin-btn-doc"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Mark Confirmed
                        </button>
                      )}

                      {modalDetails.status !== 'out_for_delivery' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(modalDetails.id, 'out_for_delivery')}
                          disabled={updatingStatus}
                          className="admin-btn-doc"
                          style={{ fontSize: '0.8rem', color: '#1D4ED8', borderColor: '#BFDBFE' }}
                        >
                          Mark Out for Delivery
                        </button>
                      )}

                      {modalDetails.status !== 'delivered' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(modalDetails.id, 'delivered')}
                          disabled={updatingStatus}
                          className="admin-btn-approve"
                          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                        >
                          <FiCheckCircle size={13} />
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items List Table */}
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#0F172A' }}>
                    Purchased Medicines & Products ({modalDetails.items?.length || 0})
                  </h4>

                  <div style={{ overflowX: 'auto' }}>
                    <table className="admin-items-table">
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Unit / Pack</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th style={{ textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalDetails.items?.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <strong>{item.name}</strong>
                              {item.prescriptionRequired && (
                                <span
                                  style={{
                                    display: 'block',
                                    fontSize: '0.75rem',
                                    color: '#DC2626',
                                    fontWeight: 600,
                                  }}
                                >
                                  Rx Required
                                </span>
                              )}
                            </td>
                            <td>{item.unit || 'Standard'}</td>
                            <td>x {item.quantity}</td>
                            <td>₹{item.unitPrice.toFixed(2)}</td>
                            <td style={{ textAlign: 'right', fontWeight: 700 }}>
                              ₹{item.lineTotal.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Billing Breakdown */}
                  <div
                    style={{
                      marginTop: '16px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid #E2E8F0',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      fontSize: '0.88rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                      <span>Item MRP Total</span>
                      <span>₹{modalDetails.pricing.itemMrp.toFixed(2)}</span>
                    </div>
                    {modalDetails.pricing.discount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                        <span>Discount Savings</span>
                        <span>- ₹{modalDetails.pricing.discount.toFixed(2)}</span>
                      </div>
                    )}
                    {modalDetails.pricing.promoDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                        <span>Promo Code Discount</span>
                        <span>- ₹{modalDetails.pricing.promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                      <span>Delivery Fee</span>
                      <span>
                        {modalDetails.pricing.deliveryFee > 0
                          ? `₹${modalDetails.pricing.deliveryFee.toFixed(2)}`
                          : 'FREE'}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        color: '#0B2545',
                        borderTop: '1px solid #E2E8F0',
                        paddingTop: '8px',
                        marginTop: '4px',
                      }}
                    >
                      <span>Grand Total ({modalDetails.pricing.currency})</span>
                      <span>₹{modalDetails.pricing.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={closeOrderModal}
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
                Close Order Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
