import { useEffect, useRef } from 'react';
import { prefersReducedMotion, trackScroll } from './scroll.js';

// Calls fn(rect, viewportHeight, element) whenever the page scrolls or resizes.
// Skipped entirely for people who prefer reduced motion: the CSS defaults
// already show every scroll effect in its finished state.
export function useScrollTrack(ref, fn) {
  const latest = useRef(fn);
  latest.current = fn;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    return trackScroll(el, (rect, viewportHeight) => latest.current(rect, viewportHeight, el));
  }, [ref]);
}
