'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Fixes Next.js App Router hash navigation scroll bleed.
 *
 * Problem: navigating from a scrolled page to /path#section keeps the old
 * scroll position momentarily, so the target page appears mid-scroll.
 *
 * Fix:
 *  1. On every pathname change, immediately snap to the top.
 *  2. If there's a hash, wait one frame for the page to paint, then scroll
 *     to the element with navbar offset applied.
 *  3. Retry up to 10 times (80ms apart) to handle SSR hydration lag.
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    // Snap to top instantly — kills scroll bleed from previous page
    window.scrollTo({ top: 0, behavior: 'instant' });

    const hash = window.location.hash.slice(1); // e.g. "crm", "email", "ai"
    if (!hash) return;

    // All services hashes point to the same section element id="crm"
    // (the tab is activated separately in ServicesTabs via hashchange)
    const targetId = 'crm';
    const NAVBAR_OFFSET = 80; // sticky navbar ~60px + breathing room
    let attempts = 0;

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      } else if (attempts < 10) {
        attempts++;
        setTimeout(scrollToTarget, 80);
      }
    };

    requestAnimationFrame(() => setTimeout(scrollToTarget, 50));
  }, [pathname]);

  return null;
}
