import React from 'react';
import { Link } from 'react-router-dom';

const DoctorSiteHomeLink = ({ variant = 'default', className = '' }) => {
  const classes = [
    'doctor-site-home-link',
    variant === 'topbar' ? 'doctor-site-home-link--topbar' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link to="/" className={classes}>
      ← Sneheal home
    </Link>
  );
};

export default DoctorSiteHomeLink;
