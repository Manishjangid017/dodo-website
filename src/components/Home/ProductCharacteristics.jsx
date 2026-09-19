'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Flame, Palette, Wind, Leaf, Package, Globe, Thermometer, Star } from 'lucide-react';
import { fadeUp, fadeLeft, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

// ─── Scale bar with animated fill ────────────────────────────────────────────
function ScaleBar({ value, max = 10, color = 'var(--chilli-red)' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();
  const pct = (value / max) * 100;

  return (
    <div
      ref={ref}
      className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`${value} out of ${max}`}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={prefersReduced ? { duration: 0.01 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, subValue, hasBar, barValue }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col gap-4 p-6 lg:p-7 bg-[rgba(255,255,255,0.03)] border border-white/[0.06] hover:border-[var(--chilli-red)]/30 transition-colors duration-400"
      role="listitem"
    >
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 rounded-sm bg-[var(--chilli-red)]/10 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-[var(--chilli-red)]" aria-hidden="true" />
        </div>
        {subValue && <span className="text-[10px] text-white/30 tracking-widest uppercase">{subValue}</span>}
      </div>
      <div>
        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase mb-1.5">{label}</p>
        <p className="font-display text-[var(--cream)] text-xl font-bold leading-snug">{value}</p>
      </div>
      {hasBar && <ScaleBar value={barValue} max={10} />}
    </motion.div>
  );
}

const SPECS = [
  {
    icon: Palette,
    label: 'Colour',
    value: 'Deep Vivid Red',
    subValue: 'ASTA 100–180',
    hasBar: true,
    barValue: 8.5,
  },
  {
    icon: Flame,
    label: 'Heat Level',
    value: 'Medium — High',
    subValue: '25K–50K SHU',
    hasBar: true,
    barValue: 7,
  },
  {
    icon: Wind,
    label: 'Aroma',
    value: 'Warm & Earthy',
    subValue: 'Characteristic',
    hasBar: true,
    barValue: 8,
  },
  {
    icon: Thermometer,
    label: 'Moisture',
    value: '≤ 12%',
    subValue: 'Max Allowed',
    hasBar: false,
  },
  {
    icon: Leaf,
    label: 'Form',
    value: 'Whole / Flakes',
    subValue: 'Multiple Options',
    hasBar: false,
  },
  {
    icon: Star,
    label: 'Grade',
    value: 'Export Quality',
    subValue: 'Grade A',
    hasBar: false,
  },
  {
    icon: Package,
    label: 'Packaging',
    value: 'PP Bags / Cartons',
    subValue: 'Custom Available',
    hasBar: false,
  },
  {
    icon: Globe,
    label: 'Origin',
    value: 'India',
    subValue: 'Prime Growing Zones',
    hasBar: false,
  },
];

// ─── Large feature metric ──────────────────────────────────────────────────
function BigMetric({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReduced ? { duration: 0.01 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className="flex flex-col items-center text-center px-3 py-6 sm:px-6 sm:py-8 border border-white/[0.05]"
    >
      <span className="font-editorial text-[clamp(1.8rem,5vw,5.5rem)] text-[var(--chilli-red)] leading-none">
        {value}
      </span>
      <span className="text-[11px] text-white/35 tracking-[0.2em] uppercase mt-2">{label}</span>
    </motion.div>
  );
}

export default function ProductCharacteristics() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="characteristics"
      className="relative bg-[var(--warm-black)] overflow-hidden"
      aria-label="Product characteristics and specifications"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right center, var(--chilli-red), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-24 lg:pt-32 lg:pb-36">
        {/* Section header */}
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="divider-red" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Specifications
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-14 lg:mb-20">
          <motion.h2
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-display text-[clamp(1.9rem,5vw,4.2rem)] text-[var(--cream)] font-bold leading-[1.05]"
          >
            Numbers That
            <br />
            <span className="text-[var(--chilli-red)]">Speak Quality.</span>
          </motion.h2>
          <motion.p
            variants={reducedMotionSafe(fadeUp, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-[var(--cream)] opacity-50 text-[14px] leading-relaxed max-w-[420px]"
          >
            Every specification below is based on standard lot testing and export-grade benchmarks. Exact values for
            your requirement can be shared upon enquiry.
          </motion.p>
        </div>

        {/* Big metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-10 border border-white/[0.06]">
          <BigMetric value="ASTA 160+" label="Colour Value" delay={0} />
          <BigMetric value="25K–50K" label="Scoville Units" delay={0.1} />
          <BigMetric value="≤12%" label="Moisture Content" delay={0.2} />
          <BigMetric value="99%+" label="Purity Level" delay={0.3} />
        </div>

        {/* Spec grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          role="list"
          aria-label="Product specification details"
        >
          {SPECS.map((spec) => (
            <StatCard key={spec.label} {...spec} />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-white/25 text-[12px] mt-8 max-w-[600px]"
        >
          * Specifications are indicative and based on typical export-grade lots. Exact values and test reports are
          available upon request. [Placeholder — replace with actual certified lab values once available.]
        </motion.p>
      </div>
    </section>
  );
}
