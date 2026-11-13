import { useRef } from 'react';
import { Link } from 'react-router';
import { selectedWork } from '../../data/projects.js';
import { clamp01 } from '../../lib/scroll.js';
import { useScrollTrack } from '../../lib/useScrollTrack.js';
import { ProjectLink, ProjectVisual } from '../Frames.jsx';
import { ArrowRight } from '../Icon.jsx';
import SectionHeading from '../SectionHeading.jsx';

// Selected work as a deck: on large screens each card sticks near the top and
// the next one slides over it. On small screens it is a simple list.
export default function WorkSection() {
  const listRef = useRef(null);

  // --cover: how much of a card is hidden by the next one (drives the scale-back in CSS)
  useScrollTrack(listRef, (rect, vh, list) => {
    const items = list.children;
    const rects = Array.from(items, (item) => item.getBoundingClientRect());
    for (let i = 0; i < items.length; i++) {
      const next = rects[i + 1];
      const cover = next ? clamp01(1 - (next.top - rects[i].top) / rects[i].height) : 0;
      items[i].style.setProperty('--cover', cover.toFixed(3));
    }
  });

  return (
    <section className="py-24 md:py-36" aria-labelledby="work-title">
      <div className="wrap">
        <SectionHeading
          id="work-title"
          label="Selected work"
          title="Real businesses, *live today.*"
          action={
            <Link to="/work" className="link-arrow">
              See all work
              <ArrowRight size={18} />
            </Link>
          }
        />

        <ol ref={listRef} className="mt-14 space-y-6 md:mt-20 lg:space-y-10">
          {selectedWork.map((project, index) => (
            <li key={project.id} className="stack-item" style={{ '--i': index }}>
              <article className="stack-card grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
                <div className="lg:col-span-5">
                  <p className="flex items-center gap-4 text-sm text-faint">
                    <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                    <span className="label-caps text-brand-300">{project.type}</span>
                  </p>
                  <h3 className="mt-6 text-[clamp(2rem,3.8vw,3.5rem)] leading-none tracking-[-0.04em]">{project.name}</h3>
                  <p className="type-lead mt-5 max-w-md text-muted">{project.description}</p>
                  <ProjectLink project={project} className="mt-8" />
                </div>
                <ProjectVisual project={project} className="lg:col-span-7" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
