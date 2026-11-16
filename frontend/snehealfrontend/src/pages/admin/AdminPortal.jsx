import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from '../../context/AdminAuthContext';
import { AdminGuestOnly, AdminRequireAuth } from '../../components/admin/AdminRouteGuards';
import AdminLayout from '../../layouts/AdminLayout';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';
import AdminDoctorsPage from './AdminDoctorsPage';
import AdminDeliveryAgentsPage from './AdminDeliveryAgentsPage';
import AdminOrdersPage from './AdminOrdersPage';
import AdminPrescriptionsPage from './AdminPrescriptionsPage';
import AdminPlaceholderPage from './AdminPlaceholderPage';

const AdminPortal = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Public Login Route - Redirects to dashboard if already authenticated */}
        <Route
          path="login"
          element={
            <AdminGuestOnly>
              <AdminLoginPage />
            </AdminGuestOnly>
          }
        />

        {/* Protected Admin Routes - Requires Admin token */}
        <Route element={<AdminRequireAuth />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="doctors" element={<AdminDoctorsPage />} />
            <Route path="agents" element={<AdminDeliveryAgentsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="prescriptions" element={<AdminPrescriptionsPage />} />
            <Route
              path="catalog"
              element={
                <AdminPlaceholderPage
                  title="Medicine Catalog & Stock"
                  description="Manage inventory levels, prices, product categories, and synchronization with DrugSetu distributors."
                  moduleName="Pharmacy Catalog"
                />
              }
            />
          </Route>
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminPortal;
