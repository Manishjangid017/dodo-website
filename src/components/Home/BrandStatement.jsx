'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { viewport } from '@/lib/animations';

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-12%', '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      id="brand-statement"
      className="relative overflow-hidden bg-[var(--warm-black)]"
      style={{ minHeight: '70vh' }}
      aria-label="Brand statement"
    >
      {/* ── Parallax background image ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-15%] z-0" aria-hidden="true">
        <Image
          src="/images/bg-img-3.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        {/* Multi-layer overlay: dark warmth */}
        <div className="absolute inset-0 bg-[rgba(15,12,9,0.82)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(150,40,27,0.25),transparent_70%)]" />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8 py-28 lg:py-40 min-h-[70vh]"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="block w-8 h-[1px] bg-[var(--chilli-red)]" aria-hidden="true" />
          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Our Promise
          </span>
          <span className="block w-8 h-[1px] bg-[var(--chilli-red)]" aria-hidden="true" />
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          viewport={viewport}
          className="font-editorial text-[clamp(3.5rem,10vw,9rem)] text-[var(--cream)] leading-[0.92] tracking-wide max-w-[1000px]"
        >
          FROM THE FIELD
          <br />
          <span
            className="text-[var(--chilli-red)]"
            style={{
              textShadow: '0 0 80px rgba(192,57,43,0.4)',
            }}
          >
            TO THE FLAVOUR.
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          viewport={viewport}
          className="text-[var(--cream)] opacity-50 text-[15px] leading-relaxed max-w-[500px] mt-8 mb-10"
        >
          Every pod we supply carries the care of the grower, the discipline of our process, and our commitment to
          delivering what we promise — every time.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#enquiry"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          viewport={viewport}
          className="btn-chilli group gap-2"
          aria-label="Enquire about our red chilli product"
        >
          Discuss Your Requirement
          <ArrowUpRight
            size={15}
            className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </motion.a>

        {/* Decorative large text watermark */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          viewport={viewport}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 font-editorial text-white/[0.03] text-[clamp(4rem,15vw,12rem)] leading-none whitespace-nowrap select-none pointer-events-none tracking-widest"
          aria-hidden="true"
        >
          DODO SPICES
        </motion.p>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--warm-black)] to-transparent z-20 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
