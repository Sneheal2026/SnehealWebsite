import React from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiHeart, FiUsers, FiAward } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { FeatureCard } from '../components/Cards';
import Button from '../components/Button';
import { SITE_INFO, VERIFIED_DISTRIBUTORS } from '../config/siteInfo';
import '../styles/pages/AboutPage.css';

const AboutPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' }
  ];

  const values = [
    {
      icon: <FiHeart size={32} />,
      title: 'Patient-First',
      description: 'Every feature — from fast delivery to doctor consultations — puts patient health first.'
    },
    {
      icon: <FiTarget size={32} />,
      title: 'Tier 2 & 3 Focus',
      description: 'We build for cities where major apps are slow, unavailable, or simply do not serve well enough.'
    },
    {
      icon: <FiAward size={32} />,
      title: 'Genuine Medicines',
      description: 'Only verified distributors and licensed partners like Baldawa Enterprises supply our medicines.'
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Doctor-Backed Care',
      description: 'Verified doctors review prescriptions, recommend proper healthcare, and answer your health queries.'
    }
  ];

  const timeline = [
    {
      year: 'May 2026',
      title: 'Official Launch',
      description: `Sneheal launched in ${SITE_INFO.launchCity} — bringing fast medicine delivery, prescription upload, and verified doctor support to tier 2 and tier 3 cities.`
    },
    {
      year: '2026',
      title: 'Verified Distribution Network',
      description: 'Partnered with trusted distributors including Baldawa Enterprises and regional licensed pharmacies for genuine medicine supply.'
    },
    {
      year: 'Next',
      title: 'City Expansion',
      description: 'Expanding across more tier 2 and tier 3 cities in Maharashtra and beyond, where fast healthcare delivery is needed most.'
    },
    {
      year: 'Future',
      title: 'Smarter Healthcare',
      description: 'Enhanced doctor consultations, family health management, and AI-assisted medicine and wellness guidance.'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <section className="about-header">
        <div className="container">
          <span className="page-badge">Launched {SITE_INFO.launchDate}</span>
          <h1 className="about-title">About Sneheal</h1>
          <p className="about-subtitle">
            Sneheal is a fast medicine delivery app built for tier 2 and tier 3 cities — where major platforms take too long or do not reach customers properly.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-mission-card">
              <h2 className="vision-mission-title">Our Vision</h2>
              <p className="vision-mission-text">
                A India where every city — not just metros — has access to fast, genuine medicine delivery and verified doctor support. We believe tier 2 and tier 3 cities deserve the same quality of healthcare technology as big cities.
              </p>
            </div>
            <div className="vision-mission-card">
              <h2 className="vision-mission-title">Our Mission</h2>
              <p className="vision-mission-text">
                To deliver medicines quickly and reliably, enable easy prescription uploads, and connect customers with verified doctors who review medicines and provide health guidance — all through one trusted app, starting from Solapur, Maharashtra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="Why Tier 2 & Tier 3 Cities Need Sneheal"
            subtitle="Major delivery apps often overlook smaller cities. Long wait times and unreliable service leave patients waiting when they need care most."
          />
          <div className="accessibility-content">
            <div className="accessibility-text">
              <p>
                In cities like Solapur and across tier 2 and tier 3 India, patients frequently wait hours for medicine delivery — or find that popular apps do not serve their area properly. Sneheal was built specifically to solve this problem.
              </p>
              <p>
                We combine fast delivery, prescription upload, verified medicine distributors, and on-call doctor support into one platform. Our doctors check patient medicines, recommend proper healthcare, and are available whenever you have a health-related question.
              </p>
            </div>
            <div className="accessibility-stats">
              <div className="accessibility-stat">
                <div className="stat-number">Fast</div>
                <div className="stat-label">Reliable delivery in supported areas</div>
              </div>
              <div className="accessibility-stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Verified distributors & licensed partners</div>
              </div>
              <div className="accessibility-stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Doctor support for health queries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            title="Our Distribution Partners"
            subtitle="Genuine medicines through verified supply chain partners"
          />
          <div className="about-partners-grid">
            {VERIFIED_DISTRIBUTORS.map((partner, index) => (
              <div key={index} className="about-partner-card">
                <h3 className="about-partner-name">{partner.name}</h3>
                <p className="about-partner-role">{partner.role}</p>
                <p className="about-partner-desc">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles behind every delivery and every doctor consultation"
          />
          <div className="grid grid-4">
            {values.map((value, index) => (
              <FeatureCard key={index} icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            title="Our Journey"
            subtitle={`From launch in ${SITE_INFO.launchDate} to building India's tier 2 & 3 healthcare network`}
          />
          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Experience Sneheal in Your City</h2>
            <p className="cta-subtitle">
              Download the app or contact us to learn about availability in your area.
            </p>
            <div className="cta-buttons">
              <a href="/#download-app">
                <Button variant="primary" size="large">Download App</Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="large">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
