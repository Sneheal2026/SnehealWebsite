import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiChevronDown } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { FormInput, FormTextarea, FormSelect } from '../components/FormInputs';
import Button from '../components/Button';
import '../styles/pages/ContactPage.css';

const ContactPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Contact', link: '/contact' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Customer Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' }
  ];

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order by visiting our Medicine Search page, searching for your required medicine, and following the checkout process.'
    },
    {
      question: 'What are your delivery hours?',
      answer: 'We offer 24/7 delivery services. Standard delivery is available from 8 AM to 10 PM, while emergency delivery is available round the clock.'
    },
    {
      question: 'How can I upload my prescription?',
      answer: 'During the ordering process, you\'ll find an option to upload your prescription. Simply take a clear photo and upload it through our platform.'
    },
    {
      question: 'Are the medicines genuine?',
      answer: 'Absolutely! All our partner pharmacies are verified and licensed. We maintain strict quality checks to ensure you receive only genuine medicines.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is confirmed, you\'ll receive a tracking link via email and SMS. You can track your delivery in real-time.'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Header */}
      <section className="contact-header">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have questions or need assistance? We're here to help you with anything you need.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2 className="form-section-title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <FormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (234) 567-890"
                />
                <FormSelect
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  options={subjectOptions}
                  required
                />
                <FormTextarea
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
                <Button type="submit" variant="primary" size="large" className="btn-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Company Info */}
            <div className="contact-info">
              <h2 className="info-section-title">Contact Information</h2>
              
              <div className="info-cards">
                <div className="info-card">
                  <FiMail className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Email</h3>
                    <a href="mailto:support@sneheal.com" className="info-link">support@sneheal.com</a>
                  </div>
                </div>

                <div className="info-card">
                  <FiPhone className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Phone</h3>
                    <a href="tel:+1234567890" className="info-link">+1 (234) 567-890</a>
                  </div>
                </div>

                <div className="info-card">
                  <FiMapPin className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Address</h3>
                    <p className="info-text">123 Healthcare Ave, Medical City, MC 12345</p>
                  </div>
                </div>

                <div className="info-card">
                  <FiClock className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Working Hours</h3>
                    <p className="info-text">24/7 Customer Support Available</p>
                    <p className="info-text">Office: Mon - Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="support-info">
                <h3 className="support-title">Need Immediate Assistance?</h3>
                <p className="support-text">
                  For urgent queries or emergency medicine delivery, please call our 24/7 helpline.
                </p>
                <a href="tel:+1234567890" className="support-phone">+1 (234) 567-890</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="map-section">
        <div className="map-placeholder">
          <FiMapPin size={48} />
          <h3>Map Integration Coming Soon</h3>
          <p>We're working on integrating interactive maps to help you find nearby pharmacies.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="faq-section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className="faq-question">
                  <FiChevronDown className="faq-icon" />
                  <h3 className="faq-question-text">{faq.question}</h3>
                </div>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
