import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiShield, FiHeadphones, FiSearch, FiMapPin, FiHeart, FiUsers, FiStar, FiTrendingUp } from 'react-icons/fi';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import { FeatureCard, TestimonialCard, StatCard } from '../components/Cards';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: <FiPackage size={32} />,
      title: 'Wide Medicine Range',
      description: 'Access thousands of medicines and health products from verified pharmacies across the country.'
    },
    {
      icon: <FiClock size={32} />,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered within hours with our express delivery service.'
    },
    {
      icon: <FiShield size={32} />,
      title: 'Verified Pharmacies',
      description: 'All partner pharmacies are licensed and verified for quality assurance.'
    },
    {
      icon: <FiHeadphones size={32} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to help you with orders and queries.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      icon: <FiSearch size={32} />,
      title: 'Search & Upload',
      description: 'Search for medicines or upload your prescription through our easy-to-use platform.'
    },
    {
      step: '02',
      icon: <FiMapPin size={32} />,
      title: 'Choose Pharmacy',
      description: 'Select from nearby verified pharmacies based on availability and pricing.'
    },
    {
      step: '03',
      icon: <FiPackage size={32} />,
      title: 'Fast Delivery',
      description: 'Receive your medicines at your doorstep with safe and secure delivery.'
    }
  ];

  const platformFeatures = [
    { icon: <FiHeart size={28} />, title: 'Health Records', description: 'Maintain digital health records and prescription history' },
    { icon: <FiUsers size={28} />, title: 'Family Accounts', description: 'Manage medicines for your entire family in one place' },
    { icon: <FiStar size={28} />, title: 'Reviews & Ratings', description: 'Read genuine reviews from verified customers' },
    { icon: <FiTrendingUp size={28} />, title: 'Price Comparison', description: 'Compare prices across multiple pharmacies' },
    { icon: <FiShield size={28} />, title: 'Secure Payments', description: 'Multiple secure payment options for your convenience' },
    { icon: <FiClock size={28} />, title: 'Order Tracking', description: 'Real-time tracking of your medicine delivery' }
  ];

  const benefits = [
    'Save time with home delivery of medicines',
    'Access to verified and licensed pharmacies',
    'Competitive pricing with transparent costs',
    'Emergency medicine delivery available 24/7',
    'Prescription management and reminders',
    'Dedicated customer support team'
  ];

  const stats = [
    { number: '10,000+', label: 'Orders Delivered' },
    { number: '500+', label: 'Partner Pharmacies' },
    { number: '24/7', label: 'Customer Support' },
    { number: '98%', label: 'Customer Satisfaction' }
  ];

  const testimonials = [
    {
      quote: 'Sneheal has made it so much easier to manage my parents medications. The delivery is always on time and the service is excellent.',
      author: 'Sarah Johnson',
      role: 'Regular Customer'
    },
    {
      quote: 'As someone with a chronic condition, having reliable medicine delivery is crucial. Sneheal has been a lifesaver, literally.',
      author: 'Michael Chen',
      role: 'Healthcare Advocate'
    },
    {
      quote: 'The prescription upload feature is fantastic. I just take a photo and my medicines are delivered within hours. Highly recommend!',
      author: 'Priya Sharma',
      role: 'Verified User'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container container">
          <div className="hero-content">
            <h1 className="hero-title">Healthcare Delivered to Your Doorstep</h1>
            <p className="hero-subtitle">
              Experience the future of healthcare with Sneheal. Get genuine medicines from verified pharmacies delivered fast, safe, and reliable. Because your health can't wait.
            </p>
            <div className="hero-buttons">
              <Link to="/medicine-search">
                <Button variant="primary" size="large">Explore Services</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="large">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sneheal Section */}
      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="Why Sneheal?"
            subtitle="We're revolutionizing healthcare accessibility by bringing medicines directly to you, eliminating the hassle of pharmacy visits."
          />
          <div className="grid grid-4">
            {features.map((feature, index) => (
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

      {/* How It Works Section */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="How It Works"
            subtitle="Getting your medicines has never been easier. Just three simple steps."
          />
          <div className="how-it-works-grid">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            title="Platform Features"
            subtitle="Everything you need for a seamless healthcare experience"
          />
          <div className="grid grid-3">
            {platformFeatures.map((feature, index) => (
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

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <div className="benefits-container">
            <div className="benefits-content">
              <SectionHeader
                title="Benefits That Matter"
                subtitle="We're committed to making healthcare accessible, affordable, and convenient for everyone."
                align="left"
              />
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="benefit-item">
                    <FiShield className="benefit-icon" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="benefits-visual">
              <div className="benefits-illustration">
                <FiHeart size={120} />
                <p>Caring for your health, always</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} number={stat.number} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience Better Healthcare?</h2>
            <p className="cta-subtitle">
              Join thousands of users who trust Sneheal for their medicine delivery needs.
            </p>
            <Link to="/medicine-search">
              <Button variant="accent" size="large">Start Ordering Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <SectionHeader
            title="What Our Users Say"
            subtitle="Real stories from real people who trust Sneheal"
          />
          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Download Banner Section */}
      <section className="download-section">
        <div className="container">
          <div className="download-content">
            <h2 className="download-title">Mobile App Coming Soon</h2>
            <p className="download-subtitle">
              Get Sneheal on your phone for an even better experience. Stay tuned!
            </p>
            <div className="download-buttons">
              <button className="store-button" disabled>
                <span>App Store</span>
              </button>
              <button className="store-button" disabled>
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
