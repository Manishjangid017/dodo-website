'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const STEPS = [
  {
    number: '01',
    title: 'Source',
    subtitle: 'Field to Farm',
    description:
      'Selected from established red chilli cultivation zones across India — regions known for the ideal combination of soil richness, climate, and traditional farming knowledge. Only farms meeting our baseline quality criteria are engaged.',
    image: '/images/img-7.webp',
    imageAlt: 'Red chilli fields at harvest',
  },
  {
    number: '02',
    title: 'Selection',
    subtitle: 'Grade & Sort',
    description:
      'Each batch is physically inspected and graded. Damaged, discoloured, or underweight pods are removed at this stage. The remaining product is then sorted by size and grade to ensure a uniform, consistent lot.',
    image: '/images/img-8.webp',
    imageAlt: 'Sorting and grading red chilli',
  },
  {
    number: '03',
    title: 'Processing',
    subtitle: 'Clean & Dry',
    description:
      'Controlled drying process reduces moisture to optimal levels — preserving colour integrity, essential oils, and shelf life. Stemless variants undergo additional cleaning to remove all foreign matter before packing.',
    image: '/images/img-9.webp',
    imageAlt: 'Drying and processing red chilli',
  },
  {
    number: '04',
    title: 'Quality Check',
    subtitle: 'Test & Verify',
    description:
      'Before dispatch, every lot is tested for moisture content, colour value, foreign matter, and purity. Only lots passing the defined specification are approved for packing and dispatch to buyers.',
    image: '/images/img-10.webp',
    imageAlt: 'Quality inspection of red chilli',
  },
];

export default function ProductStory() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="story"
      className="relative bg-[var(--cream)] overflow-hidden"
      aria-label="Product journey — from source to quality"
    >
      {/* Grain texture on cream */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-24 lg:pt-32 lg:pb-36">
        {/* ── Section header ── */}
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="block w-12 h-[2px] bg-[var(--chilli-red)] rounded-full" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            The Journey
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16 lg:mb-24">
          <motion.h2
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-display text-[clamp(1.9rem,5vw,4.2rem)] text-[var(--charcoal)] font-bold leading-[1.05]"
          >
            From the Field
            <br />
            <em className="not-italic text-[var(--chilli-red)]">to the Flavour.</em>
          </motion.h2>

          <motion.p
            variants={reducedMotionSafe(fadeRight, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="text-[var(--charcoal)] opacity-60 text-[14px] leading-relaxed max-w-[440px]"
          >
            Every product has a story. Ours begins in the fields and ends at your production floor — with complete
            traceability, careful handling, and a commitment to quality at every step.
          </motion.p>
        </div>

        {/* ── Story steps ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col gap-0"
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={reducedMotionSafe(fadeUp, prefersReduced)}
              className={[
                'grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-0',
                'border-t border-[rgba(26,22,17,0.1)]',
                i === STEPS.length - 1 ? 'border-b' : '',
              ].join(' ')}
            >
              {/* Image — always first on mobile (order-1), alternates on desktop */}
              <div className={['relative', 'order-1', i % 2 === 0 ? 'lg:order-1' : 'lg:order-3'].join(' ')}>
                <div className="relative w-full lg:aspect-auto lg:h-full min-h-[200px] lg:min-h-[280px] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object object-left"
                  />
                  <div className="absolute inset-0 bg-[var(--chilli-red)] opacity-[0.06]" aria-hidden="true" />
                </div>
              </div>

              {/* Center — step number (desktop only) */}
              <div
                className="hidden lg:flex flex-col items-center justify-center py-8 border-x border-[rgba(26,22,17,0.08)] order-2 lg:order-2"
                aria-hidden="true"
              >
                <span className="font-editorial text-[var(--chilli-red)] text-3xl opacity-40 [writing-mode:vertical-rl] tracking-widest">
                  {step.number}
                </span>
              </div>

              {/* Content — always second on mobile (order-2), alternates on desktop */}
              <div className={['relative', 'order-2', i % 2 === 0 ? 'lg:order-3' : 'lg:order-1'].join(' ')}>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 h-full">
                  <StepContent step={step} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StepContent({ step }) {
  return (
    <>
      {/* Mobile step number */}
      <span className="lg:hidden font-editorial text-[var(--chilli-red)] text-3xl opacity-30 mb-4 block">
        {step.number}
      </span>
      <p className="text-[var(--chilli-red)] text-[10px] tracking-[0.28em] uppercase font-semibold mb-2">
        {step.subtitle}
      </p>
      <h3 className="font-display text-[var(--charcoal)] text-[clamp(1.3rem,3vw,2.2rem)] font-bold mb-4">
        {step.title}
      </h3>
      <p className="text-[var(--charcoal)] opacity-60 text-[14px] leading-relaxed max-w-[380px]">{step.description}</p>
    </>
  );
}
