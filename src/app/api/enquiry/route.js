/**
 * POST /api/enquiry
 *
 * Accepts a JSON body from the EnquiryForm client component,
 * appends a timestamp and source page, then forwards the data
 * to the Google Apps Script web-app endpoint configured via
 * the GOOGLE_SHEET_ENDPOINT environment variable.
 *
 * Environment variable (set in .env.local):
 *   GOOGLE_SHEET_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 *
 * The Google Apps Script should accept a POST with a JSON body
 * and write one row to the configured spreadsheet.
 *
 * Expected incoming JSON shape:
 * {
 *   name:            string  (required)
 *   company:         string  (required)
 *   email:           string  (required)
 *   phone:           string  (required)
 *   quantity:        string  (optional)
 *   country:         string  (optional)
 *   productInterest: string  (optional)
 *   message:         string  (required)
 *   source:          string  (optional, defaults to 'website')
 * }
 */

import { NextResponse } from 'next/server';

// Rate-limit state — simple in-memory store per process instance.
// For production at scale, replace with Redis/KV.
const RATE_LIMIT_MAP = new Map(); // key: IP → { count, resetAt }
const RATE_WINDOW_MS = 60_000;    // 1 minute
const RATE_LIMIT_MAX = 5;         // max 5 submissions per minute per IP

function getRateLimitKey(request) {
  // X-Forwarded-For is set by Vercel / most hosting platforms
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ─── Field validators ─────────────────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, maxLen);
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request) {
  // ── Rate limiting ──
  const ip = getRateLimitKey(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait a moment and try again.' },
      { status: 429 }
    );
  }

  // ── Parse body ──
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── Server-side validation ──
  const name    = sanitise(body.name,    120);
  const company = sanitise(body.company, 120);
  const email   = sanitise(body.email,   120);
  const phone   = sanitise(body.phone,   40);
  const message = sanitise(body.message, 2000);

  if (!name || !company || !email || !phone || !message) {
    return NextResponse.json(
      { error: 'Required fields are missing.' },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Invalid email address.' },
      { status: 400 }
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: 'Message is too short.' },
      { status: 400 }
    );
  }

  // ── Build payload ──
  const payload = {
    timestamp:       new Date().toISOString(),
    name,
    company,
    email,
    phone,
    quantity:        sanitise(body.quantity,        100),
    country:         sanitise(body.country,         100),
    productInterest: sanitise(body.productInterest, 100),
    message,
    source:          sanitise(body.source || 'website', 50),
  };

  // ── Forward to Google Sheets ──
  const endpoint = process.env.GOOGLE_SHEET_ENDPOINT;

  if (!endpoint) {
    // In development without the env var, log and return success
    // so the frontend form can be tested end-to-end.
    console.warn('[/api/enquiry] GOOGLE_SHEET_ENDPOINT is not set. Payload logged below:');
    console.log(payload);
    return NextResponse.json({ success: true, dev: true });
  }

  try {
    const gsRes = await fetch(endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      // Reasonable timeout — Google Apps Script can be slow on cold start
      signal:  AbortSignal.timeout(15_000),
    });

    if (!gsRes.ok) {
      const text = await gsRes.text().catch(() => '');
      console.error(`[/api/enquiry] Google Sheets returned ${gsRes.status}: ${text}`);
      return NextResponse.json(
        { error: 'Failed to record your enquiry. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[/api/enquiry] Fetch to Google Sheets failed:', err?.message ?? err);
    return NextResponse.json(
      { error: 'Could not reach the submission service. Please try again later.' },
      { status: 503 }
    );
  }
}

// Only POST is supported on this route
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
