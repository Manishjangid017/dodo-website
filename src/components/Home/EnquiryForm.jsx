'use client';

import { useState, useId, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewport, reducedMotionSafe } from '@/lib/animations';

// ─────────────────────────────────────────────────────────────────────────────
// Field Component
// ─────────────────────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  type = 'text',
  required = false,
  error,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled,
  as = 'input',
  rows = 4,
  options,
}) {
  const inputClasses = [
    'w-full bg-transparent border-b border-white/[0.18] py-3 px-0',
    'text-[var(--cream)] text-[14px] placeholder:text-white/25',
    'focus:outline-none focus:border-[var(--chilli-red)]',
    'transition-colors duration-250',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    error ? 'border-red-400' : '',
  ].join(' ');

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] tracking-[0.2em] uppercase text-white/45 font-medium">
        {label}

        {required && (
          <span className="text-[var(--chilli-red)] ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Textarea */}
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClasses} resize-none`}
        />
      ) : as === 'select' ? (
        /* Select */
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClasses} bg-transparent appearance-none`}
          style={{ colorScheme: 'dark' }}
        >
          <option value="" disabled className="bg-[#1a1611] text-white/50">
            {placeholder}
          </option>

          {options?.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#1a1611] text-white">
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        /* Input */
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClasses}
          autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : id === 'name' ? 'name' : 'off'}
        />
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.2,
            }}
            className="text-red-400 text-[12px] flex items-center gap-1.5"
          >
            <AlertCircle size={11} aria-hidden="true" />

            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial Form State
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  productInterest: '',
  location: '',
  message: '',
};

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[\d\s+\-()]{7,20}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please describe your requirement.';
  } else if (values.message.trim().length < 20) {
    errors.message = 'Please provide a bit more detail (min 20 characters).';
  }

  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
// Success State
// ─────────────────────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -15,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start gap-6 py-8"
      role="alert"
      aria-live="assertive"
    >
      {/* Success Icon */}
      <div className="w-14 h-14 rounded-sm bg-[var(--chilli-red)]/15 border border-[var(--chilli-red)]/30 flex items-center justify-center">
        <CheckCircle size={28} className="text-[var(--chilli-red)]" aria-hidden="true" />
      </div>

      {/* Message */}
      <div>
        <p className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold mb-3">
          Enquiry Received
        </p>

        <h3 className="font-display text-[var(--cream)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight mb-4">
          Thank You.
          <br />
          Your Enquiry Has Been Received.
        </h3>

        <p className="text-[var(--cream)] opacity-50 text-[14px] leading-relaxed max-w-[480px]">
          Thank you for getting in touch with us. Our team will review your requirement and get back to you within 1–2
          business days.
        </p>
      </div>

      {/* Auto Reset Message */}
      <p className="text-white/30 text-[11px] tracking-wide">This form will reset automatically...</p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Enquiry Form
// ─────────────────────────────────────────────────────────────────────────────

