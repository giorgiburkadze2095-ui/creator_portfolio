import { SEO } from '../components/shared/SEO.js';
import './TermsOfUsePage.css';

export function TermsOfUsePage() {
  return (
    <div className="section container legal-page">
      <SEO
        title="Terms of Use"
        description="The terms and conditions for using this website."
        path="/terms-of-use"
      />
      <header className="section-heading">
        <span className="section-heading__eyebrow">Legal</span>
        <h1 className="section-heading__title">Terms of Use</h1>
        <p className="legal-page__updated">Last updated: September 2026</p>
      </header>

      <div className="legal-page__body">
        <p>
          Welcome to this website. By accessing or using the website, you agree to these Terms of Use. If you do not
          agree with these terms, please do not use the website.
        </p>

        <section className="legal-page__section">
          <h2>Use of the Website</h2>
          <p>You may use this website for lawful purposes and in accordance with these Terms.</p>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for unlawful, harmful, fraudulent, or abusive purposes.</li>
            <li>Attempt to interfere with or compromise the website, its systems, or security.</li>
            <li>Attempt to gain unauthorized access to accounts, data, or systems.</li>
            <li>Copy, reproduce, distribute, or commercially exploit website content without permission.</li>
            <li>Use the website in a way that could damage, disable, or impair its functionality.</li>
          </ul>
        </section>

        <section className="legal-page__section">
          <h2>Website Content</h2>
          <p>
            Unless otherwise stated, the content on this website, including text, photographs, graphics, designs,
            branding, and other original materials, belongs to the website owner or is used with appropriate
            permission.
          </p>
          <p>
            You may view and use the website for personal, non-commercial purposes. You may not reproduce,
            redistribute, modify, or commercially exploit original website content without prior permission.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Contact and Submissions</h2>
          <p>
            If you voluntarily submit information through the website, including messages or other content, you are
            responsible for ensuring that the information you provide is lawful and does not infringe the rights of
            others.
          </p>
          <p>
            We reserve the right to remove or disregard submissions that are unlawful, abusive, fraudulent, spam, or
            otherwise inappropriate.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Third-Party Services and Links</h2>
          <p>
            The website may use or link to third-party services, websites, or platforms. We are not responsible for
            the content, availability, security, or practices of third-party services.
          </p>
          <p>Your use of third-party services may be subject to their own terms and policies.</p>
        </section>

        <section className="legal-page__section">
          <h2>Availability</h2>
          <p>
            We aim to keep the website available and functioning properly, but we do not guarantee that the website
            or every feature will always be available, uninterrupted, secure, or error-free.
          </p>
          <p>We may modify, suspend, or discontinue parts of the website when necessary.</p>
        </section>

        <section className="legal-page__section">
          <h2>Disclaimer</h2>
          <p>
            The information and content provided on this website are for general informational and personal purposes
            only.
          </p>
          <p>Nothing on this website should be considered professional medical, financial, legal, or other specialized advice.</p>
        </section>

        <section className="legal-page__section">
          <h2>Limitation of Liability</h2>
          <p>
            To the extent permitted by applicable law, we are not responsible for losses, damages, or other
            consequences resulting from your use of, or inability to use, the website or its content.
          </p>
          <p>
            Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is
            not permitted by applicable law.
          </p>
        </section>

        <section className="legal-page__section">
          <h2>Changes to These Terms</h2>
          <p>
            We may update these Terms of Use from time to time. Changes will be posted on this page with an updated
            "Last updated" date.
          </p>
          <p>Your continued use of the website after changes are posted means that you accept the updated Terms.</p>
        </section>

        <section className="legal-page__section">
          <h2>Contact</h2>
          <p>If you have questions about these Terms of Use, please contact us through the website's contact form.</p>
        </section>
      </div>
    </div>
  );
}
