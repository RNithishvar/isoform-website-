import { useRef } from 'react';
import { Link } from 'react-router';
import { media } from '../../data/projects.js';
import { clamp01 } from '../../lib/scroll.js';
import { useScrollTrack } from '../../lib/useScrollTrack.js';
import { ArrowRight } from '../Icon.jsx';
import { Mark } from '../Logo.jsx';
import Reveal from '../Reveal.jsx';

const PARAGRAPH =
  'ISOFORM handles the whole online side of a business: the website, the social media, the videos, the automations and the brand behind them. Because one team makes all of it, everything looks and sounds like one business.';

// A small picture that opens up inside the sentence as you scroll.
function Pill({ i, children }) {
  return (
    <span className="pill" style={{ '--i': i }} aria-hidden="true">
      {children}
    </span>
  );
}

export default function StudioSection() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const words = PARAGRAPH.split(' ');

  // 0 as the heading enters from the bottom, 1 by the time it nears the middle
  useScrollTrack(titleRef, (rect, vh, el) => {
    el.style.setProperty('--p', clamp01((vh * 0.92 - rect.top) / (vh * 0.55)).toFixed(3));
  });
  // 0 as the paragraph enters, 1 when its last line is well inside the viewport
  useScrollTrack(paragraphRef, (rect, vh, el) => {
    el.style.setProperty('--p', clamp01((vh * 0.88 - rect.top) / (vh * 0.42 + rect.height)).toFixed(3));
  });

  return (
    <section className="relative py-24 md:py-40" aria-labelledby="studio-title">
      <div className="wrap">
        <Reveal as="p" className="label-caps text-brand-300">
          The studio
        </Reveal>

        <h2 id="studio-title" ref={titleRef} className="statement mt-8 md:mt-12">
          <span className="line">
            Your{' '}
            <Pill i={0}>
              <img src={media.pillSite} alt="" loading="lazy" decoding="async" className="object-[30%_42%]" />
            </Pill>
            website,
          </span>{' '}
          <span className="line">
            your{' '}
            <Pill i={1}>
              <img src={media.pillFeed} alt="" loading="lazy" decoding="async" className="object-[50%_74%]" />
            </Pill>
            feed and
          </span>{' '}
          <span className="line">
            your{' '}
            <Pill i={2}>
              <span className="absolute inset-0 flex items-center justify-center bg-brand">
                <Mark className="h-[58%] w-auto text-white" />
              </span>
            </Pill>
            brand,
          </span>{' '}
          <span className="line">
            <em className="serif-accent text-brand-200">designed as one.</em>
          </span>
        </h2>

        <div className="mt-14 grid gap-10 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <p
              ref={paragraphRef}
              className="word-reveal text-[clamp(1.375rem,2.5vw,2.25rem)] font-light leading-[1.32] tracking-[-0.02em]"
              style={{ '--n': words.length }}
            >
              {words.map((word, index) => (
                <span key={index} style={{ '--i': index }}>
                  {word}{' '}
                </span>
              ))}
            </p>
            <Reveal className="mt-10">
              <Link to="/about" className="link-arrow">
                About the studio
                <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
