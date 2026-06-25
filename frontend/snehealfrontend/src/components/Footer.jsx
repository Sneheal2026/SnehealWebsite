import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import '../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-column">
            <img src="/Sneheal-Logo.jpeg" alt="Sneheal Logo" className="footer-logo-image" />
            <p className="footer-tagline">
              Delivering healthcare to your doorstep. Trusted medicine delivery platform for a healthier tomorrow.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><Link to="/medicine-search" className="footer-link">Medicine Delivery</Link></li>
              <li><Link to="/services" className="footer-link">Prescription Upload</Link></li>
              <li><Link to="/services" className="footer-link">Emergency Medicines</Link></li>
              <li><Link to="/services" className="footer-link">Health Products</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <FiMail className="footer-icon" />
                <a href="mailto:support@sneheal.com" className="footer-contact-link">support@sneheal.com</a>
              </li>
              <li>
                <FiPhone className="footer-icon" />
                <a href="tel:+917517434102" className="footer-contact-link">+91 7517434102</a>
              </li>
              <li>
                <FiMapPin className="footer-icon" />
                <span>123 Solapur, Maharashtra</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-social">
              <a href="/" className="footer-social-link" aria-label="Facebook">
                <FiFacebook size={20} />
              </a>
              <a href="/" className="footer-social-link" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="/" className="footer-social-link" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="/" className="footer-social-link" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Sneheal. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="/" className="footer-bottom-link">Privacy Policy</a>
            <a href="/" className="footer-bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
