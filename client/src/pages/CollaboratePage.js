import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { PlatformIcon } from '../components/shared/PlatformIcon.js';
import { socialLinksApi } from '../api/socialLinks.js';
import './CollaboratePage.css';

export function CollaboratePage() {
  const { siteContent } = useOutletContext();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    socialLinksApi.list().then(setSocialLinks).catch(() => {});
  }, []);

  return (
    <div className="section container collaborate-page">
      <SEO
        title="Collaborate"
        description="Work with Giorgi Burkadze on fitness, music and lifestyle collaborations."
        path="/collaborate"
      />
      <div className="section-heading">
        <span className="section-heading__eyebrow">Work with me</span>
        <h1 className="section-heading__title">Let's build something real</h1>
        <p className="section-heading__description">
          {siteContent?.workWithMeDescription ||
            "I collaborate with brands and creators around fitness, music, and lifestyle — always looking for a fit with what I actually make, not just a paycheck. If that sounds like you, reach out."}
        </p>
      </div>

      <div className="collaborate-page__actions">
        {siteContent?.contactEmail && (
          <a href={`mailto:${siteContent.contactEmail}`} className="button button--primary">
            Email me
          </a>
        )}
        {siteContent?.contactUrl && (
          <a href={siteContent.contactUrl} target="_blank" rel="noopener noreferrer" className="button button--ghost">
            Contact form ↗
          </a>
        )}
      </div>

      {socialLinks.length > 0 && (
        <div className="collaborate-page__social">
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
        </div>
      )}
    </div>
  );
}
