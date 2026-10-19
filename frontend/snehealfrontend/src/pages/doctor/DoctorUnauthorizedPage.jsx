import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { DoctorRequireSession } from '../../components/doctor/DoctorRouteGuards';
import { useDoctorAuth } from '../../context/DoctorAuthContext';
import '../../styles/doctor/doctor-portal.css';

const DoctorUnauthorizedPage = () => {
  const { logout, user } = useDoctorAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/doctor/login', { replace: true });
  };

  return (
    <DoctorRequireSession>
      <div className="doctor-shell doctor-main--centered">
        <div className="doctor-card">
          <h1 className="doctor-card__title">Not authorized</h1>
          <p className="doctor-card__lead">
            This portal is only for registered Sneheal doctors.
            {user?.phone ? (
              <>
                {' '}
                The number <strong>{user.phone}</strong> is not registered as a doctor account.
              </>
            ) : null}
          </p>
          <Button type="button" variant="primary" className="btn-full" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </div>
    </DoctorRequireSession>
  );
};

export default DoctorUnauthorizedPage;
