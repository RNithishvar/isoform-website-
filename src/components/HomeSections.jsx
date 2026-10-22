import { Link } from "react-router-dom";
import { ArrowUpRight, Bot, Clapperboard, LayoutTemplate, PenTool } from "lucide-react";
import { Container, Reveal, SectionHeading } from "./Section.jsx";
import ArrowButton from "./ArrowButton.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { FMark, InstagramIcon } from "./Logo.jsx";
import { projects, services, stats, steps } from "../data/site.js";

const serviceIcons = {
  websites: LayoutTemplate,
  "social-media": InstagramIcon,
  "video-editing": Clapperboard,
  automation: Bot,
  "graphic-design": PenTool,
};

// Big statement under the hero, VYRO-style: link left, statement centre, note right.
export function Statement() {
  return (
    <section data-nav="light" className="bg-snow py-24 md:py-36">
      <Container className="grid gap-8 lg:grid-cols-[180px_1fr_260px] lg:items-start">
        <Reveal className="order-3 lg:order-1 lg:pt-4">
          <Link to="/about" className="group inline-flex items-center gap-1.5 text-[14px] text-ash transition-colors hover:text-coal">
            About Isoform
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
        <Reveal delay={0.05} className="order-1 lg:order-2">
          <h2 className="text-[34px] leading-[1.06] font-medium tracking-[-0.035em] text-coal md:text-[52px] xl:text-[60px]">
            Made for real businesses.
            <br />
            <span className="text-ash">We build what your customers see online.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="order-2 lg:order-3 lg:pt-4">
          <p className="text-[15px] leading-[1.6] text-slate">
            Chocolate makers, travel companies, architects, boutiques and artists already trust us with their first impression.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

// Bento grid of the five services, linking to each service page.
export function ServicesGrid() {
  return (
    <section data-nav="light" className="bg-snow pb-24 md:pb-32">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.slug];
            const big = i === 0;
            return (
              <Reveal key={s.slug} delay={(i % 4) * 0.06} className={big ? "md:col-span-2 lg:row-span-2" : ""}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[26px] bg-cloud p-6 transition-colors hover:bg-[#ececf2] md:min-h-[250px] md:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-11 items-center justify-center rounded-[14px] bg-white text-brand shadow-[0_6px_20px_-10px_rgba(91,37,225,0.5)]">
                      <Icon size={20} className="size-5" />
                    </span>
                    <span className="flex size-9 items-center justify-center rounded-full bg-white text-coal transition-colors duration-300 group-hover:bg-coal group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  {big && (
                    <div className="relative mt-6 flex-1 overflow-hidden rounded-[18px] bg-white outline-1 -outline-offset-1 outline-fog max-md:aspect-[16/10]">
                      <img
                        src="/work/ssarch-desktop.png"
                        alt="SS Architects & Interiors website, built by Isoform"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className={`flex flex-col gap-2 ${big ? "mt-6" : "mt-auto pt-10"}`}>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-ash uppercase">{s.number}</span>
                    <h3 className={`${big ? "text-[28px] md:text-[34px]" : "text-[22px]"} leading-[1.1] font-medium tracking-[-0.025em] text-coal`}>
                      {s.name}
                    </h3>
                    <p className="text-[15px] leading-[1.55] text-slate">{s.headline}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          <Reveal delay={0.2} className="md:col-span-2 lg:col-span-4">
            <Link
              to="/services"
              className="group relative flex items-center justify-between gap-6 overflow-hidden rounded-[26px] bg-ink-950 p-6 text-white md:p-8"
            >
              <div aria-hidden className="absolute -top-24 right-[10%] size-72 rounded-full bg-[radial-gradient(closest-side,rgba(166,139,255,0.55),transparent)]" />
              <div aria-hidden className="absolute -bottom-32 left-[-5%] size-72 rounded-full bg-[radial-gradient(closest-side,rgba(246,199,107,0.3),transparent)]" />
              <span className="relative flex items-center gap-5">
                <FMark className="h-9 w-auto shrink-0 text-brand-soft max-sm:hidden" />
                <span className="text-[22px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[28px]">See every service in detail</span>
              </span>
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-coal transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function FeaturedWork() {
  const featured = [projects[0], projects[2], projects[4], projects[1]];
  return (
    <section data-nav="light" className="bg-snow py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our work"
            title={
              <>
                Real businesses. <span className="text-gradient-ink">Live today.</span>
              </>
            }
            body="Every project here is a real client you can visit right now."
          />
          <Reveal delay={0.1} className="shrink-0">
            <ArrowButton to="/work" variant="dark">
              See all work
            </ArrowButton>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Stats() {
  return (
    <section data-nav="light" className="border-y border-fog bg-snow py-14 md:py-16">
      <Container className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="flex flex-col gap-2 border-fog px-2 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
            <span className="text-[44px] leading-none font-medium tracking-[-0.04em] text-coal md:text-[56px]">{s.value}</span>
            <span className="text-[14px] text-slate">{s.label}</span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

export function ProcessPreview() {
  return (
    <section data-nav="light" className="bg-snow py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="How we work"
            title={
              <>
                Four steps. <span className="text-gradient-ink">No surprises.</span>
              </>
            }
            body="You always know what's happening, what it costs and when it's done."
          />
          <Reveal delay={0.1} className="shrink-0">
            <ArrowButton to="/process" variant="outline">
              Our process
            </ArrowButton>
          </Reveal>
        </div>
        <ol className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.number} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-4 rounded-[24px] bg-cloud p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-white font-mono text-[13px] text-brand shadow-[0_6px_20px_-10px_rgba(91,37,225,0.5)]">
                  {s.number}
                </span>
                <h3 className="mt-4 text-[22px] leading-[1.15] font-medium tracking-[-0.02em] text-coal">{s.title}</h3>
                <p className="text-[15px] leading-[1.6] text-slate">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// Dark violet call-to-action band, reused at the end of most pages.
export function CtaBand({ title, body, cta = "Start a project", to = "/contact" }) {
  return (
    <section data-nav="light" className="bg-snow px-3 pb-3 md:px-5 md:pb-5">
      <div data-nav="dark" className="noise relative isolate overflow-hidden rounded-[30px] bg-ink-950 px-6 py-20 text-center md:rounded-[36px] md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-60%] left-1/2 h-[140%] w-[110%] -translate-x-1/2 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(198,170,255,0.6),rgba(109,59,255,0.45)_40%,transparent_75%)] [animation:glow-drift_14s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-50%] left-[-10%] h-[90%] w-[45%] bg-[radial-gradient(closest-side,rgba(246,199,107,0.4),transparent)]" />
        </div>
        <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-6">
          <Reveal>
            <h2 className="text-[34px] leading-[1.04] font-medium tracking-[-0.035em] text-balance text-white md:text-[56px]">
              {title ?? (
                <>
                  Not sure what you need? <span className="text-gradient">Let's talk.</span>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[560px] text-[16px] leading-[1.6] text-white/75 md:text-[17px]">
              {body ?? "Tell us about your business and what isn't working. We'll suggest the smallest setup that actually helps, even if that's just one thing."}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ArrowButton to={to} variant="white">
              {cta}
            </ArrowButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
