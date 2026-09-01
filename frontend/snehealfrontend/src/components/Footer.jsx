import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { SITE_CONTACT, SITE_INFO } from '../config/siteInfo';
import { scrollToTop } from '../utils/scroll';
import '../styles/components/Footer.css';

const FooterNavLink = ({ to, children }) => (
  <Link to={to} className="footer-link" onClick={() => scrollToTop('smooth')}>
    {children}
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <img src="/Sneheal-Logo.jpeg" alt="Sneheal Logo" className="footer-logo-image" />
            <p className="footer-tagline">
              {SITE_INFO.tagline} for tier 2 & tier 3 cities. Genuine medicines, prescription upload, and verified doctor support — launched {SITE_INFO.launchDate} from {SITE_INFO.launchCity}.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><FooterNavLink to="/">Home</FooterNavLink></li>
              <li><FooterNavLink to="/about">About Us</FooterNavLink></li>
              <li><FooterNavLink to="/services">Services</FooterNavLink></li>
              <li><FooterNavLink to="/contact">Contact</FooterNavLink></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">App Services</h4>
            <ul className="footer-links">
              <li><FooterNavLink to="/services">Fast Delivery</FooterNavLink></li>
              <li><FooterNavLink to="/services">Prescription Upload</FooterNavLink></li>
              <li><FooterNavLink to="/services">Verified Doctors</FooterNavLink></li>
              <li><FooterNavLink to="/services">Health Query Support</FooterNavLink></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <FiMail className="footer-icon" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="footer-contact-link">{SITE_CONTACT.email}</a>
              </li>
              <li>
                <FiPhone className="footer-icon" />
                <a href={SITE_CONTACT.phoneHref} className="footer-contact-link">{SITE_CONTACT.phone}</a>
              </li>
              <li>
                <FiMapPin className="footer-icon" />
                <span>{SITE_CONTACT.address}</span>
              </li>
            </ul>
          </div>

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

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Sneheal. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <FooterNavLink to="/privacy-policy">Privacy Policy</FooterNavLink>
            <Link to="/contact" className="footer-bottom-link" onClick={() => scrollToTop('smooth')}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
