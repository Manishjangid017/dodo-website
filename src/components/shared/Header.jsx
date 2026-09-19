'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Product', href: '#product' },
  { label: 'Our Story', href: '#story' },
  { label: 'Quality', href: '#quality' },
  { label: 'Applications', href: '#applications' },
  { label: 'Enquiry', href: '#enquiry' },
];

// ─── Mobile overlay animation variants ───────────────────────────────────────
const overlayVariants = {
  closed: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  open: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
  exit: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
};

const mobileNavItem = {
  closed: { opacity: 0, y: 24 },
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.07 },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const prefersReduced = useReducedMotion();

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section detection via IntersectionObserver ──
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Lock body scroll when menu open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (href) => {
      setMenuOpen(false);
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(
          () => {
            el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
          },
          menuOpen ? 400 : 0,
        );
      }
    },
    [menuOpen, prefersReduced],
  );

  return (
    <>
      {/* ── Main Header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500 ease-out',
          scrolled
            ? 'py-3 bg-[rgba(15,12,9,0.88)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* ── Logo / Brand ── */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-3 group"
              aria-label="Dodo Spices — Home"
            >
              <div className="relative w-9 h-9 rounded-sm overflow-hidden ring-1 ring-white/10 group-hover:ring-[var(--chilli-red)] transition-all duration-300">
                <Image src="/logo.jpeg" alt="Dodo Spices logo" fill sizes="36px" className="object-cover" priority />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-[var(--cream)] text-sm font-semibold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Dodo
                </span>
                <span
                  className="text-[var(--chilli-red)] text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Spices
                </span>
              </div>
            </a>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(href);
                    }}
                    className={[
                      'relative px-4 py-2 text-[13px] font-medium tracking-wide',
                      'transition-colors duration-250',
                      'underline-hover',
                      isActive ? 'text-[var(--cream)]' : 'text-[rgba(245,239,230,0.55)] hover:text-[var(--cream)]',
                    ].join(' ')}
                  >
                    {label}
                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavDot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--chilli-red)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.header>
    </>
  );
}
