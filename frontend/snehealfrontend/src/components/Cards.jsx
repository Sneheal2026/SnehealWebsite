import React from 'react';
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

const TestimonialCard = ({ quote, author, role }) => {
  return (
    <div className="testimonial-card">
      <p className="testimonial-quote">"{quote}"</p>
      <div className="testimonial-author">
        <p className="testimonial-name">{author}</p>
        <p className="testimonial-role">{role}</p>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <div className="service-card">
      <div className="service-card-icon">{icon}</div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      {link && <a href={link.url} className="service-card-link">{link.text}</a>}
    </div>
  );
};

const StatCard = ({ number, label }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-number">{number}</div>
      <p className="stat-card-label">{label}</p>
    </div>
  );
};

export { FeatureCard, TestimonialCard, ServiceCard, StatCard };
