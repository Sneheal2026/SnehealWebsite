import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from '../../context/AdminAuthContext';
import { AdminGuestOnly, AdminRequireAuth } from '../../components/admin/AdminRouteGuards';
import AdminLayout from '../../layouts/AdminLayout';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboardPage from './AdminDashboardPage';
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
            <Route
              path="doctors"
              element={
                <AdminPlaceholderPage
                  title="Doctor Approvals & Verification"
                  description="Review medical council registrations, clinic details, and approve or reject doctor signups."
                  moduleName="Doctor Approvals"
                />
              }
            />
            <Route
              path="agents"
              element={
                <AdminPlaceholderPage
                  title="Delivery Partner Approvals"
                  description="Inspect Aadhar verification, driving licenses, and vehicle credentials for Sneheal delivery personnel."
                  moduleName="Delivery Fleet"
                />
              }
            />
            <Route
              path="orders"
              element={
                <AdminPlaceholderPage
                  title="Orders & Sales Management"
                  description="Real-time order statuses, Razorpay and COD settlement records, and delivery fulfillment pipeline."
                  moduleName="Orders Desk"
                />
              }
            />
            <Route
              path="prescriptions"
              element={
                <AdminPlaceholderPage
                  title="Prescription Processing"
                  description="Prescription scans uploaded by customers, automated OCR extraction results, and doctor review logs."
                  moduleName="Prescriptions"
                />
              }
            />
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
