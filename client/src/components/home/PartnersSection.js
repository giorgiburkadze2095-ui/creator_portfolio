import { Reveal } from '../shared/Reveal.js';
import { PartnerCard } from '../shared/PartnerCard.js';
import './PartnersSection.css';

// Per spec: with no partners yet, hide this section entirely rather than
// show a placeholder or fake companies — the CTA section covers that case.
export function PartnersSection({ partners }) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-heading">
            <span className="section-heading__eyebrow">Partners</span>
            <h2 className="section-heading__title">Brands I've worked with</h2>
          </div>
        </Reveal>
        <div className="partners-section__grid">
          {partners.map((partner, index) => (
            <Reveal key={partner.id} delay={index * 0.05} scale={0.97}>
              <PartnerCard partner={partner} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
