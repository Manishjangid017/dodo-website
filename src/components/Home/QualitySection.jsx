'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, FlaskConical, Truck, Repeat2, Handshake, Award } from 'lucide-react';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Consistent Standards',
    body: 'Every lot is processed and packed to the same defined specification — ensuring that your first order and your fiftieth deliver the same result.',
  },
  {
    icon: FlaskConical,
    title: 'Tested Every Batch',
    body: 'Moisture, colour value, foreign matter, and purity are checked before dispatch. Only approved lots leave our facility.',
  },
  {
    icon: Repeat2,
    title: 'Reliable Supply',
    body: 'Consistent sourcing relationships and inventory planning mean we can fulfil repeat orders on schedule, season after season.',
  },
  {
    icon: Truck,
    title: 'Hygienic Processing',
    body: 'Clean processing environment, dedicated equipment, and proper handling protocols at every stage — from intake to final packing.',
  },
  {
    icon: Award,
    title: 'Export-Ready Product',
    body: 'Packed and documented to meet import requirements for major export markets. Custom documentation available on request.',
  },
  {
    icon: Handshake,
    title: 'Buyer-First Approach',
    body: 'We work around your requirement — grades, pack sizes, lead times, and custom formats can be discussed and arranged.',
  },
];

export default function QualitySection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="quality" className="relative bg-[var(--charcoal)] overflow-hidden" aria-label="Quality and trust">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-24 lg:pt-32 lg:pb-36">
        {/* ── Top header ── */}
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="divider-red" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Quality & Trust
          </span>
        </motion.div>

        {/* ── Two-column intro ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 lg:mb-24">
          <motion.div
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] text-[var(--cream)] font-bold leading-[1.05]">
              Quality You Can See.
              <br />
              <span className="text-[var(--chilli-red)]">Consistency You Can Trust.</span>
            </h2>
          </motion.div>
          <motion.div
            variants={reducedMotionSafe(fadeRight, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col justify-center"
          >
            <p className="text-[var(--cream)] opacity-55 text-[14px] leading-relaxed max-w-[440px] mb-4">
              A product's quality is visible before it's tasted. The colour, the clarity, the absence of defects — these
              are the signals buyers rely on.
            </p>
            <p className="text-[var(--cream)] opacity-55 text-[14px] leading-relaxed max-w-[440px]">
              We have built our processes around making those signals consistently positive. Not just for the first
              order — for every order that follows.
            </p>
          </motion.div>
        </div>

        {/* ── Image + pillars layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-start">
          {/* Image column */}
          <motion.div
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/left-side-image.webp"
                alt="Premium red chilli — quality inspection and sorting"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-left"
                quality={100}
                unoptimized
              />
              {/* Red overlay tint */}
              <div className="absolute inset-0 bg-[var(--chilli-red)] opacity-[0.08]" aria-hidden="true" />
              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[var(--charcoal)] to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating quality badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={viewport}
              className="absolute -bottom-4 -right-4 lg:bottom-8 lg:right-8 bg-[var(--chilli-red)] px-5 py-4"
            >
              <p className="text-[var(--cream)] text-[10px] tracking-[0.2em] uppercase mb-1">Standard</p>
              <p className="font-display text-white text-lg font-bold leading-tight">
                Export
                <br />
                Grade
              </p>
            </motion.div>
          </motion.div>

          {/* Pillars column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-0"
            role="list"
            aria-label="Quality pillars"
          >
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={reducedMotionSafe(fadeUp, prefersReduced)}
                role="listitem"
                className={[
                  'flex flex-col gap-3 p-6',
                  'border-[rgba(245,239,230,0.06)]',
                  i % 2 === 0 ? 'border-r border-b' : 'border-b',
                  i >= PILLARS.length - 2 ? 'border-b-0' : '',
                ].join(' ')}
              >
                <div className="w-8 h-8 rounded-sm bg-[var(--chilli-red)]/10 flex items-center justify-center shrink-0">
                  <pillar.icon size={15} className="text-[var(--chilli-red)]" aria-hidden="true" />
                </div>
                <h3 className="font-display text-[var(--cream)] text-[1rem] font-bold">{pillar.title}</h3>
                <p className="text-[var(--cream)] opacity-45 text-[13px] leading-relaxed">{pillar.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
