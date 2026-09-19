'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Star, Award } from 'lucide-react';
import {
  heroContainer,
  heroHeadline,
  heroSubtext,
  heroImage,
  heroFloatingBadge,
  fadeIn,
  staggerContainer,
  fadeUp,
} from '@/lib/animations';

// ─── Floating badge data ──────────────────────────────────────────────────────
const BADGES = [
  {
    id: 'origin',
    icon: MapPin,
    label: 'Origin',
    value: 'India',
    position: 'top-[18%] left-[3%] lg:top-[22%] lg:left-[6%]',
    delay: 0.9,
  },
  {
    id: 'grade',
    icon: Award,
    label: 'Grade',
    value: 'Export Quality',
    position: 'bottom-[28%] left-[2%] lg:bottom-[26%] lg:left-[5%]',
    delay: 1.1,
  },
  {
    id: 'purity',
    icon: Star,
    label: 'Purity',
    value: '99% Natural',
    position: 'top-[14%] right-[2%] lg:top-[20%] lg:right-[4%]',
    delay: 1.0,
  },
];

// ─── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      className="lg:block hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-medium">Scroll</span>
      <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-[var(--chilli-red)]"
          style={{ height: '40%' }}
          animate={{ y: ['0%', '250%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', repeatDelay: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

// ─── Floating badge ───────────────────────────────────────────────────────────
function FloatingBadge({ icon: Icon, label, value, position, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${position} z-20`}
    >
      <div className="glass rounded-none px-3 py-2.5 border border-white/[0.1] min-w-[110px]">
        <div className="flex items-center gap-2 mb-0.5">
          <Icon size={10} className="text-[var(--chilli-red)] shrink-0" aria-hidden="true" />
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-medium">{label}</span>
        </div>
        <p className="text-[var(--cream)] text-[11px] font-semibold tracking-wide leading-tight pl-4">{value}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '18%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative lg:min-h-screen min-h-[1360px] pt-8 lg:p-0 flex lg:items-center overflow-hidden bg-[var(--warm-black)]"
      aria-label="Hero — Premium Red Chilli Spices"
    >
      {/* ── Background gradient layers ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0" aria-hidden="true">
        {/* Deep radial glow — bottom right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_80%,rgba(150,40,27,0.35),transparent_70%)]" />
        {/* Top left warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_10%,rgba(192,57,43,0.12),transparent_60%)]" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }}
        />
      </motion.div>

      {/* ── Main content container ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center min-h-[calc(100vh-7rem)]">
          {/* ── LEFT — Text content ── */}
          <motion.div style={{ y: textY, opacity }} className="flex flex-col justify-center order-1 lg:order-1 z-10">
            <motion.div variants={heroContainer} initial="hidden" animate="visible" className="flex flex-col">
              {/* Eyebrow */}
              <motion.div variants={heroSubtext} className="flex items-center gap-3 mb-6">
                <span className="divider-red" aria-hidden="true" />
                <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
                  Premium Red Chilli Spices
                </span>
              </motion.div>

              {/* Main headline — Bebas Neue editorial */}
              <motion.h1
                variants={heroHeadline}
                className="font-editorial text-[clamp(3rem,11vw,6.5rem)] leading-[0.92] mb-6 text-[var(--cream)]"
              >
                <div className="block">
                  THE <span className=" text-[var(--chilli-red)]">HEAT.</span>
                </div>

                <div className="block">
                  THE <span className="block">AROMA.</span>
                </div>

                <span className="block">THE</span>
                <span
                  className="block"
                  style={{
                    WebkitTextStroke: '1.5px rgba(245,239,230,0.35)',
                    color: 'transparent',
                  }}
                >
                  ORIGIN.
                </span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={heroSubtext}
                className="text-[var(--cream)] text-[15px] leading-relaxed max-w-[420px] mb-8 opacity-65 font-[var(--font-sans)]"
              >
                Sourced from India's finest growing regions. Processed with precision. Delivered with consistency — for
                food manufacturers, spice blenders, and export buyers who demand nothing less than the best.
              </motion.p>

              {/* Mobile-only image — shown between description and CTA */}
              <motion.div
                variants={heroSubtext}
                className="lg:hidden relative w-full aspect-[4/5] max-w-[360px] mx-auto mb-8 overflow-hidden rounded-sm"
              >
                <Image
                  src="/images/img-1.jpeg"
                  alt="Premium red chilli spices — export quality from India"
                  fill
                  sizes="90vw"
                  className="object-cover object-center"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(15,12,9,0.55) 100%)',
                  }}
                  aria-hidden="true"
                />
                {/* Product label strip */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(15,12,9,0.9)] to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] tracking-[0.25em] uppercase text-[var(--chilli-red)] mb-1">Product</p>
                      <p className="font-display text-[var(--cream)] text-base font-bold leading-tight">
                        Stemless Red Chilli
                      </p>
                      <p className="text-[11px] text-white/40 mt-0.5">Whole · Dried · Sorted</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Available</p>
                      <p className="text-[var(--spice-gold)] text-xs font-semibold">Bulk · Export</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA row */}
              <motion.div variants={heroSubtext} className="flex flex-wrap items-center gap-4">
                <a
                  href="#enquiry"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('enquiry')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className="btn-chilli gap-2 group"
                  aria-label="Enquire about our red chilli product"
                >
                  Request Product Details
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="#product"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('product')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                  className="btn-chilli-outline gap-2 text-[13px]"
                  aria-label="Explore our product"
                >
                  Explore Product
                </a>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="hidden lg:flex items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/[0.08]"
              >
                {[
                  { value: '15+', label: 'Years Experience' },
                  { value: '30+', label: 'Export Markets' },
                  { value: '99%', label: 'Natural Purity' },
                ].map(({ value, label }) => (
                  <motion.div key={label} variants={fadeUp} className="flex flex-col">
                    <span className="font-editorial text-[clamp(1.6rem,4vw,2.4rem)] text-[var(--chilli-red)] leading-none">
                      {value}
                    </span>
                    <span className="text-[11px] text-white/40 tracking-widest uppercase mt-1">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Product image + floating badges (desktop only) ── */}
          <motion.div
            style={{ y: imageY }}
            className="relative order-2 lg:order-2 items-center justify-center hidden lg:flex"
          >
            {/* Glowing circle behind image */}
            <div
              className="absolute inset-0 m-auto w-[75%] h-[75%] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(192,57,43,0.22) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              aria-hidden="true"
            />

            {/* Main product image */}
            <motion.div
              variants={heroImage}
              initial="hidden"
              animate="visible"
              className="relative w-full aspect-[3/4] max-w-[480px] lg:max-w-none"
            >
              {/* Outer decorative frame */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute -inset-3 border border-[var(--chilli-red)] opacity-15 rounded-sm"
                aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute -inset-6 border border-white opacity-[0.04] rounded-sm"
                aria-hidden="true"
              />

              {/* Image container */}
              <div className="relative w-full h-full overflow-hidden rounded-sm">
                <Image
                  src="/images/img-1.jpeg"
                  alt="Premium red chilli spices — export quality from India"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 45vw"
                  className="object-cover object-center"
                  priority
                />
                {/* Dark vignette at edges */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at center, transparent 55%, rgba(15,12,9,0.55) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Product label strip at bottom of image */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[rgba(15,12,9,0.9)] to-transparent"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] tracking-[0.25em] uppercase text-[var(--chilli-red)] mb-1">Product</p>
                    <p className="font-display text-[var(--cream)] text-base font-bold leading-tight">
                      Stemless Red Chilli
                    </p>
                    <p className="text-[11px] text-white/40 mt-0.5">Whole · Dried · Sorted</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 mb-1">Available</p>
                    <p className="text-[var(--spice-gold)] text-xs font-semibold">Bulk · Export</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating info badges */}
            {BADGES.map((badge) => (
              <FloatingBadge key={badge.id} {...badge} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Bottom gradient fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--warm-black)] to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
