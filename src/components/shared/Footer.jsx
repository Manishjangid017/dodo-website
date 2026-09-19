import Image from 'next/image';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Product', href: '#product' },
  { label: 'Our Story', href: '#story' },
  { label: 'Quality', href: '#quality' },
  { label: 'Enquiry', href: '#enquiry' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', placeholder: true },
  { label: 'LinkedIn', href: '#', placeholder: true },
  { label: 'WhatsApp', href: '#', placeholder: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[var(--warm-black)] border-t border-white/[0.06] overflow-hidden"
      aria-label="Site footer"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute top-0 left-0 w-1/3 h-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at left top, var(--chilli-red), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Top band ── */}
        <div className="pt-16 pb-12 lg:pt-20 lg:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-10 lg:gap-16">
          {/* Brand column — full width on mobile, spans both sm cols */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 group w-fit" aria-label="Dodo Spices — Back to top">
              <div className="relative w-10 h-10 rounded-sm overflow-hidden ring-1 ring-white/10 group-hover:ring-[var(--chilli-red)] transition-all duration-300">
                <Image src="/logo.jpeg" alt="Dodo Spices logo" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[var(--cream)] text-sm font-semibold tracking-widest uppercase">Dodo</span>
                <span className="text-[var(--chilli-red)] text-[10px] tracking-[0.2em] uppercase font-medium">
                  Spices
                </span>
              </div>
            </a>

            <p className="text-white/35 text-[13px] leading-relaxed max-w-[280px]">
              Premium export-quality red chilli spices. Sourced from India&apos;s finest growing regions. Processed for
              consistency. Trusted by buyers globally.
            </p>

            {/* Social — placeholders */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`${s.label} ${s.placeholder ? '(link placeholder)' : ''}`}
                  className="w-8 h-8 border border-white/[0.12] flex items-center justify-center text-white/35 hover:text-[var(--cream)] hover:border-[var(--chilli-red)]/50 transition-all duration-250"
                >
                  <span className="text-[10px] font-bold tracking-wider">{s.label.slice(0, 2).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-semibold mb-5">Navigation</p>
            <ul className="flex flex-col gap-2.5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/45 text-[13px] hover:text-[var(--cream)] transition-colors duration-200 underline-hover"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-semibold mb-5">Contact</p>
            <ul className="flex flex-col gap-4" role="list">
              <li className="flex items-start gap-3">
                <Mail size={13} className="text-[var(--chilli-red)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/25 mb-0.5">Email</p>
                  <a
                    href="mailto:info@dodospices.com"
                    className="text-white/50 text-[13px] hover:text-[var(--cream)] transition-colors duration-200"
                    aria-label="Email us at info@dodospices.com (placeholder)"
                  >
                    info@dodospices.com
                  </a>
                  <p className="text-white/20 text-[11px] mt-0.5">[Placeholder — update email]</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={13} className="text-[var(--chilli-red)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/25 mb-0.5">Phone</p>
                  <a
                    href="tel:+910000000000"
                    className="text-white/50 text-[13px] hover:text-[var(--cream)] transition-colors duration-200"
                    aria-label="Call us (placeholder number)"
                  >
                    +91 00000 00000
                  </a>
                  <p className="text-white/20 text-[11px] mt-0.5">[Placeholder — update number]</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin size={13} className="text-[var(--chilli-red)] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/25 mb-0.5">Location</p>
                  <p className="text-white/50 text-[13px]">India</p>
                  <p className="text-white/20 text-[11px] mt-0.5">[Placeholder — update city/address]</p>
                </div>
              </li>
            </ul>

            {/* Enquire CTA */}
            <a
              href="#enquiry"
              className="btn-chilli mt-8 text-[12px] px-5 py-2.5 inline-flex gap-2 group"
              aria-label="Go to enquiry form"
            >
              Send an Enquiry
              <ArrowUpRight
                size={13}
                className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-[11px] text-center sm:text-left">
            &copy; {year} Dodo Spices. All rights reserved.
          </p>
          <p className="text-white/15 text-[10px] text-center">
            Premium Red Chilli Spices &middot; Export Quality &middot; India
          </p>
        </div>
      </div>
    </footer>
  );
}
