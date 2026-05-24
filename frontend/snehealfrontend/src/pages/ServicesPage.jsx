import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiUpload, FiTruck, FiMapPin, FiAlertCircle, FiShield, FiCheckCircle, FiThermometer } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { ServiceCard, FeatureCard } from '../components/Cards';
import Button from '../components/Button';
import '../styles/pages/ServicesPage.css';

const ServicesPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Services', link: '/services' }
  ];

  const services = [
    {
      icon: <FiPackage size={28} />,
      title: 'Medicine Delivery',
      description: 'Order prescription and over-the-counter medicines from verified pharmacies and get them delivered to your doorstep.',
      link: { url: '/medicine-search', text: 'Browse Medicines →' }
    },
    {
      icon: <FiUpload size={28} />,
      title: 'Prescription Upload',
      description: 'Simply upload a photo of your prescription and we\'ll handle the rest. Our pharmacists will verify and process your order.',
      link: { url: '/medicine-search', text: 'Upload Now →' }
    },
    {
      icon: <FiTruck size={28} />,
      title: 'Express Delivery',
      description: 'Need medicines urgently? Our express delivery service ensures you receive your order within 2-4 hours.',
      link: { url: '/contact', text: 'Learn More →' }
    },
    {
      icon: <FiMapPin size={28} />,
      title: 'Nearby Pharmacy Support',
      description: 'Find and connect with licensed pharmacies in your area. Compare prices and availability in real-time.',
      link: { url: '/medicine-search', text: 'Find Pharmacies →' }
    },
    {
      icon: <FiAlertCircle size={28} />,
      title: 'Emergency Medicines',
      description: '24/7 emergency medicine delivery service for critical healthcare needs. Because emergencies don\'t wait.',
      link: { url: '/contact', text: 'Emergency Contact →' }
    }
  ];

  const qualityFeatures = [
    {
      icon: <FiShield size={32} />,
      title: 'Verified Pharmacies',
      description: 'All partner pharmacies undergo strict verification and licensing checks before joining our platform.'
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: 'Quality Checks',
      description: 'Multiple quality assurance steps ensure you receive only genuine, unexpired medicines.'
    },
    {
      icon: <FiThermometer size={32} />,
      title: 'Cold Chain Delivery',
      description: 'Temperature-controlled packaging for sensitive medicines that require specific storage conditions.'
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Header */}
      <section className="services-header">
        <div className="container">
          <h1 className="services-title">Our Services</h1>
          <p className="services-subtitle">
            Comprehensive healthcare delivery services designed to make your life easier and healthier.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="What We Offer"
            subtitle="From regular medicines to emergency delivery, we've got you covered"
          />
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="How We Ensure Quality"
            subtitle="Your health and safety are our top priorities"
          />
          <div className="grid grid-3">
            {qualityFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Info */}
      <section className="section">
        <div className="container">
          <div className="services-info-grid">
            <div className="services-info-card">
              <h3 className="info-card-title">For Patients</h3>
              <ul className="info-list">
                <li>Easy medicine ordering and tracking</li>
                <li>Prescription management and reminders</li>
                <li>Family account management</li>
                <li>24/7 customer support</li>
                <li>Multiple payment options</li>
              </ul>
            </div>
            <div className="services-info-card">
              <h3 className="info-card-title">For Pharmacies</h3>
              <ul className="info-list">
                <li>Expand your customer reach</li>
                <li>Digital order management system</li>
                <li>Real-time inventory tracking</li>
                <li>Secure payment processing</li>
                <li>Dedicated partner support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Need a Custom Healthcare Solution?</h2>
            <p className="cta-subtitle">
              We work with hospitals, clinics, and organizations to provide tailored medicine delivery services.
            </p>
            <Link to="/contact">
              <Button variant="accent" size="large">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
