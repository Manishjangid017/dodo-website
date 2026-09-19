'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { fadeUp, fadeLeft, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

const FAQS = [
  {
    id: 'q1',
    question: 'What type of red chilli do you offer?',
    answer:
      'We primarily supply dried red chilli in stemless (whole, stem and calyx removed) and whole (stem intact) forms. We also offer red chilli flakes — coarsely crushed with seeds. All variants are sourced from established growing regions in India and processed to export-grade standards.',
  },
  {
    id: 'q2',
    question: 'What grades are available?',
    answer:
      'We supply Grade A export-quality product as our standard. Specific ASTA colour values, moisture levels, and foreign matter tolerances can be shared upon request. Custom grading is available for buyers with specific destination-country requirements.',
  },
  {
    id: 'q3',
    question: 'What packaging options are available?',
    answer:
      'Standard packs range from 1 kg retail bags to 50 kg bulk sacks. For export or OEM buyers, custom pack sizes, private labelling, and buyer-specific marking are available. Please indicate your preferred format in your enquiry and we will confirm availability.',
  },
  {
    id: 'q4',
    question: 'Do you provide bulk and wholesale quantities?',
    answer:
      'Yes. We supply in bulk quantities suited for food manufacturers, spice processors, and wholesale traders. Minimum order quantities vary by product variant and form. Please use the enquiry form to share your volume requirement and we will respond with availability and pricing information.',
  },
  {
    id: 'q5',
    question: 'Can you supply for export?',
    answer:
      'Yes. Our product is packed and documented to meet standard international import requirements. We support export buyers with the appropriate product documentation, phytosanitary certificates, and grade specifications for major destination markets. Enquire with your destination country for specific requirements.',
  },
  {
    id: 'q6',
    question: 'How is the product quality assured?',
    answer:
      'Every lot undergoes pre-dispatch quality checks covering moisture content, colour value (ASTA), foreign matter percentage, and purity. Only lots meeting our defined specifications are approved for packing. Test reports are available for buyers who require them.',
  },
  {
    id: 'q7',
    question: 'How can I request product samples or detailed specifications?',
    answer:
      'Use the enquiry form on this page to describe your requirement. Include your intended application, preferred form, and approximate volume. Our team will respond with detailed specifications, available grades, and where applicable, arrange product samples.',
  },
  {
    id: 'q8',
    question: 'What is the typical lead time for an order?',
    answer:
      'Lead times depend on order volume, packaging format, and current availability. Standard bulk lots are typically ready within [X] days of order confirmation. For custom packing and export documentation, allow additional time. Exact timelines are confirmed at the time of order. [Placeholder — update with actual lead time data.]',
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="border-b border-white/[0.07]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-trigger-${item.id}`}
        className={[
          'w-full flex items-start justify-between gap-4 py-5 text-left',
          'transition-colors duration-200',
          'group',
          isOpen ? 'text-[var(--cream)]' : 'text-[rgba(245,239,230,0.65)] hover:text-[var(--cream)]',
        ].join(' ')}
      >
        <span className="font-display text-[1rem] sm:text-[1.05rem] font-semibold leading-snug pr-4">
          {item.question}
        </span>
        <span
          className={[
            'shrink-0 mt-0.5 w-7 h-7 rounded-sm flex items-center justify-center border transition-all duration-300',
            isOpen
              ? 'bg-[var(--chilli-red)] border-[var(--chilli-red)]'
              : 'border-white/[0.15] group-hover:border-[var(--chilli-red)]/50',
          ].join(' ')}
          aria-hidden="true"
        >
          {isOpen
            ? <Minus size={13} className="text-white" />
            : <Plus size={13} className="text-[var(--cream)] opacity-70" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            key="answer"
            initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[var(--cream)] opacity-55 text-[14px] leading-relaxed pb-6 max-w-[720px] pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState('q1');
  const prefersReduced = useReducedMotion();

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <section
      id="faq"
      className="relative bg-[var(--warm-black)] overflow-hidden"
      aria-label="Frequently asked questions"
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--chilli-red), transparent 70%)',
          filter: 'blur(80px)',
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
            FAQ
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-12 lg:gap-24">

          {/* Left — headline */}
          <motion.div
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="lg:sticky lg:top-28 self-start"
          >
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-[var(--cream)] font-bold leading-[1.05] mb-6">
              Common
              <br />
              <span className="text-[var(--chilli-red)]">Questions.</span>
            </h2>
            <p className="text-[var(--cream)] opacity-45 text-[14px] leading-relaxed max-w-[300px] mb-8">
              Can't find the answer you need? Send us an enquiry and our team
              will get back to you directly.
            </p>
            <a
              href="#enquiry"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="btn-chilli text-[12px] px-5 py-2.5"
              aria-label="Go to enquiry form"
            >
              Send an Enquiry
            </a>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div
              role="list"
              aria-label="Frequently asked questions list"
              className="border-t border-white/[0.07]"
            >
              {FAQS.map((item) => (
                <motion.div
                  key={item.id}
                  variants={reducedMotionSafe(fadeUp, prefersReduced)}
                  role="listitem"
                >
                  <AccordionItem
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
