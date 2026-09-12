import { useEffect, useState } from 'react';
import { SEO } from '../components/shared/SEO.js';
import { PlatformIcon } from '../components/shared/PlatformIcon.js';
import { Reveal } from '../components/shared/Reveal.js';
import { ContactForm } from '../components/shared/ContactForm.js';
import { useSiteContent } from '../context/SiteContentContext.js';
import { socialLinksApi } from '../api/socialLinks.js';
import './CollaboratePage.css';

export function CollaboratePage() {
  const { siteContent } = useSiteContent();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    socialLinksApi.list().then(setSocialLinks).catch(() => {});
  }, []);

  return (
    <div className="section container collaborate-page">
      <SEO title="Collaborate" description="Get in touch about collaborations and partnerships." path="/collaborate" />
      <Reveal className="section-heading">
        <span className="section-heading__eyebrow">Work with me</span>
        <h1 className="section-heading__title">Let's build something real</h1>
        <p className="section-heading__description">
          {siteContent?.workWithMeDescription ||
            'Reach out below to start a conversation about working together.'}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="collaborate-page__form">
        <ContactForm />
      </Reveal>

      {siteContent?.contactEmail && (
        <Reveal delay={0.15} className="collaborate-page__actions">
          <a href={`mailto:${siteContent.contactEmail}`} className="button button--ghost">
            Prefer email? {siteContent.contactEmail}
          </a>
        </Reveal>
      )}

      {socialLinks.length > 0 && (
        <Reveal delay={0.2} className="collaborate-page__social">
          <p className="collaborate-page__social-label">Or find me here</p>
          <div className="collaborate-page__social-list">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="collaborate-page__social-link"
              >
                <PlatformIcon type={link.iconType} size={16} />
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
