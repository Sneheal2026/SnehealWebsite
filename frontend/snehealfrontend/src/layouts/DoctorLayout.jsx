import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/doctor/doctor-portal.css';

const DoctorLayout = () => {
  return (
    <div className="doctor-shell">
      <header className="doctor-topbar">
        <div className="doctor-topbar__brand">
          <span className="doctor-topbar__title">Sneheal</span>
          <span className="doctor-topbar__subtitle">Doctor portal</span>
        </div>
        <nav className="doctor-topbar__nav" aria-label="Doctor portal">
          <NavLink
            to="/doctor/dashboard"
            className={({ isActive }) =>
              `doctor-nav-link${isActive ? ' is-active' : ''}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/doctor/patients"
            className={({ isActive }) =>
              `doctor-nav-link${isActive ? ' is-active' : ''}`
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="/doctor/account"
            className={({ isActive }) =>
              `doctor-nav-link${isActive ? ' is-active' : ''}`
            }
          >
            Account
          </NavLink>
        </nav>
      </header>
      <main className="doctor-main">
        <div className="container doctor-card--wide" style={{ maxWidth: 'var(--container-max)' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DoctorLayout;
