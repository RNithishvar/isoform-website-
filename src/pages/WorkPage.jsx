import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, PageHero } from "../components/Section.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { CtaBand } from "../components/HomeSections.jsx";
import { projects, workFilters } from "../data/site.js";

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Websites, stores and feeds we've <span className="text-gradient">built and run.</span>
          </>
        }
        body="Every project below is live. Visit the sites, scroll the feeds, and judge for yourself."
      />

      <section data-nav="light" className="bg-snow py-16 md:py-24">
        <Container>
          <div role="tablist" aria-label="Filter projects" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {workFilters.map((f) => {
              const on = f === filter;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                    on ? "text-white" : "bg-cloud text-slate hover:text-coal"
                  }`}
                >
                  {on && <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-coal" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="mt-10 grid gap-4 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {shown.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      <CtaBand title={<>Want your business <span className="text-gradient">on this page?</span></>} />
    </main>
  );
}
