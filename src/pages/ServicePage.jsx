import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Container, Reveal, SectionHeading } from "../components/Section.jsx";
import ArrowButton from "../components/ArrowButton.jsx";
import Phone3D from "../components/Phone3D.jsx";
import { ScreenFor } from "../components/PhoneScreens.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { CtaBand } from "../components/HomeSections.jsx";
import { projects, services, steps } from "../data/site.js";

export default function ServicePage() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  const related = projects.filter((p) => p.services.includes(service.slug)).slice(0, 2);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main>
      <section data-nav="dark" className="noise relative isolate overflow-hidden bg-ink-950 pt-32 pb-16 text-white md:pt-40 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-40%] right-[-20%] h-[130%] w-[90%] bg-[radial-gradient(ellipse_45%_45%_at_50%_50%,rgba(198,170,255,0.6)_0%,rgba(109,59,255,0.45)_40%,transparent_75%)] [animation:glow-drift_16s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-40%] left-[-15%] h-[80%] w-[45%] bg-[radial-gradient(closest-side,rgba(246,199,107,0.35),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(6,5,26,0.85),transparent)]" />
        </div>
        <Container className="relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Link to="/services" className="eyebrow text-brand-soft hover:text-lilac">
                {service.number} — {service.name}
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-[40px] leading-[1.02] font-medium tracking-[-0.04em] text-balance md:text-[60px] xl:text-[72px]">
                {service.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[540px] text-[16px] leading-[1.6] text-white/75 xl:text-[18px]">{service.body}</p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-wrap gap-3">
              <ArrowButton to="/contact" variant="white">
                Start a project
              </ArrowButton>
              <ArrowButton to="/work" variant="ghost">
                See our work
              </ArrowButton>
            </Reveal>
          </div>
          <div className="relative flex justify-center [perspective:1600px] max-lg:hidden">
            <motion.div
              initial={reduce ? false : { rotateY: -70, rotateX: 10, opacity: 0 }}
              animate={{ rotateY: -14, rotateX: 6, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="[transform-style:preserve-3d]"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="[transform-style:preserve-3d]"
              >
                <Phone3D scale={0.86}>
                  <ScreenFor screen={service.screen} />
                </Phone3D>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section data-nav="light" className="bg-snow py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="The problem" title="Why this matters" />
          <Reveal delay={0.1} className="flex flex-col gap-6">
            <p className="text-[22px] leading-[1.45] font-medium tracking-[-0.01em] text-coal md:text-[28px]">{service.detail.problem}</p>
            <div className="flex flex-wrap gap-2">
              <span className="py-2 pr-1 text-[14px] text-ash">Good fit for:</span>
              {service.detail.forWho.map((w) => (
                <span key={w} className="rounded-full bg-cloud px-4 py-2 text-[14px] text-coal">
                  {w}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section data-nav="light" className="bg-snow pb-20 md:pb-28">
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title={
              <>
                Everything included, <span className="text-gradient-ink">nothing vague.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {service.detail.includes.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08} className="h-full">
                <div className="flex h-full gap-5 rounded-[24px] bg-cloud p-6 md:p-8">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <Check size={17} strokeWidth={2.5} />
                  </span>
                  <span className="flex flex-col gap-2">
                    <h3 className="text-[20px] font-medium tracking-[-0.01em] text-coal">{item.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-slate">{item.text}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section data-nav="light" className="bg-snow pb-20 md:pb-28">
          <Container>
            <SectionHeading eyebrow="Proof" title="Done for real clients" />
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {related.map((p) => (
                <Reveal key={p.slug} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section data-nav="light" className="bg-snow pb-20 md:pb-28">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="How it works" title="Four steps, start to finish" />
            <ArrowButton to="/process" variant="outline">
              Full process
            </ArrowButton>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.number} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-[24px] bg-cloud p-6">
                  <span className="font-mono text-[13px] text-brand">{s.number}</span>
                  <h3 className="text-[20px] font-medium text-coal">{s.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-slate">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section data-nav="light" className="bg-snow pb-20 md:pb-24">
        <Container>
          <h2 className="mb-5 font-mono text-[12px] tracking-[0.18em] text-ash uppercase">Other services</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-[20px] bg-cloud px-5 py-4 transition-colors hover:bg-coal"
              >
                <span>
                  <span className="block font-mono text-[11px] text-brand group-hover:text-brand-soft">{s.number}</span>
                  <span className="block text-[16px] font-medium text-coal group-hover:text-white">{s.name}</span>
                </span>
                <ArrowRight size={18} className="text-ash transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
