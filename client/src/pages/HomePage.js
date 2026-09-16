import { useEffect, useState } from 'react';
import { SEO } from '../components/shared/SEO.js';
import { Hero } from '../components/home/Hero.js';
import { PersonalStatement } from '../components/home/PersonalStatement.js';
import { FeaturedContent } from '../components/home/FeaturedContent.js';
import { TopicSection } from '../components/home/TopicSection.js';
import { QuotesSection } from '../components/home/QuotesSection.js';
import { PartnersSection } from '../components/home/PartnersSection.js';
import { WorkWithMeCta } from '../components/home/WorkWithMeCta.js';
import { contentApi } from '../api/content.js';
import { quotesApi } from '../api/quotes.js';
import { partnersApi } from '../api/partners.js';
import { useSiteContent } from '../context/SiteContentContext.js';

export function HomePage() {
  const { siteContent } = useSiteContent();
  const [featuredContent, setFeaturedContent] = useState([]);
  const [musicContent, setMusicContent] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    contentApi.list({ featured: 'true' }).then(setFeaturedContent).catch(() => {});
    contentApi.list({ music: 'true' }).then((items) => setMusicContent(items.slice(0, 3))).catch(() => {});
    quotesApi.list({ featured: 'true' }).then((items) => setQuotes(items.slice(0, 3))).catch(() => {});
    partnersApi.list().then(setPartners).catch(() => {});
  }, []);

  return (
    <>
      <SEO title="Home" description="Fitness, motivation, music and thoughts — a creator's digital home." path="/" />
      <Hero title={siteContent?.heroTitle} subtitle={siteContent?.heroSubtitle} tagline={siteContent?.heroTagline} />
      <PersonalStatement text={siteContent?.personalStatement} />
      <FeaturedContent items={featuredContent} />
      <TopicSection
        eyebrow="Music"
        title="Sound, in progress"
        description={
          siteContent?.aboutMusicJourney ||
          'Music updates and behind-the-scenes content will appear here as they are published.'
        }
        items={musicContent}
        ctaTo="/music"
        ctaLabel="Explore the music journey"
        reverse
      />
      <QuotesSection quotes={quotes} />
      <PartnersSection partners={partners} />
      <WorkWithMeCta title={siteContent?.ctaTitle} text={siteContent?.ctaText} />
    </>
  );
}
