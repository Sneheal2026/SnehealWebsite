import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Cards.css';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">{icon}</div>
      <h3 className="feature-card-title">{title}</h3>
      <p className="feature-card-description">{description}</p>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <div className="service-card">
      <div className="service-card-icon">{icon}</div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      {link && (
        link.url.startsWith('/') && !link.url.includes('#')
          ? <Link to={link.url} className="service-card-link">{link.text}</Link>
          : <a href={link.url} className="service-card-link">{link.text}</a>
      )}
    </div>
  );
};

export { FeatureCard, ServiceCard };