export default function EnquiryForm() {
  const prefersReduced = useReducedMotion();

  const formId = useId();

  const [values, setValues] = useState(INITIAL);

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const [status, setStatus] = useState('idle');

  const [submitted, setSubmitted] = useState(false);

  // ─────────────────────────────────────────
  // Handle Change
  // ─────────────────────────────────────────

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues((current) => ({
        ...current,
        [name]: value,
      }));

      // If form has already been submitted,
      // update field validation immediately.
      if (submitted) {
        setErrors((previous) => {
          const updated = validate({
            ...values,
            [name]: value,
          });

          const nextErrors = {
            ...previous,
          };

          if (updated[name]) {
            nextErrors[name] = updated[name];
          } else {
            delete nextErrors[name];
          }

          return nextErrors;
        });
      }
    },
    [values, submitted],
  );

  // ─────────────────────────────────────────
  // Handle Blur
  // ─────────────────────────────────────────

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;

      setTouched((current) => ({
        ...current,
        [name]: true,
      }));

      if (submitted) {
        return;
      }

      const validationErrors = validate(values);

      if (validationErrors[name]) {
        setErrors((previous) => ({
          ...previous,
          [name]: validationErrors[name],
        }));
      } else {
        setErrors((previous) => {
          const next = {
            ...previous,
          };

          delete next[name];

          return next;
        });
      }
    },
    [values, submitted],
  );

  // ─────────────────────────────────────────
  // Handle Submit
  // ─────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    // Frontend validation
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstErrorKey = Object.keys(validationErrors)[0];

      document.getElementById(firstErrorKey)?.focus();

      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const scriptUrl =
        'https://script.google.com/macros/s/AKfycbyfb_2D06IItWmE4mapCvLAh9dzlZBIKNlyZzE127a5n3S4GVONie1ZPNSFqqmYUfA3tQ/exec';

      // Check Google Script URL
      if (!scriptUrl) {
        throw new Error('Google Apps Script URL is missing.');
      }

      // Final payload
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        productInterest: values.productInterest,
        location: values.location.trim(),
        message: values.message.trim(),
        source: 'dodo-spices-website',
      };

      // Send to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',

        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },

        body: JSON.stringify(payload),
      });

      // Parse response
      const result = await response.json();

      // Apps Script returned error
      if (!result.success) {
        throw new Error(result.message || 'Submission failed.');
      }

      // ─────────────────────────────
      // SUCCESS
      // ─────────────────────────────

      setStatus('success');

      // Automatically reset form
      // after 4 seconds
      setTimeout(() => {
        setValues(INITIAL);

        setErrors({});

        setTouched({});

        setSubmitted(false);

        setStatus('idle');
      }, 4000);
    } catch (error) {
      console.error('Enquiry submission failed:', error);

      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

  // ─────────────────────────────────────────
  // Product Options
  // ─────────────────────────────────────────

  const productOptions = [
    {
      value: 'stemless-whole',
      label: 'Stemless Red Chilli (Whole)',
    },
    {
      value: 'whole',
      label: 'Whole Red Chilli (Stem Intact)',
    },
    {
      value: 'flakes',
      label: 'Red Chilli Flakes',
    },
    {
      value: 'all',
      label: 'All Variants — Need More Info',
    },
  ];

  return (
    <section id="enquiry" className="relative bg-[var(--charcoal)] overflow-hidden" aria-label="Product enquiry form">
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.06] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at right top, var(--chilli-red), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-24 lg:pt-32 lg:pb-36">
        {/* Section Label */}
        <motion.div
          variants={reducedMotionSafe(fadeUp, prefersReduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center gap-3 mb-10"
        >
          <span className="divider-red" aria-hidden="true" />

          <span className="text-[var(--chilli-red)] text-[11px] tracking-[0.3em] uppercase font-semibold">Enquiry</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          {/* ─────────────────────────────────
              LEFT CONTENT
          ───────────────────────────────── */}

          <motion.div
            variants={reducedMotionSafe(fadeLeft, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col justify-start"
          >
            <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] text-[var(--cream)] font-bold leading-[1.05] mb-5">
              Let&apos;s Talk About
              <br />
              <em className="not-italic text-[var(--chilli-red)]">Your Requirement.</em>
            </h2>

            <p className="text-[var(--cream)] opacity-45 text-[14px] leading-relaxed max-w-[340px] mb-10">
              Tell us what you are looking for and our team will get back to you with availability, specifications, and
              pricing.
            </p>

            {/* Contact reassurance */}
            <div className="flex flex-col gap-4">
              {[
                {
                  label: 'Response Time',
                  value: '1–2 Business Days',
                },
                {
                  label: 'Samples',
                  value: 'Available on Request',
                },
                {
                  label: 'Supply',
                  value: 'Bulk · Wholesale · Export',
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-1 h-8 bg-[var(--chilli-red)] shrink-0" aria-hidden="true" />

                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/35 font-medium">{label}</p>

                    <p className="text-[var(--cream)] text-[13px] font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─────────────────────────────────
              RIGHT FORM
          ───────────────────────────────── */}

          <motion.div
            variants={reducedMotionSafe(fadeRight, prefersReduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <AnimatePresence mode="wait">
              {/* SUCCESS */}
              {status === 'success' ? (
                <SuccessState key="success" />
              ) : (
                /* FORM */
                <motion.form
                  key="form"
                  id={`${formId}-form`}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Send product enquiry"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                      margin: '-40px',
                    }}
                    className="flex flex-col gap-7"
                  >
                    {/* ─────────────────────
                        Row 1
                        Name + Email
                    ───────────────────── */}

                    <motion.div
                      variants={reducedMotionSafe(fadeUp, prefersReduced)}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-7"
                    >
                      <Field
                        id="name"
                        label="Full Name"
                        required
                        placeholder="Your full name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        error={touched.name || submitted ? errors.name : undefined}
                      />

                      <Field
                        id="email"
                        label="Email Address"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        error={touched.email || submitted ? errors.email : undefined}
                      />
                    </motion.div>

                    {/* ─────────────────────
                        Row 2
                        Phone + Product
                    ───────────────────── */}

                    <motion.div
                      variants={reducedMotionSafe(fadeUp, prefersReduced)}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-7"
                    >
                      <Field
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        required
                        placeholder="+91 99999 00000"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        error={touched.phone || submitted ? errors.phone : undefined}
                      />

                      <Field
                        id="productInterest"
                        label="Product Interest"
                        as="select"
                        placeholder="Select product type"
                        value={values.productInterest}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        options={productOptions}
                      />
                    </motion.div>

                    {/* ─────────────────────
                        Row 3
                        Location
                    ───────────────────── */}

                    <motion.div variants={reducedMotionSafe(fadeUp, prefersReduced)}>
                      <Field
                        id="location"
                        label="Location"
                        placeholder="Your country or city"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                      />
                    </motion.div>

                    {/* ─────────────────────
                        Row 4
                        Message
                    ───────────────────── */}

                    <motion.div variants={reducedMotionSafe(fadeUp, prefersReduced)}>
                      <Field
                        id="message"
                        label="Requirement / Message"
                        as="textarea"
                        required
                        rows={5}
                        placeholder="Describe your product requirement, intended use, or any specific questions..."
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isLoading}
                        error={touched.message || submitted ? errors.message : undefined}
                      />
                    </motion.div>

                    {/* ─────────────────────
                        Server Error
                    ───────────────────── */}

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: -8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          role="alert"
                          aria-live="assertive"
                          className="flex items-start gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30"
                        >
                          <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" aria-hidden="true" />

                          <p className="text-red-400 text-[13px] leading-snug">
                            Something went wrong while sending your enquiry. Please try again or contact us directly.
                            Your message has not been lost.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ─────────────────────
                        Submit
                    ───────────────────── */}

                    <motion.div
                      variants={reducedMotionSafe(fadeUp, prefersReduced)}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
                    >
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-chilli gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={isLoading ? 'Sending your enquiry...' : 'Send enquiry'}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                            Sending&hellip;
                          </>
                        ) : (
                          <>
                            Send Enquiry
                            <ArrowUpRight
                              size={15}
                              className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </button>

                      <p className="text-white/25 text-[12px] leading-snug max-w-[280px]">
                        By submitting, you agree that your details will be used to respond to your enquiry only.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
