import React from 'react';
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
} from 'react-icons/fi';
import '../styles/admin/admin-portal.css';

const AdminLayout = () => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar" aria-label="Admin Navigation">
        <div className="admin-sidebar__header">
          <span className="admin-sidebar__logo">Sneheal</span>
          <span className="admin-sidebar__badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
            end
          >
            <FiGrid size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/doctors"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
          >
            <FiUserCheck size={18} />
            <span>Doctor Approvals</span>
          </NavLink>

          <NavLink
            to="/admin/agents"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
          >
            <FiTruck size={18} />
            <span>Delivery Agents</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
          >
            <FiShoppingBag size={18} />
            <span>Orders & Sales</span>
          </NavLink>

          <NavLink
            to="/admin/prescriptions"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
          >
            <FiFileText size={18} />
            <span>Prescriptions</span>
          </NavLink>

          <NavLink
            to="/admin/catalog"
            className={({ isActive }) => `admin-nav-item${isActive ? ' is-active' : ''}`}
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
          <h1 className="admin-topbar__title">Sneheal Administration Portal</h1>

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
                Sign Out
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
