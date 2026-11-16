import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../../styles/admin/admin-portal.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, sessionError } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      setLocalError('Please enter both your Admin Username and Password.');
      return;
    }

    setLocalError('');
    setIsSubmitting(true);

    try {
      await login(trimmedUser, password);
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeError = localError || sessionError;

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="admin-login-badge">RESTRICTED PORTAL</span>
          <h2 className="admin-login-title">Sneheal Admin</h2>
          <p className="admin-login-subtitle">
            Sign in to manage and monitor the SnehealApp2026 platform.
          </p>
        </div>

        {activeError && (
          <div className="admin-alert-error" role="alert">
            {activeError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-username">
              Admin Username
            </label>
            <div className="admin-input-wrapper">
              <input
                id="admin-username"
                type="text"
                className="admin-form-input"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label" htmlFor="admin-password">
              Admin Password
            </label>
            <div className="admin-input-wrapper" style={{ position: 'relative' }}>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                className="admin-form-input"
                style={{ paddingRight: '40px' }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={isSubmitting}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                }}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn-primary"
            disabled={isSubmitting}
            style={{ marginTop: '8px' }}
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <FiLock size={16} />
                <span>Sign In to Admin Portal</span>
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <a
            href="/"
            style={{
              fontSize: '0.82rem',
              color: '#64748B',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            ← Return to public website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
