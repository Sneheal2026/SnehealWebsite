import React from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { FiClock, FiUpload, FiUserCheck, FiHeadphones, FiCheckCircle, FiSmartphone } from 'react-icons/fi';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import { FeatureCard } from '../components/Cards';
import { SITE_INFO, VERIFIED_DISTRIBUTORS } from '../config/siteInfo';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: <FiClock size={26} />,
      title: 'Fast Delivery',
      description: 'Quick doorstep delivery built for tier 2 & 3 cities.'
    },
    {
      icon: <FiUpload size={26} />,
      title: 'Prescription Upload',
      description: 'Snap & upload — order medicines in seconds.'
    },
    {
      icon: <FiUserCheck size={26} />,
      title: 'Verified Doctors',
      description: 'Doctors review medicines & recommend proper care.'
    },
    {
      icon: <FiHeadphones size={26} />,
      title: 'Doctor Support',
      description: 'Health query help from verified doctors, anytime.'
    }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-inner">
          <h1 className="hero-title">
            Fast, Reliable <span className="hero-highlight">Medicine Delivery</span>
          </h1>
          <p className="hero-subtitle">
            India's medicine delivery app for tier 2 & 3 cities. Order, upload prescriptions, and get doctor-backed care — faster than the big apps.
          </p>
          <div className="hero-actions">
            <a href="#download-app">
              <Button variant="primary" size="large">Download App</Button>
            </a>
            <Link to="/services">
              <Button variant="outline" size="large">Our Services</Button>
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>Fast</strong><span>Delivery</span></div>
            <div className="hero-stat"><strong>24/7</strong><span>Doctor Support</span></div>
            <div className="hero-stat"><strong>100%</strong><span>Verified Supply</span></div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <SectionHeader
            title="Everything in One App"
            subtitle="Fast delivery, prescriptions, and doctor care — designed for your city."
          />
          <div className="grid grid-4 home-features">
            {features.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--alt">
        <div className="container">
          <div className="partners-strip">
            <span className="partners-label">Verified partners</span>
            <div className="partners-chips">
              {VERIFIED_DISTRIBUTORS.map((p, i) => (
                <span key={i} className="partner-chip">
                  <FiCheckCircle size={14} /> {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="download-section" id="download-app">
        <div className="container">
          <div className="download-panel">
            <div className="download-info">
              <span className="download-eyebrow">Available Now</span>
              <h2 className="download-title">Get the Sneheal App</h2>
              <p className="download-desc">
                Order medicines, upload prescriptions, and talk to verified doctors — launched {SITE_INFO.launchDate} from {SITE_INFO.launchCity}.
              </p>
              <div className="store-badges">
                <a href="/contact" className="store-badge store-badge--play" aria-label="Get on Google Play">
                  <FaGooglePlay className="store-badge-icon" />
                  <span className="store-badge-text">
                    <small>GET IT ON</small>
                    Google Play
                  </span>
                </a>
                <a href="/contact" className="store-badge store-badge--apple" aria-label="Download on App Store">
                  <FaApple className="store-badge-icon" />
                  <span className="store-badge-text">
                    <small>Download on the</small>
                    App Store
                  </span>
                </a>
              </div>
              <p className="download-hint">Contact us for download links & city availability.</p>
            </div>
            <div className="download-visual">
              <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <img src="/Sneheal-Logo.jpeg" alt="Sneheal app" className="phone-logo" />
                  <p className="phone-app-name">Sneheal</p>
                  <p className="phone-tagline">{SITE_INFO.tagline}</p>
                  <div className="phone-pill"><FiSmartphone size={14} /> Download to start</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
