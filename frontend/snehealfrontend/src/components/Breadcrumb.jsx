import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="breadcrumb-item">
              {!isLast ? (
                <>
                  <Link to={item.link} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-separator">›</span>
                </>
              ) : (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
