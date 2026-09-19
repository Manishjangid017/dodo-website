'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, fadeIn, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const QUALITIES = [
  {
    number: '01',
    title: 'Colour',
    body: 'Deep, vivid red with natural oils intact — delivering the rich colour pay-off that professional kitchens and food manufacturers demand.',
  },
  {
    number: '02',
    title: 'Aroma',
    body: 'Warm, earthy fragrance with characteristic spice depth. The aroma is preserved through careful drying and minimal handling.',
  },
  {
    number: '03',
    title: 'Heat',
    body: 'Consistent Scoville levels across every batch. Medium-to-high pungency with a clean, lingering finish — no bitterness.',
  },
  {
    number: '04',
    title: 'Origin',
    body: 'Sourced from prime chilli-growing regions of India, where soil, climate, and generations of farming knowledge converge.',
  },
];

export default function ProductIntro() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="product" className="relative bg-[var(--warm-black)] overflow-hidden" aria-label="Product introduction">
      {/* ── Top section: editorial headline ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16 lg:pt-32 lg:pb-20">
        {/* Section label */}
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="divider-red" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            The Product
          </span>
        </motion.div>

        {/* Main editorial headline — two-column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end">
          <motion.div
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[1.0] text-[var(--cream)] font-bold">
              More Than Heat.
              <br />
              <em className="not-italic text-[var(--chilli-red)]">It&apos;s Character.</em>
            </h2>
          </motion.div>

          <motion.div
            variants={reducedMotionSafe(fadeRight, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:pb-2"
          >
            <p className="text-[var(--cream)] opacity-60 text-[15px] leading-relaxed max-w-[480px]">
              Our red chilli is not simply a commodity. It is the result of careful cultivation, rigorous selection, and
              precision processing — producing a spice that carries consistent quality from the field to your production
              line.
            </p>
            <p className="text-[var(--cream)] opacity-60 text-[15px] leading-relaxed max-w-[480px] mt-4">
              Whether you are a food manufacturer, a spice blender, or an export buyer, you will find the colour, heat,
              and aroma you need — batch after batch.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Image band ── */}
      <motion.div
        variants={reducedMotionSafe(fadeIn, prefersReduced)}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative w-full h-[45vw] min-h-[260px] max-h-[520px] overflow-hidden"
      >
        <Image
          src="/images/production-img.webp"
          alt="Close-up of premium dried red chilli spices"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Left fade */}
        <div
          className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--warm-black)] to-transparent"
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--warm-black)] to-transparent"
          aria-hidden="true"
        />
        {/* Top fade */}
        <div
          className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[var(--warm-black)] to-transparent"
          aria-hidden="true"
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[var(--warm-black)] to-transparent"
          aria-hidden="true"
        />

        {/* Overlay text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={viewport}
          className="absolute inset-0 flex items-center justify-center"
        >
          <p
            className="font-editorial text-[clamp(3rem,8vw,7rem)] text-white/[0.16] tracking-widest select-none"
            aria-hidden="true"
          >
            PREMIUM QUALITY
          </p>
        </motion.div>
      </motion.div>

      {/* ── Quality pillars ── */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-24 lg:pt-20 lg:pb-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
        >
          {QUALITIES.map(({ number, title, body }, i) => (
            <motion.article
              key={number}
              variants={reducedMotionSafe(fadeUp, prefersReduced)}
              className={[
                'group flex flex-col gap-4 p-6 lg:p-8',
                'border-[rgba(245,239,230,0.07)]',
                i < QUALITIES.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : '',
                i === 1 ? 'sm:border-b lg:border-b-0' : '',
                i === 2 ? 'sm:border-b-0 sm:border-l-0 lg:border-l' : '',
              ].join(' ')}
              aria-label={`${title}: ${body}`}
            >
              <span className="font-editorial text-[var(--chilli-red)] text-[2.5rem] leading-none opacity-50">
                {number}
              </span>
              <h3 className="font-display text-[var(--cream)] text-xl font-bold">{title}</h3>
              <p className="text-[var(--cream)] opacity-50 text-sm leading-relaxed">{body}</p>
              {/* Bottom accent line revealed on hover */}
              <span
                className="block h-[1px] bg-[var(--chilli-red)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
