import React from 'react';
import '../styles/components/SectionHeader.css';

const SectionHeader = ({ title, subtitle, align = 'center', light = false }) => {
  const classes = `section-header ${align === 'left' ? 'align-left' : 'align-center'} ${light ? 'light' : ''}`.trim();
  
  return (
    <div className={classes}>
      <h2 className="section-header-title">{title}</h2>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
