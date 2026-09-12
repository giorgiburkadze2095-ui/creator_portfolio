import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SEO } from '../components/shared/SEO.js';
import { Hero } from '../components/home/Hero.js';
import { PersonalStatement } from '../components/home/PersonalStatement.js';
import { CategoryGrid } from '../components/home/CategoryGrid.js';
import { FeaturedContent } from '../components/home/FeaturedContent.js';
import { TopicSection } from '../components/home/TopicSection.js';
import { QuotesSection } from '../components/home/QuotesSection.js';
import { PartnersSection } from '../components/home/PartnersSection.js';
import { WorkWithMeCta } from '../components/home/WorkWithMeCta.js';
import { categoriesApi } from '../api/categories.js';
import { contentApi } from '../api/content.js';
import { quotesApi } from '../api/quotes.js';
import { partnersApi } from '../api/partners.js';

export function HomePage() {
  const { siteContent } = useOutletContext();
  const [categories, setCategories] = useState([]);
  const [featuredContent, setFeaturedContent] = useState([]);
  const [fitnessContent, setFitnessContent] = useState([]);
  const [musicContent, setMusicContent] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => {});
    contentApi.list({ featured: 'true' }).then(setFeaturedContent).catch(() => {});
    contentApi.list({ category: 'fitness' }).then((items) => setFitnessContent(items.slice(0, 3))).catch(() => {});
    contentApi.list({ category: 'music' }).then((items) => setMusicContent(items.slice(0, 3))).catch(() => {});
    quotesApi.list({ featured: 'true' }).then((items) => setQuotes(items.slice(0, 3))).catch(() => {});
    partnersApi.list().then(setPartners).catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="Fitness, motivation, music and thoughts — the digital home of creator Giorgi Burkadze."
        path="/"
      />
      <Hero title={siteContent?.heroTitle} subtitle={siteContent?.heroSubtitle} tagline={siteContent?.heroTagline} />
      <PersonalStatement text={siteContent?.personalStatement} />
      <CategoryGrid categories={categories} />
      <FeaturedContent items={featuredContent} />
      <TopicSection
        eyebrow="Fitness · Motivation"
        title="Discipline, in progress"
        description="Training, recovery, and the mindset behind showing up — documented honestly, not polished into a highlight reel."
        items={fitnessContent}
        ctaTo="/fitness"
        ctaLabel="See the fitness journey"
      />
      <TopicSection
        eyebrow="Music"
        title="Learning to make sound"
        description="I'm early in my music journey. This is the real, unfinished process of creating and discovering music I care about."
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
