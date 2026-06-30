import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        className={`navbar-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
      />
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/" onClick={closeMenu}>
              <img src="/Sneheal-Logoo.png" alt="Sneheal Logo" className="logo-image" />
              <span className="logo-tagline">Sneheal</span>
            </Link>
          </div>

          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.path} className="navbar-item">
                <Link
                  to={link.path}
                  className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="navbar-item navbar-cta">
              <a href="#download-app" className="btn btn-primary btn-small" onClick={closeMenu}>
                Download App
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
