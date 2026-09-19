'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const VARIANTS = [
  {
    id: 'stemless',
    tag: 'Most Popular',
    name: 'Stemless Red Chilli',
    type: 'Whole · Dried',
    image: '/images/img-2.webp',
    description:
      'Stem and calyx removed. Clean presentation. Ideal for direct use in food processing, restaurant kitchens, and retail packaging.',
    characteristics: [
      'Stem & calyx removed',
      'Uniform size sorting',
      'Low moisture content',
      'Vivid deep red colour',
      'Consistent heat level',
    ],
    grade: 'Grade A · Export',
  },
  {
    id: 'whole',
    tag: 'Classic',
    name: 'Whole Red Chilli',
    type: 'Whole · Dried',
    image: '/images/img-4.webp',
    description:
      'Stem intact. Traditional form preferred by spice processors, masala manufacturers, and bulk buyers requiring whole-pod processing.',
    characteristics: [
      'Stem intact',
      'Natural whole-pod form',
      'High colour pigment',
      'Rich aromatic profile',
      'Bulk & wholesale supply',
    ],
    grade: 'Grade A/B · Wholesale',
  },
  {
    id: 'crushed',
    tag: 'Processed',
    name: 'Red Chilli Flakes',
    type: 'Crushed · Processed',
    image: '/images/img-5.webp',
    description:
      'Coarsely crushed with seeds. Ready for direct seasoning use, pizza topping applications, spice blends, and food manufacturing.',
    characteristics: [
      'Consistent particle size',
      'Seeds included',
      'Measured heat level',
      'Ready-to-use format',
      'Custom granule size',
    ],
    grade: 'Food Grade · Processed',
  },
];

function VariantCard({ variant, index }) {
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReduced ? [1, 1, 1] : [1.08, 1, 1.04]);

  return (
    <motion.article
      ref={cardRef}
      variants={reducedMotionSafe(fadeUp, prefersReduced)}
      className="group relative grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-white/[0.06] bg-[rgba(26,22,17,0.5)]"
      aria-label={`Product variant: ${variant.name}`}
    >
      {/* Image — alternating sides */}
      <div
        className={[
          'relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[420px]',
          index % 2 === 1 ? 'lg:order-2' : '',
        ].join(' ')}
      >
        <motion.div style={{ scale: imageScale }} className="w-full h-full">
          <Image
            src={variant.image}
            alt={`${variant.name} — ${variant.type}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div
          className={[
            'absolute inset-0',
            index % 2 === 1
              ? 'bg-gradient-to-r from-[rgba(15,12,9,0)] to-[rgba(15,12,9,0.5)] lg:bg-gradient-to-l lg:from-[rgba(15,12,9,0)] lg:to-[rgba(15,12,9,0.5)]'
              : 'bg-gradient-to-r from-[rgba(15,12,9,0)] to-[rgba(15,12,9,0.5)]',
          ].join(' ')}
          aria-hidden="true"
        />

        {/* Tag badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-[var(--chilli-red)] text-[var(--cream)] text-[10px] tracking-[0.2em] uppercase font-semibold">
            {variant.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={['flex flex-col justify-center p-7 sm:p-10 lg:p-12', index % 2 === 1 ? 'lg:order-1' : ''].join(' ')}
      >
        {/* Type label */}
        <p className="text-[var(--chilli-red)] text-[10px] tracking-[0.28em] uppercase font-semibold mb-3">
          {variant.type}
        </p>

        {/* Name */}
        <h3 className="font-display text-[var(--cream)] text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight mb-4">
          {variant.name}
        </h3>

        {/* Description */}
        <p className="text-[var(--cream)] opacity-55 text-[14px] leading-relaxed mb-6 max-w-[400px]">
          {variant.description}
        </p>

        {/* Characteristics */}
        <ul className="flex flex-col gap-2 mb-8" aria-label={`Characteristics of ${variant.name}`}>
          {variant.characteristics.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-[var(--cream)] opacity-70">
              <Check size={13} className="text-[var(--chilli-red)] shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        {/* Grade badge */}
        <div className="flex items-center gap-3">
          <span className="divider-red" aria-hidden="true" />
          <span className="text-[var(--cream)] text-[11px] tracking-[0.2em] uppercase opacity-50">{variant.grade}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductShowcase() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="showcase"
      className="relative bg-[var(--charcoal)] overflow-hidden"
      aria-label="Product variants showcase"
    >
      {/* ── Section header ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-12 lg:pt-32 lg:pb-16">
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="divider-red" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Product Range
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          <motion.h2
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] text-[var(--cream)] font-bold leading-[1.05]"
          >
            One Source.
            <br />
            <span className="text-[var(--chilli-red)]">Multiple Forms.</span>
          </motion.h2>

          <motion.p
            variants={reducedMotionSafe(fadeRight, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-[var(--cream)] opacity-50 text-[14px] leading-relaxed max-w-[440px]"
          >
            From whole pods to processed flakes — we offer the same premium red chilli in the exact form your business
            requires. Each variant is sorted, graded, and packed to strict quality standards.
          </motion.p>
        </div>
      </div>

      {/* ── Variant cards ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pb-24 lg:pb-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-4"
        >
          {VARIANTS.map((variant, i) => (
            <VariantCard key={variant.id} variant={variant} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
