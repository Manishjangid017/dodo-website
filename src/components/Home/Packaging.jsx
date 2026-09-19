'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Package, Container, Box, Globe } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const PACK_OPTIONS = [
  {
    icon: Package,
    title: '1 kg — 5 kg',
    subtitle: 'Retail / HoReCa Pack',
    description:
      'PP bags with inner liner. Suitable for restaurant-grade supply and institutional buyers. Available in stemless whole and flakes.',
    badge: 'Retail',
    badgeColor: 'var(--spice-gold)',
  },
  {
    icon: Box,
    title: '10 kg — 25 kg',
    subtitle: 'Wholesale Bag',
    description:
      'Woven PP bags. Standard format for food manufacturers, spice processors, and domestic wholesale. Labelled per buyer requirement.',
    badge: 'Wholesale',
    badgeColor: 'var(--chilli-red)',
  },
  {
    icon: Container,
    title: '50 kg Bags',
    subtitle: 'Bulk Sack',
    description:
      'Heavy-duty woven polypropylene sacks. Preferred format for large-volume food manufacturing and export container loads.',
    badge: 'Bulk',
    badgeColor: 'var(--chilli-deep)',
  },
  {
    icon: Globe,
    title: 'Custom Packing',
    subtitle: 'Export / OEM',
    description:
      'Custom pack sizes, private label, and buyer-specific marking. For export orders requiring destination-country documentation and labelling.',
    badge: 'Export',
    badgeColor: 'var(--spice-amber)',
  },
];

export default function Packaging() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="packaging"
      className="relative bg-[var(--cream)] overflow-hidden"
      aria-label="Packaging and supply options"
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
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
          <span className="block w-12 h-[2px] bg-[var(--chilli-red)] rounded-full" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Packaging & Supply
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14 lg:mb-20">
          <motion.h2
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] text-[var(--charcoal)] font-bold leading-[1.05]"
          >
            Ready for Your
            <br />
            <em className="not-italic text-[var(--chilli-red)]">Scale of Business.</em>
          </motion.h2>
          <motion.p
            variants={reducedMotionSafe(fadeRight, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-[var(--charcoal)] opacity-60 text-[14px] leading-relaxed max-w-[440px]"
          >
            Whether you need a few cartons for your restaurant or a full container
            for export, we have the packaging format and supply capacity to match.
            Custom pack sizes and labelling are available.
          </motion.p>
        </div>

        {/* Pack options grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="list"
          aria-label="Packaging options"
        >
          {PACK_OPTIONS.map((opt) => (
            <motion.div
              key={opt.title}
              variants={reducedMotionSafe(fadeUp, prefersReduced)}
              role="listitem"
              className="group flex flex-col gap-5 p-6 lg:p-7 bg-white border border-[rgba(26,22,17,0.08)] hover:border-[var(--chilli-red)] transition-all duration-400 hover:shadow-[0_8px_40px_rgba(192,57,43,0.12)]"
            >
              {/* Icon + badge row */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-sm bg-[var(--chilli-red)]/8 flex items-center justify-center border border-[var(--chilli-red)]/15">
                  <opt.icon size={18} className="text-[var(--chilli-red)]" aria-hidden="true" />
                </div>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase font-bold px-2.5 py-1"
                  style={{
                    color: opt.badgeColor,
                    border: `1px solid ${opt.badgeColor}40`,
                  }}
                >
                  {opt.badge}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-[var(--charcoal)] text-lg font-bold leading-tight mb-1">
                  {opt.title}
                </h3>
                <p className="text-[var(--chilli-red)] text-[11px] tracking-wide uppercase font-medium">
                  {opt.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-[var(--charcoal)] opacity-55 text-[13px] leading-relaxed flex-1">
                {opt.description}
              </p>

              {/* Bottom accent */}
              <span
                className="block h-[2px] bg-[var(--chilli-red)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-[var(--charcoal)] opacity-40 text-[12px] mt-8"
        >
          * Pack sizes and minimum order quantities are indicative. Contact us via the
          enquiry form for specific volume requirements and custom formats.
          [Placeholder — update with confirmed MOQ and pack data.]
        </motion.p>
      </div>
    </section>
  );
}
