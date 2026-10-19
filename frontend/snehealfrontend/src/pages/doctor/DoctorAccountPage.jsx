import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useDoctorAuth } from '../../context/DoctorAuthContext';

const DoctorAccountPage = () => {
  const { user, logout } = useDoctorAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <header className="doctor-page-header">
        <h1>Account</h1>
        <p>Your Sneheal doctor profile</p>
      </header>

      <div className="doctor-card doctor-account-card" style={{ maxWidth: 520 }}>
        <div className="doctor-account-field">
          <div className="doctor-account-label">Name</div>
          <div className="doctor-account-value">{user?.username || '—'}</div>
        </div>
        <div className="doctor-account-field">
          <div className="doctor-account-label">Mobile</div>
          <div className="doctor-account-value">{user?.phone || '—'}</div>
        </div>
        <div className="doctor-account-field">
          <div className="doctor-account-label">Language</div>
          <div className="doctor-account-value">{user?.language || '—'}</div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="btn-full mt-lg"
          onClick={handleLogout}
        >
          Sign out
        </Button>
      </div>
    </>
  );
};

export default DoctorAccountPage;
