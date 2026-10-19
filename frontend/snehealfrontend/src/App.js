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

function App() {
  return (
    <Routes>
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
