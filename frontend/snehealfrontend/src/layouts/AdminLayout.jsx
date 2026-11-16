import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  FiGrid,
  FiUserCheck,
  FiTruck,
  FiShoppingBag,
  FiFileText,
  FiPackage,
  FiLogOut,
  FiExternalLink,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import '../styles/admin/admin-portal.css';

const AdminLayout = () => {
  const { adminUser, logout } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  return (
    <div className="admin-shell">
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileNavOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={closeMobileNav}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar${mobileNavOpen ? ' is-open' : ''}`}
        aria-label="Admin Navigation"
      >
        <div className="admin-sidebar__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="admin-sidebar__logo">Sneheal</span>
            <span className="admin-sidebar__badge">Admin</span>
          </div>

          {/* Close button inside mobile sidebar */}
          <button
            type="button"
            className="admin-mobile-close-btn"
            onClick={closeMobileNav}
            aria-label="Close navigation menu"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            onClick={closeMobileNav}
            end
          >
            <FiGrid size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/doctors"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            onClick={closeMobileNav}
          >
            <FiUserCheck size={18} />
            <span>Doctor Approvals</span>
          </NavLink>

          <NavLink
            to="/admin/agents"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            onClick={closeMobileNav}
          >
            <FiTruck size={18} />
            <span>Delivery Fleet</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            onClick={closeMobileNav}
          >
            <FiShoppingBag size={18} />
            <span>Orders & Sales</span>
          </NavLink>

          <NavLink
            to="/admin/prescriptions"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            onClick={closeMobileNav}
          >
            <FiFileText size={18} />
            <span>Prescriptions</span>
          </NavLink>

          <NavLink
            to="/admin/catalog"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            onClick={closeMobileNav}
          >
            <FiPackage size={18} />
            <span>Pharmacy Catalog</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar__footer">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-item"
            style={{ fontSize: '0.85rem' }}
          >
            <FiExternalLink size={16} />
            <span>View Public Site</span>
          </a>
        </div>
      </aside>

      {/* Main Area */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Hamburger Button on Mobile */}
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              <FiMenu size={22} />
            </button>

            <h1 className="admin-topbar__title">
              <span className="admin-topbar__title--full">Sneheal Administration Portal</span>
              <span className="admin-topbar__title--short">Sneheal Admin</span>
            </h1>
          </div>

          <div className="admin-topbar__actions">
            <div className="admin-user-pill">
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                }}
              />
              <span>{adminUser?.username || 'Admin'}</span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="admin-btn-logout"
              title="Sign out of Admin Portal"
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <FiLogOut size={14} />
                <span className="admin-logout-text">Sign Out</span>
              </span>
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
