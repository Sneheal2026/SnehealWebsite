import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

function AdminLoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#071829',
        color: '#FFFFFF',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '4px solid rgba(255, 255, 255, 0.15)',
            borderTopColor: '#10B981',
            borderRadius: '50%',
            animation: 'admin-spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#94A3B8' }}>
          Verifying Admin Authorization...
        </p>
      </div>
      <style>{`
        @keyframes admin-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/**
 * Route guard that requires an active admin session.
 * Unauthorized visitors are redirected to /admin/login.
 */
export function AdminRequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return <AdminLoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}

/**
 * Route guard for login page:
 * Authenticated admins are redirected to the dashboard.
 */
export function AdminGuestOnly({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return <AdminLoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
