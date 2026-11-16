import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import './App.css';

const DoctorPortal = React.lazy(() => import('./pages/doctor/DoctorPortal'));
const AdminPortal = React.lazy(() => import('./pages/admin/AdminPortal'));

function App() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense
            fallback={
              <div
                style={{
                  display: 'flex',
                  minHeight: '100vh',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#071829',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid rgba(255, 255, 255, 0.15)',
                      borderTopColor: '#10B981',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                      margin: '0 auto 12px',
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94A3B8' }}>Loading Admin Portal...</p>
                </div>
              </div>
            }
          >
            <AdminPortal />
          </Suspense>
        }
      />
      <Route
        path="/doctor/*"
        element={
          <Suspense
            fallback={
              <div className="doctor-shell doctor-main--centered">
                <div className="doctor-spinner" role="status" aria-label="Loading" />
              </div>
            }
          >
            <DoctorPortal />
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <MainLayout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
