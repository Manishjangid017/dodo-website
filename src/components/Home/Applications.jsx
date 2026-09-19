'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, fadeLeft, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const APPLICATIONS = [
  {
    id: 'food-mfg',
    number: '01',
    title: 'Food Manufacturing',
    description:
      'Consistent colour value, heat level, and particle size make our red chilli the reliable input for sauces, ready meals, seasoning blends, and processed food production lines.',
    tags: ['Sauces', 'Ready Meals', 'Seasonings'],
    image: '/images/card-img-1.webp',
    imageAlt: 'Food manufacturing application',
  },
  {
    id: 'spice-blending',
    number: '02',
    title: 'Spice Blending',
    description:
      'Masala and spice blend manufacturers require a red chilli that holds its character in a blend. Our product delivers the colour and heat contribution you need, batch after batch.',
    tags: ['Masala', 'Spice Mixes', 'Curry Blends'],
    image: '/images/card-img-2.webp',
    imageAlt: 'Spice blending application',
  },
  {
    id: 'restaurants',
    number: '03',
    title: 'Hotels & Restaurants',
    description:
      'Premium restaurant-grade whole and crushed red chilli for professional kitchens. Clean, sorted, and hygienically packed for direct culinary use without further processing.',
    tags: ['Fine Dining', 'Bulk Kitchen', 'HoReCa'],
    image: '/images/card-img-5.webp',
    imageAlt: 'Restaurant and hospitality application',
  },
  {
    id: 'export',
    number: '04',
    title: 'Export & Trading',
    description:
      'Documentation, grading, and packaging aligned to international import standards. We support export buyers with the right product specification for their destination market.',
    tags: ['Middle East', 'Europe', 'Asia Pacific'],
    image: '/images/card-img-7.webp',
    imageAlt: 'Export trading application',
  },
];

function ApplicationCard({ app, index }) {
  const prefersReduced = useReducedMotion();
  const isLarge = index === 0 || index === 3;

  return (
    <motion.article
      variants={reducedMotionSafe(fadeUp, prefersReduced)}
      className={[
        'group relative overflow-hidden bg-[rgba(26,22,17,0.6)] border border-white/[0.06]',
        'hover:border-[var(--chilli-red)]/30 transition-all duration-500',
        isLarge ? 'lg:col-span-2' : '',
      ].join(' ')}
      aria-label={`Application: ${app.title}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}>
        <Image
          src={app.image}
          alt={app.imageAlt}
          fill
          sizes={isLarge ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(15,12,9,0.92)] via-[rgba(15,12,9,0.35)] to-transparent"
          aria-hidden="true"
        />
        {/* Number overlay */}
        <span
          className="absolute top-5 right-5 font-editorial text-white/[0.07] text-[4rem] leading-none select-none"
          aria-hidden="true"
        >
          {app.number}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="font-display text-[var(--cream)] text-xl sm:text-2xl font-bold mb-3">{app.title}</h3>
        <p className="text-[var(--cream)] opacity-50 text-[13px] leading-relaxed mb-5 max-w-[480px]">
          {app.description}
        </p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2" role="list" aria-label="Application tags">
          {app.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="px-3 py-1 text-[10px] tracking-widest uppercase border border-[var(--chilli-red)]/30 text-[var(--chilli-red)] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-5 left-5 w-8 h-8 bg-[var(--chilli-red)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight size={15} className="text-white" aria-hidden="true" />
      </div>
    </motion.article>
  );
}

export default function Applications() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="applications"
      className="relative bg-[var(--warm-black)] overflow-hidden"
      aria-label="Product applications"
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 rounded-full opacity-[0.05] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--chilli-red), transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-24 lg:pt-32 lg:pb-36">
        {/* Header */}
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="divider-red" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Applications
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14 lg:mb-20">
          <motion.h2
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] text-[var(--cream)] font-bold leading-[1.05]"
          >
            Built for the
            <br />
            <span className="text-[var(--chilli-red)]">Professionals.</span>
          </motion.h2>

          <motion.p
            variants={reducedMotionSafe(fadeUp, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-[var(--cream)] opacity-50 text-[14px] leading-relaxed max-w-[440px]"
          >
            From the largest food processing plant to the finest restaurant kitchen — our red chilli is suited for any
            professional context that demands consistency, quality, and trust.
          </motion.p>
        </div>

        {/* Application cards — asymmetric grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {APPLICATIONS.map((app, i) => (
            <ApplicationCard key={app.id} app={app} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
