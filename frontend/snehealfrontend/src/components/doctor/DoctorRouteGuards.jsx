import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useDoctorAuth } from '../../context/DoctorAuthContext';
import { resolveAuthRoute } from '../../lib/resolveAuthRoute';
import { hasSession } from '../../lib/authTokenManager';

function DoctorLoading() {
  return (
    <div className="doctor-shell doctor-main--centered">
      <div className="doctor-spinner" role="status" aria-label="Loading" />
    </div>
  );
}

function useDoctorGate() {
  const { user, bootstrapping } = useDoctorAuth();
  return { user, bootstrapping };
}

export function DoctorGuestOnly({ children }) {
  const { user, bootstrapping } = useDoctorGate();
  const location = useLocation();

  if (bootstrapping) {
    return <DoctorLoading />;
  }

  if (hasSession() && user) {
    const target = resolveAuthRoute(user, true);
    if (target !== '/doctor/login') {
      return <Navigate to={target} replace state={{ from: location }} />;
    }
  }

  return children;
}

export function DoctorRequireSession({ children }) {
  const { user, bootstrapping } = useDoctorGate();

  if (bootstrapping) {
    return <DoctorLoading />;
  }

  if (!hasSession() || !user) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
}

export function DoctorRegisterOnly({ children }) {
  const { user, bootstrapping } = useDoctorGate();

  if (bootstrapping) {
    return <DoctorLoading />;
  }

  if (!hasSession() || !user) {
    return <Navigate to="/doctor/login" replace />;
  }

  if (user.role !== 'doctor') {
    return <Navigate to="/doctor/unauthorized" replace />;
  }

  if (user.profileCompleted) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return children;
}

/** Single guard for dashboard routes — one auth check instead of three nested wrappers. */
export function DoctorDashboardShell() {
  const { user, bootstrapping } = useDoctorGate();

  if (bootstrapping) {
    return <DoctorLoading />;
  }

  if (!hasSession() || !user) {
    return <Navigate to="/doctor/login" replace />;
  }

  if (user.role !== 'doctor') {
    return <Navigate to="/doctor/unauthorized" replace />;
  }

  if (!user.profileCompleted) {
    return <Navigate to="/doctor/register" replace />;
  }

  return <Outlet />;
}
