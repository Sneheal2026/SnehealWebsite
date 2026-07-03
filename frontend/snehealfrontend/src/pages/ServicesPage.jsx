import React from 'react';
import { FiPackage, FiUpload, FiUserCheck, FiMessageCircle, FiClock, FiShield, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { ServiceCard, FeatureCard } from '../components/Cards';
import Button from '../components/Button';
import { SITE_INFO, VERIFIED_DISTRIBUTORS } from '../config/siteInfo';
import '../styles/pages/ServicesPage.css';

const ServicesPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Services', link: '/services' }
  ];

  const services = [
    {
      icon: <FiClock size={28} />,
      title: 'Fast Medicine Delivery',
      description: 'Order medicines and get them delivered quickly — designed for tier 2 and tier 3 cities where other apps are too slow.',
      link: { url: '/#download-app', text: 'Download App →' }
    },
    {
      icon: <FiUpload size={28} />,
      title: 'Prescription Upload',
      description: 'Upload a photo of your prescription in the app. Our team and verified doctors process it so you can order the right medicines quickly.',
      link: { url: '/#download-app', text: 'Upload Prescription →' }
    },
    {
      icon: <FiPackage size={28} />,
      title: 'Medicine Ordering',
      description: 'Search and order prescription and over-the-counter medicines from verified distributors and licensed pharmacy partners.',
      link: { url: '/#download-app', text: 'Order Medicines →' }
    },
    {
      icon: <FiUserCheck size={28} />,
      title: 'Verified Doctor Review',
      description: 'Licensed doctors review your medicines and patient needs, recommending proper healthcare and ensuring safe prescriptions.',
      link: { url: '/contact', text: 'Learn More →' }
    },
    {
      icon: <FiMessageCircle size={28} />,
      title: 'Doctor Support On Demand',
      description: 'Connect with verified doctors for any health-related query — get guidance and answers when you need them.',
      link: { url: '/contact', text: 'Get Support →' }
    }
  ];

  const qualityFeatures = [
    {
      icon: <FiShield size={32} />,
      title: 'Verified Distributors',
      description: `Partners like ${VERIFIED_DISTRIBUTORS[0].name} ensure every medicine is genuine and properly sourced.`
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: 'Doctor-Verified Orders',
      description: 'Prescriptions are reviewed by licensed doctors before medicines are dispensed and delivered.'
    },
    {
      icon: <FiMapPin size={32} />,
      title: 'Built for Your City',
      description: `Launched in ${SITE_INFO.launchCity}, focused on tier 2 and tier 3 cities that need faster healthcare.`
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <section className="services-header">
        <div className="container">
          <span className="page-badge">Sneheal App Services</span>
          <h1 className="services-title">Our Services</h1>
          <p className="services-subtitle">
            Fast medicine delivery, prescription upload, and verified doctor support — everything you need in one app.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            title="What Sneheal Offers"
            subtitle="Healthcare services built for speed, trust, and tier 2 & 3 city needs"
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

      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="How We Ensure Quality & Safety"
            subtitle="Your health and trust are our highest priorities"
          />
          <div className="grid grid-3">
            {qualityFeatures.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-info-grid">
            <div className="services-info-card">
              <h3 className="info-card-title">For Patients & Families</h3>
              <ul className="info-list">
                <li>Fast medicine delivery in supported areas</li>
                <li>Easy prescription upload and medicine search</li>
                <li>Verified doctors review your medicines</li>
                <li>On-demand doctor support for health queries</li>
                <li>Family account management in the app</li>
              </ul>
            </div>
            <div className="services-info-card">
              <h3 className="info-card-title">For Partners & Distributors</h3>
              <ul className="info-list">
                <li>Join our verified distributor network</li>
                <li>Reach customers in tier 2 & 3 cities</li>
                <li>Digital order and inventory management</li>
                <li>Transparent partnership with Sneheal</li>
                <li>Dedicated partner support team</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready for Fast Medicine Delivery?</h2>
            <p className="cta-subtitle">
              Download the Sneheal app or contact us to check availability in your city.
            </p>
            <a href="/#download-app">
              <Button variant="accent" size="large">Download Sneheal App</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
