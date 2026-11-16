import React from 'react';
import { FiClock } from 'react-icons/fi';

const AdminPlaceholderPage = ({ title, description, moduleName }) => {
  return (
    <div className="admin-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#ECFDF5',
          color: '#10B981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}
      >
        <FiClock size={32} />
      </div>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0B2545', margin: '0 0 8px 0' }}>
        {title}
      </h2>
      <p style={{ maxWidth: '480px', margin: '0 auto 24px', color: '#64748B', fontSize: '0.92rem' }}>
        {description || `The ${moduleName || 'module'} is connected to SnehealApp2026 and ready for detailed views.`}
      </p>
      <div
        style={{
          display: 'inline-block',
          padding: '6px 16px',
          backgroundColor: '#F1F5F9',
          color: '#475569',
          borderRadius: '999px',
          fontSize: '0.82rem',
          fontWeight: 600,
        }}
      >
        Secure Admin Section • SnehealApp2026
      </div>
    </div>
  );
};

export default AdminPlaceholderPage;
