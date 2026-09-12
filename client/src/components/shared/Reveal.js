import { motion, useReducedMotion } from 'framer-motion';

// A single, restrained scroll-reveal used across section wrappers and grid
// items so every part of the site enters the same way. Uses framer-motion's
// whileInView, which observes via IntersectionObserver rather than polling
// scroll position. `scale` is opt-in and kept subtle (0.9-1) for card/image
// content — text sections stick to the plain fade + translate.
export function Reveal({ children, delay = 0, y = 24, scale, as = 'div', className }) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, ...(scale && { scale }) }}
      whileInView={{ opacity: 1, y: 0, ...(scale && { scale: 1 }) }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
