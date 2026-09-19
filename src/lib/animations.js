/**
 * Reusable Framer Motion animation variants
 * All variants respect prefers-reduced-motion at the component level
 * via the useReducedMotion hook from Framer Motion.
 */

// ─── Fade variants ────────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Scale variants ───────────────────────────────────────────────────────────

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleInSlow = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Image reveal ─────────────────────────────────────────────────────────────

export const imageReveal = {
  hidden: { opacity: 0, scale: 1.08, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

// Clip-path based masked reveal (image wipes in from bottom)
export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
  },
};

// ─── Text reveal ──────────────────────────────────────────────────────────────

export const textReveal = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const letterReveal = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};

export const letterChild = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// ─── Hero-specific sequences ──────────────────────────────────────────────────

export const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const heroHeadline = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

export const heroSubtext = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};

export const heroImage = {
  hidden: { opacity: 0, scale: 1.1, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export const heroFloatingBadge = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Scroll-reveal defaults ───────────────────────────────────────────────────

/** Default viewport config for whileInView */
export const viewport = { once: true, margin: '-80px' };

/** Slow reveal for large sections */
export const viewportLazy = { once: true, margin: '-120px' };

// ─── Parallax (used with useScroll/useTransform in components) ────────────────
// These are just the spring config — actual transform values are defined inline.

export const parallaxSpring = {
  stiffness: 80,
  damping: 25,
  mass: 0.6,
};

// ─── Hover micro-interactions ─────────────────────────────────────────────────

export const hoverLift = {
  rest: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Number counter ───────────────────────────────────────────────────────────

export const counterVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Line draw (for decorative SVG lines) ────────────────────────────────────

export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeInOut', delay: 0.2 },
  },
};

// ─── Reduced-motion safe wrapper ─────────────────────────────────────────────
/**
 * Returns still variants when the user prefers reduced motion.
 * Usage: const safe = reducedMotionSafe(fadeUp, prefersReducedMotion);
 */
export function reducedMotionSafe(variant, prefersReduced) {
  if (!prefersReduced) return variant;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  };
}
