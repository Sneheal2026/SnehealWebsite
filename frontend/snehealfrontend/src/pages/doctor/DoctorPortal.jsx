import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DoctorAuthProvider } from '../../context/DoctorAuthContext';
import DoctorLayout from '../../layouts/DoctorLayout';
import {
  DoctorDashboardShell,
  DoctorGuestOnly,
} from '../../components/doctor/DoctorRouteGuards';
import DoctorLoginPage from './DoctorLoginPage';
import DoctorUnauthorizedPage from './DoctorUnauthorizedPage';
import DoctorRegisterPage from './DoctorRegisterPage';
import DoctorDashboardPage from './DoctorDashboardPage';
import DoctorPatientsPage from './DoctorPatientsPage';
import DoctorPatientDetailPage from './DoctorPatientDetailPage';
import DoctorAccountPage from './DoctorAccountPage';

const DoctorPortal = () => {
  return (
    <DoctorAuthProvider>
      <Routes>
        <Route
          path="login"
          element={
            <DoctorGuestOnly>
              <DoctorLoginPage />
            </DoctorGuestOnly>
          }
        />
        <Route path="unauthorized" element={<DoctorUnauthorizedPage />} />
        <Route path="register" element={<DoctorRegisterPage />} />
        <Route element={<DoctorDashboardShell />}>
          <Route element={<DoctorLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboardPage />} />
            <Route path="patients" element={<DoctorPatientsPage />} />
            <Route path="patients/:userId" element={<DoctorPatientDetailPage />} />
            <Route path="account" element={<DoctorAccountPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </DoctorAuthProvider>
  );
};

export default DoctorPortal;
