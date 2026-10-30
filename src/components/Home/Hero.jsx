'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Edit the content here. Everything else is layout.
   ───────────────────────────────────────────────────────────────────────────── */
const HEADLINE = ['The heat.', 'The aroma.', 'The origin.'];

const CHIPS = [
  { label: 'Origin', value: 'India', pos: 'top-[8%] -left-1 lg:-left-8', delay: 1.2, bob: '0s' },
  { label: 'Grade', value: 'Export quality', pos: 'top-[43%] -right-1 lg:-right-10', delay: 1.4, bob: '-2s' },
  { label: 'Purity', value: '99% natural', pos: 'bottom-[9%] left-1 lg:-left-6', delay: 1.6, bob: '-4s' },
];

const RING_TEXT = 'STEMLESS RED CHILLI • SUN-DRIED • HAND-SORTED • BULK AND EXPORT • PREMIUM FROM INDIA • ';

const STATS = [
  { value: '15+', label: 'Years experience' },
  { value: '30+', label: 'Export markets' },
  { value: '99%', label: 'Natural purity' },
];

const MARQUEE = ['Stemless', 'Sun-dried', 'Hand-sorted', 'Bulk supply', 'Export packing', 'Consistent grade'];

// Deterministic (no Math.random) so server and client render the same markup
const EMBERS = Array.from({ length: 14 }).map((_, i) => ({
  left: 14 + ((i * 37) % 72),
  size: 2 + (i % 3),
  dur: 5 + (i % 5) * 1.4,
  delay: (i * 0.7) % 6,
  x: (i % 2 ? 1 : -1) * (10 + ((i * 13) % 40)),
  rise: 180 + ((i * 53) % 150),
}));

const EASE = [0.22, 1, 0.36, 1];
const GOLD_LINE = 'color-mix(in srgb, var(--spice-gold) 45%, transparent)';

function scrollToId(id) {
  return (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
}

/* ── Right side: heat medallion ───────────────────────────────────────────── */
function HeatMedallion({ reduced }) {
  // Pointer parallax: ring, medallion and chips move at different depths
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });

  const ringX = useTransform(sx, (v) => v * -12);
  const ringY = useTransform(sy, (v) => v * -12);
  const coreX = useTransform(sx, (v) => v * 18);
  const coreY = useTransform(sy, (v) => v * 18);
  const chipX = useTransform(sx, (v) => v * 32);
  const chipY = useTransform(sy, (v) => v * 32);

  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1, ease: EASE }}
      className="relative mx-auto aspect-square w-full max-w-[460px] sm:max-w-[520px] lg:w-[min(100%,calc(100svh-15rem))] lg:min-w-[380px] lg:max-w-[600px]"
      role="img"
      aria-label="DODO Agro Food Industry red chilli emblem with product details: origin India, export quality, 99% natural"
    >
      {/* Heat glow behind everything */}
      <div
        className="hero-glow absolute inset-[6%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(192,57,43,0.55) 0%, rgba(150,40,27,0.2) 45%, transparent 70%)',
          filter: 'blur(28px)',
        }}
        aria-hidden="true"
      />

      {/* Expanding heat ripples */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="hero-ripple absolute inset-0 rounded-full border border-[var(--chilli-red)]"
          style={{ animationDelay: `${i * 2.2}s` }}
          aria-hidden="true"
        />
      ))}

      {/* Embers rising */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="hero-ember absolute bottom-[16%] rounded-full bg-[var(--spice-gold)]"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
              '--x': `${e.x}px`,
              '--rise': `${e.rise}px`,
              boxShadow: '0 0 8px 1px rgba(224,160,60,0.8)',
            }}
          />
        ))}
      </div>

      {/* Rotating text ring + dashed ring (back layer) */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute inset-0" aria-hidden="true">
        <svg viewBox="0 0 400 400" className="hero-spin absolute inset-0 h-full w-full">
          <defs>
            <path id="hero-ring-path" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
          </defs>
          <text
            className="font-editorial"
            fontSize="17"
            fill="var(--spice-gold)"
            opacity="0.8"
            textLength="1160"
            lengthAdjust="spacing"
          >
            <textPath href="#hero-ring-path">{RING_TEXT}</textPath>
          </text>
        </svg>
        <div
          className="hero-spin-rev absolute inset-[7%] rounded-full border border-dashed"
          style={{ borderColor: GOLD_LINE }}
        />
      </motion.div>

      {/* Medallion with the brand emblem */}
      <motion.div style={{ x: coreX, y: coreY }} className="absolute inset-[16%]">
        <div
          className="relative h-full w-full overflow-hidden rounded-full bg-black"
          style={{
            border: `2px solid ${GOLD_LINE}`,
            boxShadow:
              '0 0 0 6px rgba(15,12,9,0.9), 0 0 0 7px rgba(255,255,255,0.08), 0 20px 80px rgba(192,57,43,0.35)',
          }}
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(192,57,43,0.28),transparent_65%)]"
            aria-hidden="true"
          />
          <Image
            src="/images/img-1.jpeg"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 380px, 32vw"
            className="object-contain p-[9%]"
            style={{
              WebkitMaskImage: 'radial-gradient(circle at center, #000 58%, transparent 76%)',
              maskImage: 'radial-gradient(circle at center, #000 58%, transparent 76%)',
            }}
          />
          <div className="absolute inset-[3%] rounded-full border border-white/10" aria-hidden="true" />
        </div>
      </motion.div>

      {/* Floating spec chips */}
      <motion.div style={{ x: chipX, y: chipY }} className="pointer-events-none absolute inset-0 z-20">
        {CHIPS.map(({ label, value, pos, delay, bob }) => (
          <motion.div
            key={label}
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.6, ease: EASE }}
            className={`absolute ${pos}`}
          >
            <div className="hero-bob" style={{ animationDelay: bob }}>
              <div
                className="flex items-center gap-2.5 border px-3 py-2 backdrop-blur-md sm:px-4 sm:py-2.5"
                style={{ borderColor: GOLD_LINE, background: 'rgba(15,12,9,0.78)' }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--chilli-red)]" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-medium leading-none text-[var(--spice-gold)] sm:text-[11px]">
                    {label}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold leading-none text-[var(--cream)] sm:text-[13px]">
                    {value}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Marquee: pure CSS, endless, no jump ──────────────────────────────────── */
