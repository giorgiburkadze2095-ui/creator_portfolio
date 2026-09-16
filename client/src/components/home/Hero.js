import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../../context/SiteContentContext.js';
import './Hero.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

// Flat fade only — no translate — per the site's strictly minimalist motion.
const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Hero({ title, subtitle, tagline }) {
  const { siteContent } = useSiteContent();
  const prefersReducedMotion = useReducedMotion();

  const heroTitle = title || siteContent?.creatorName || 'Your Name';
  const heroSubtitle = subtitle || 'A place to share what I create, one post at a time.';

  const Wrapper = prefersReducedMotion ? 'div' : motion.div;
  const wrapperProps = prefersReducedMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' };

  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__content">
        <Wrapper {...wrapperProps}>
          {tagline && (
            <motion.p variants={prefersReducedMotion ? undefined : item} className="hero__eyebrow">
              {tagline}
            </motion.p>
          )}
          <motion.h1 variants={prefersReducedMotion ? undefined : item} className="hero__title">
            {heroTitle}
          </motion.h1>
          <motion.p variants={prefersReducedMotion ? undefined : item} className="hero__subtitle">
            {heroSubtitle}
          </motion.p>
          <motion.div variants={prefersReducedMotion ? undefined : item} className="hero__actions">
            <Link to="/content" className="button button--primary">
              Explore my content
            </Link>
            <Link to="/collaborate" className="button button--ghost">
              Work with me
            </Link>
          </motion.div>
        </Wrapper>
      </div>
      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
