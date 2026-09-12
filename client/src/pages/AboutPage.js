import { useOutletContext } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { Reveal } from '../components/shared/Reveal.js';
import './AboutPage.css';

const SECTIONS = [
  { key: 'aboutIntro', title: 'Who I am' },
  { key: 'aboutStory', title: 'My story' },
  { key: 'aboutInterests', title: 'What I care about' },
  { key: 'aboutFitnessJourney', title: 'The fitness journey' },
  { key: 'aboutMusicJourney', title: 'The music journey' },
  { key: 'aboutPhilosophy', title: 'How I think about it' },
  { key: 'collaborationInfo', title: 'Collaboration' },
];

export function AboutPage() {
  const { siteContent } = useOutletContext();
  const visibleSections = SECTIONS.filter((section) => siteContent?.[section.key]);

  return (
    <div className="section container about-page">
      <SEO title="About" description="About Giorgi Burkadze — story, interests, and philosophy." path="/about" />
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
              <h2>{section.title}</h2>
              <p>{siteContent[section.key]}</p>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