function MarqueeStrip() {
  // One half = the list repeated 3x, so a half is always wider than the screen.
  // The track slides exactly -50% (one full half), then restarts on an identical frame.
  const half = [...MARQUEE, ...MARQUEE, ...MARQUEE];
  const renderHalf = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {half.map((item, i) => (
        <div key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap px-6 text-[13px] font-medium text-white/65 sm:px-9 sm:text-sm">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--chilli-red)]" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="relative z-20 w-full overflow-hidden border-t border-white/10"
      style={{ background: 'rgba(15,12,9,0.9)' }}
      aria-hidden="true"
    >
      <div className="hero-marquee flex w-max items-center py-3.5 sm:py-4">
        {renderHalf('a')}
        {renderHalf('b')}
      </div>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '25%']);
  const textFade = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Premium red chilli spices"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--warm-black)]"
    >
      <style>{`
        @keyframes hero-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
        @keyframes hero-spin { to { transform: rotate(360deg); } }
        @keyframes hero-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes hero-ripple { 0% { transform: scale(0.6); opacity: 0.5; } 100% { transform: scale(1.12); opacity: 0; } }
        @keyframes hero-glow { 0%,100% { opacity: 0.6; transform: scale(0.96); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes hero-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes hero-ember {
          0% { transform: translate3d(0,0,0) scale(1); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translate3d(var(--x), calc(var(--rise) * -1), 0) scale(0.3); opacity: 0; }
        }
        .hero-marquee { animation: hero-marquee 45s linear infinite; will-change: transform; }
        .hero-spin { animation: hero-spin 50s linear infinite; }
        .hero-spin-rev { animation: hero-spin-rev 70s linear infinite; }
        .hero-ripple { animation: hero-ripple 6.6s ease-out infinite; }
        .hero-glow { animation: hero-glow 4.5s ease-in-out infinite; }
        .hero-bob { animation: hero-bob 6s ease-in-out infinite; }
        .hero-ember { animation-name: hero-ember; animation-iteration-count: infinite; animation-timing-function: ease-out; opacity: 0; }
        @media (prefers-reduced-motion: reduce) {
          .hero-ripple, .hero-ember, .hero-bob, .hero-glow { animation: none; }
          .hero-ripple, .hero-ember { display: none; }
        }
      `}</style>

      {/* Background glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_70%,rgba(150,40,27,0.38),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_8%_8%,rgba(192,57,43,0.14),transparent_60%)]" />
      </motion.div>

      {/* Content, vertically centred in the space above the marquee */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-12 pt-28 sm:px-8 md:pt-32 lg:px-12 lg:pb-10 lg:pt-24">
          <div className="grid grid-cols-1 items-center gap-x-12 gap-y-12 lg:grid-cols-12">
            {/* ── Left: text ── */}
            <motion.div style={{ opacity: textFade }} className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-5 flex items-center gap-3 text-[12px] font-semibold text-[var(--chilli-red)] sm:text-[13px]"
              >
                <span className="divider-red" aria-hidden="true" />
                Premium red chilli, direct from India
              </motion.p>

              <h1 className="font-editorial mb-6 text-[clamp(3.4rem,14vw,7rem)] leading-[0.9] text-[var(--cream)] sm:mb-7 lg:text-[clamp(4rem,min(7.2vw,13vh),7.5rem)]">
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="block"
                      initial={reduced ? false : { y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.15 + i * 0.14, duration: 0.85, ease: EASE }}
                      style={
                        i === HEADLINE.length - 1
                          ? { WebkitTextStroke: '1.5px rgba(245,239,230,0.45)', color: 'transparent' }
                          : i === 0
                            ? { color: 'var(--chilli-red)' }
                            : undefined
                      }
                    >
                      {line.toUpperCase()}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                className="mb-8 max-w-[480px] text-[15px] leading-relaxed text-[var(--cream)]/70 sm:text-base"
              >
                Sourced from India&apos;s finest growing regions, processed with precision and delivered with
                consistency. Built for food manufacturers, spice blenders and export buyers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  <a
                    href="#enquiry"
                    onClick={scrollToId('enquiry')}
                    className="btn-chilli group w-full justify-center gap-2 sm:w-auto"
                  >
                    Request product details
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="#product"
                    onClick={scrollToId('product')}
                    className="btn-chilli-outline w-full justify-center gap-2 text-[13px] sm:w-auto"
                  >
                    Explore product
                  </a>
                </div>

                <dl className="mt-9 grid max-w-[560px] grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-8">
                  {STATS.map(({ value, label }) => (
                    <div key={label}>
                      <dd className="font-editorial text-[clamp(1.9rem,6vw,2.5rem)] leading-none text-[var(--chilli-red)]">
                        {value}
                      </dd>
                      <dt className="mt-1.5 text-[11px] leading-snug text-white/50 sm:text-xs">{label}</dt>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </motion.div>

            {/* ── Right: heat medallion ── */}
            <div className="px-3 sm:px-6 lg:col-span-5 lg:px-0">
              <HeatMedallion reduced={reduced} />
            </div>
          </div>
        </div>
      </div>

      <MarqueeStrip />
    </section>
  );
}
