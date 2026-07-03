import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiChevronDown } from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import { FormInput, FormTextarea, FormSelect } from '../components/FormInputs';
import Button from '../components/Button';
import { SITE_CONTACT, SITE_INFO } from '../config/siteInfo';
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
    { value: 'app', label: 'App Download / Support' },
    { value: 'delivery', label: 'Medicine Delivery' },
    { value: 'doctor', label: 'Doctor Consultation' },
    { value: 'partnership', label: 'Partnership / Distributor' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const faqs = [
    {
      question: 'How fast is Sneheal medicine delivery?',
      answer: 'Sneheal offers fast medicine delivery in supported tier 2 and tier 3 city areas. Delivery time may vary slightly based on location and order volume.'
    },
    {
      question: 'How do I upload a prescription?',
      answer: 'Open the Sneheal app, go to the prescription upload section, take a clear photo of your prescription, and submit. Our team and verified doctors will verify it before processing your order.'
    },
    {
      question: 'Are the medicines genuine?',
      answer: 'Yes. Sneheal works with verified distributors including Baldawa Enterprises and licensed pharmacy partners. All medicines go through quality checks before delivery.'
    },
    {
      question: 'Can I talk to a doctor through Sneheal?',
      answer: 'Yes. Verified doctors on Sneheal review your medicines, recommend proper healthcare, and are available to support you with health-related queries when needed.'
    },
    {
      question: 'Which cities does Sneheal serve?',
      answer: `Sneheal launched in ${SITE_INFO.launchDate} from ${SITE_INFO.launchCity}. We are expanding to more tier 2 and tier 3 cities. Contact us to check availability in your area.`
    },
    {
      question: 'How do I download the Sneheal app?',
      answer: 'Contact us via phone or email for app download links. We will guide you based on your device and city availability.'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <section className="contact-header">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Questions about medicine delivery, prescription upload, doctor support, or app download? We are here to help.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrapper">
              <h2 className="form-section-title">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <FormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={SITE_CONTACT.phone}
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
                  placeholder="Tell us about your query — delivery area, prescription, doctor support, etc."
                  required
                />
                <Button type="submit" variant="primary" size="large" className="btn-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="contact-info">
              <h2 className="info-section-title">Contact Information</h2>

              <div className="info-cards">
                <div className="info-card">
                  <FiMail className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Email</h3>
                    <a href={`mailto:${SITE_CONTACT.email}`} className="info-link">{SITE_CONTACT.email}</a>
                  </div>
                </div>

                <div className="info-card">
                  <FiPhone className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Phone</h3>
                    <a href={SITE_CONTACT.phoneHref} className="info-link">{SITE_CONTACT.phone}</a>
                  </div>
                </div>

                <div className="info-card">
                  <FiMapPin className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Address</h3>
                    <p className="info-text">{SITE_CONTACT.address}</p>
                  </div>
                </div>

                <div className="info-card">
                  <FiClock className="info-icon" />
                  <div className="info-content">
                    <h3 className="info-title">Working Hours</h3>
                    <p className="info-text">24/7 App & Delivery Support</p>
                    <p className="info-text">Office: Mon - Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="support-info">
                <h3 className="support-title">Need Urgent Help?</h3>
                <p className="support-text">
                  For urgent medicine delivery or doctor support queries, call our helpline directly.
                </p>
                <a href={SITE_CONTACT.phoneHref} className="support-phone">{SITE_CONTACT.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="map-header">
            <h3 className="map-title">Our Office — {SITE_INFO.launchCity}</h3>
            <p className="map-address">{SITE_CONTACT.address}</p>
            <a
              href={SITE_CONTACT.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="map-directions-link"
            >
              Get directions on Google Maps
            </a>
          </div>
          <div className="map-embed-wrapper">
            <iframe
              title="Sneheal office location in Solapur"
              src={SITE_CONTACT.mapEmbedUrl}
              className="map-embed"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

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
