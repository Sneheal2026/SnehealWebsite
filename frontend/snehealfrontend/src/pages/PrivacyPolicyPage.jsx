import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { SITE_CONTACT } from '../config/siteInfo';
import '../styles/pages/PrivacyPolicyPage.css';

const LAST_UPDATED = 'September 1, 2026';

const PrivacyPolicyPage = () => {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Privacy Policy', link: '/privacy-policy' }
  ];

  return (
    <div className="legal-page">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <section className="legal-header">
        <div className="container">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Sneheal Health Private Limited · Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="legal-content section">
        <div className="container">
          <article className="legal-document">
            <p className="legal-intro">
              Sneheal Health Private Limited (&quot;Sneheal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Sneheal mobile application and website (
              <a href="https://www.sneheal.com" target="_blank" rel="noopener noreferrer">www.sneheal.com</a>
              ) (collectively, the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our Service.
            </p>
            <p className="legal-intro">
              By using Sneheal, you agree to the collection and use of information in accordance with this policy.
            </p>

            <section className="legal-section">
              <h2>1. Information We Collect</h2>

              <h3>1.1 Personal Information You Provide</h3>
              <ul>
                <li>Name, phone number, email address</li>
                <li>Delivery address and location data</li>
                <li>Prescription images/photos you upload for medicine ordering</li>
                <li>Payment information (processed securely via our payment partner; we do not store card details)</li>
                <li>Health-related information you voluntarily share with our AI health companion (e.g., medicine schedules, chronic conditions you disclose)</li>
              </ul>

              <h3>1.2 Information Collected Automatically</h3>
              <ul>
                <li>Device information (device type, operating system, unique device identifiers)</li>
                <li>Location data (precise location, only when you grant permission, used to determine delivery address and estimate delivery time)</li>
                <li>App usage data (features used, order history, session duration)</li>
                <li>Voice data, when you use our voice ordering feature (processed to convert speech to text for order placement)</li>
              </ul>

              <h3>1.3 Camera and Microphone Access</h3>
              <p>
                Sneheal requests camera access to allow you to photograph prescriptions for our AI-based prescription scanning feature, and microphone access to allow voice-based medicine ordering in Hindi, Marathi, and English. These permissions are used only when you actively use these features and are never accessed in the background.
              </p>
            </section>

            <section className="legal-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and deliver your medicine orders</li>
                <li>Verify and interpret prescriptions using AI-based OCR (Optical Character Recognition) technology</li>
                <li>Enable voice-based ordering</li>
                <li>Send delivery updates and order confirmations</li>
                <li>Provide medicine reminders and health check-ins (only if you opt in to this feature)</li>
                <li>Improve our AI models for prescription scanning and voice recognition</li>
                <li>Communicate with you regarding your account and orders</li>
                <li>Comply with legal and regulatory requirements applicable to pharmaceutical delivery services in India</li>
              </ul>
            </section>

            <section className="legal-section legal-section--highlight">
              <h2>3. Important Disclosure — Medical Information</h2>
              <p className="legal-emphasis">
                Sneheal is a medicine delivery and ordering platform. It is not a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <ul>
                <li>All medicines delivered through Sneheal are sold and billed by our licensed pharmacy partner, in accordance with applicable drug licensing laws in India.</li>
                <li>Our AI prescription scanning feature is a technology tool to assist in reading and processing prescriptions accurately. It does not replace verification by a licensed pharmacist. All orders are subject to verification before dispatch.</li>
                <li>Our AI health companion feature provides general medicine reminders and check-ins based on information you provide. It does not provide medical diagnosis, treatment recommendations, or emergency medical assistance. In case of a medical emergency, please contact a licensed medical professional or emergency services immediately.</li>
                <li>Any health-related information shared with our AI companion is used solely to provide reminders and follow-ups and is not shared with third parties for marketing purposes.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>4. How We Share Your Information</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul>
                <li><strong>Our licensed pharmacy partner</strong> (for order fulfillment, billing, and regulatory compliance)</li>
                <li><strong>Delivery partners/riders</strong> (limited to name, address, and phone number necessary for delivery)</li>
                <li><strong>Payment processors</strong> (to process transactions securely)</li>
                <li><strong>Service providers</strong> who assist us in operating the Service (e.g., cloud hosting, AI processing providers), bound by confidentiality obligations</li>
                <li><strong>Law enforcement or regulatory authorities</strong>, when required by applicable law, including drug and pharmacy regulations in India</li>
              </ul>
              <p>We do not share your prescription images or health information with any third party for advertising purposes.</p>
            </section>

            <section className="legal-section">
              <h2>5. Data Storage and Security</h2>
              <ul>
                <li>Your data is stored on secure cloud servers with industry-standard encryption.</li>
                <li>We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</li>
                <li>Prescription images are retained only as long as necessary to fulfill your order and comply with applicable pharmacy record-keeping regulations.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>6. Your Rights and Choices</h2>
              <p>You may:</p>
              <ul>
                <li>Access, update, or correct your personal information through the app settings</li>
                <li>Request deletion of your account and associated data by contacting us (subject to regulatory record-keeping requirements for pharmacy transactions)</li>
                <li>Opt out of promotional communications at any time</li>
                <li>Disable location, camera, or microphone permissions through your device settings (note: this may limit certain app features)</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2>7. Children&apos;s Privacy</h2>
              <p>
                Sneheal is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
              </p>
            </section>

            <section className="legal-section">
              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services, comply with legal obligations (including pharmacy and drug regulatory record-keeping requirements under Indian law), resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section className="legal-section">
              <h2>9. Third-Party Services</h2>
              <p>Our app may use third-party services for functions such as:</p>
              <ul>
                <li>AI-based prescription scanning and processing</li>
                <li>Voice recognition for order placement</li>
                <li>Payment processing</li>
                <li>Analytics and app performance monitoring</li>
              </ul>
              <p>These third parties have their own privacy policies governing their use of your information.</p>
            </section>

            <section className="legal-section">
              <h2>10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date. Continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="legal-section">
              <h2>11. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or how we handle your information, please contact us at:</p>
              <div className="legal-contact-card">
                <p><strong>Sneheal Health Private Limited</strong></p>
                <p>
                  Email:{' '}
                  <a href="mailto:shravan.bhaskar@sneheal.com">shravan.bhaskar@sneheal.com</a>
                  {' · '}
                  <a href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</a>
                </p>
                <p>
                  Website:{' '}
                  <a href="https://www.sneheal.com" target="_blank" rel="noopener noreferrer">www.sneheal.com</a>
                </p>
                <p>Address: {SITE_CONTACT.address}</p>
                <p>Phone: <a href={SITE_CONTACT.phoneHref}>{SITE_CONTACT.phone}</a></p>
              </div>
            </section>

            <p className="legal-footer-note">
              This Privacy Policy is designed to comply with Google Play Store requirements, including the Data Safety section, and applicable Indian data protection regulations.
            </p>

            <div className="legal-actions">
              <Link to="/contact" className="legal-back-link">Contact support</Link>
              <Link to="/" className="legal-back-link legal-back-link--muted">Back to home</Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
