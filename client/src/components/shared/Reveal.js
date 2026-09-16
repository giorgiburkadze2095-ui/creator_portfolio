import { motion, useReducedMotion } from 'framer-motion';

// A single, restrained scroll-reveal used across section wrappers and grid
// items so every part of the site enters the same way. Kept strictly flat —
// opacity only, no translate/scale movement — per the site's minimalist
// motion direction. Uses framer-motion's whileInView, which observes via
// IntersectionObserver rather than polling scroll position.
export function Reveal({ children, delay = 0, as = 'div', className }) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </MotionTag>
  );
}
