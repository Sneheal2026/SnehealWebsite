import React from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiHeart, FiTrendingUp, FiGlobe, FiUsers, FiAward } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { FeatureCard } from '../components/Cards';
import Button from '../components/Button';
import '../styles/pages/AboutPage.css';

const AboutPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' }
  ];

  const values = [
    {
      icon: <FiHeart size={32} />,
      title: 'Patient-First Approach',
      description: 'Every decision we make prioritizes patient health and wellbeing above all else.'
    },
    {
      icon: <FiTarget size={32} />,
      title: 'Accessibility',
      description: 'We believe healthcare should be accessible to everyone, regardless of location.'
    },
    {
      icon: <FiAward size={32} />,
      title: 'Quality Assurance',
      description: 'Only verified pharmacies and genuine medicines make it to our platform.'
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Community Trust',
      description: 'Building long-term relationships through transparency and reliability.'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'Sneheal officially launched with 50 partner pharmacies in our first city.'
    },
    {
      year: '2025',
      title: 'Regional Expansion',
      description: 'Expanded to 10 major cities with over 500 partner pharmacies.'
    },
    {
      year: '2026',
      title: 'Nationwide Coverage',
      description: 'Achieved presence across all major cities with 24/7 delivery services.'
    },
    {
      year: 'Future',
      title: 'AI-Powered Health Assistant',
      description: 'Launching intelligent health recommendations and automated prescription management.'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Header */}
      <section className="about-header">
        <div className="container">
          <h1 className="about-title">About Sneheal</h1>
          <p className="about-subtitle">
            We're on a mission to make healthcare accessible, affordable, and convenient for everyone.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section">
        <div className="container">
          <div className="vision-mission-grid">
            <div className="vision-mission-card">
              <h2 className="vision-mission-title">Our Vision</h2>
              <p className="vision-mission-text">
                A world where everyone has instant access to genuine medicines and quality healthcare services, regardless of their location or circumstances. We envision a future where technology bridges the gap between patients and healthcare providers.
              </p>
            </div>
            <div className="vision-mission-card">
              <h2 className="vision-mission-title">Our Mission</h2>
              <p className="vision-mission-text">
                To revolutionize medicine delivery by creating a trusted platform that connects patients with verified pharmacies, ensuring fast, safe, and reliable access to healthcare products while maintaining the highest standards of quality and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Healthcare Accessibility Matters */}
      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="Why Healthcare Accessibility Matters"
            subtitle="Millions of people face challenges accessing essential medicines daily. We're here to change that."
          />
          <div className="accessibility-content">
            <div className="accessibility-text">
              <p>
                Healthcare accessibility is not just a convenience—it's a fundamental right. In many areas, people struggle to find nearby pharmacies, face long wait times, or lack access to essential medications. Sneheal addresses these challenges head-on.
              </p>
              <p>
                By leveraging technology and building a network of verified pharmacies, we ensure that quality healthcare reaches every doorstep. Our platform eliminates geographical barriers, reduces wait times, and provides a seamless experience for patients and caregivers alike.
              </p>
            </div>
            <div className="accessibility-stats">
              <div className="accessibility-stat">
                <div className="stat-number">4.5B+</div>
                <div className="stat-label">People lack access to essential medicines globally</div>
              </div>
              <div className="accessibility-stat">
                <div className="stat-number">50%</div>
                <div className="stat-label">Patients don't take medicines as prescribed</div>
              </div>
              <div className="accessibility-stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Health emergencies don't wait—and neither do we</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid grid-4">
            {values.map((value, index) => (
              <FeatureCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="Our Journey & Future Goals"
            subtitle="From startup to nationwide healthcare revolution"
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Us in Transforming Healthcare</h2>
            <p className="cta-subtitle">
              Whether you're a patient, caregiver, or pharmacy partner, there's a place for you in the Sneheal community.
            </p>
            <div className="cta-buttons">
              <Link to="/services">
                <Button variant="primary" size="large">Explore Services</Button>
              </Link>
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
