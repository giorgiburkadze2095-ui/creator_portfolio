import { COLLABORATION_TYPE_LABELS } from '../../constants/enums.js';
import './PartnerCard.css';

export function PartnerCard({ partner }) {
  const content = (
    <>
      <div className="partner-card__logo">
        {partner.logoUrl ? (
          <img src={partner.logoUrl} alt={partner.name} loading="lazy" />
        ) : (
          <span className="partner-card__initial">{partner.name.charAt(0)}</span>
        )}
      </div>
      <p className="partner-card__name">{partner.name}</p>
      <p className="partner-card__type">{COLLABORATION_TYPE_LABELS[partner.collaborationType]}</p>
    </>
  );

  if (partner.websiteUrl) {
    return (
      <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer" className="partner-card">
        {content}
      </a>
    );
  }

  return <div className="partner-card">{content}</div>;
}
