import { SEO } from '../components/shared/SEO.js';
import { Reveal } from '../components/shared/Reveal.js';
import { useSiteContent } from '../context/SiteContentContext.js';
import './AboutPage.css';

// "My story" and "What I care about" were removed to keep this page short —
// just an intro, the music journey, philosophy, and how to collaborate. Both
// the heading and body of each remaining section are admin-editable
// (titleKey falls back to the same copy that used to be hardcoded here, in
// case an admin clears the heading field to empty).
const SECTIONS = [
  { key: 'aboutIntro', titleKey: 'aboutIntroTitle', fallbackTitle: 'Who I am' },
  { key: 'aboutMusicJourney', titleKey: 'aboutMusicJourneyTitle', fallbackTitle: 'The music journey' },
  { key: 'aboutPhilosophy', titleKey: 'aboutPhilosophyTitle', fallbackTitle: 'How I think about it' },
  { key: 'collaborationInfo', titleKey: 'collaborationInfoTitle', fallbackTitle: 'Collaboration' },
];

export function AboutPage() {
  const { siteContent } = useSiteContent();
  const visibleSections = SECTIONS.filter((section) => siteContent?.[section.key]);

  return (
    <div className="section container about-page">
      <SEO title="About" description="A short introduction, the music journey, and how to collaborate." path="/about" />
      <Reveal className="section-heading">
        <span className="section-heading__eyebrow">About</span>
        <h1 className="section-heading__title">The person behind the content</h1>
      </Reveal>

      {visibleSections.length === 0 ? (
        <p className="about-page__placeholder">This page is being written. Check back soon.</p>
      ) : (
        <div className="about-page__sections">
          {visibleSections.map((section, index) => (
            <Reveal as="section" key={section.key} delay={index * 0.05} className="about-page__section">
              <h2>{siteContent[section.titleKey] || section.fallbackTitle}</h2>
              <p>{siteContent[section.key]}</p>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
