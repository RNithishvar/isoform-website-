import { Link } from "react-router-dom";
import { Compass, Layers, ShieldCheck, Target } from "lucide-react";
import { Container, PageHero, Reveal, SectionHeading } from "../components/Section.jsx";
import { CtaBand, Stats } from "../components/HomeSections.jsx";
import { projects, reasons, services } from "../data/site.js";

const reasonIcons = [Layers, Target, ShieldCheck, Compass];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Isoform"
        title={
          <>
            A small studio for the <span className="text-gradient">online side</span> of your business.
          </>
        }
        body="Digital, design, experience. We make businesses look as good online as they are in person."
      />

      <section data-nav="light" className="bg-snow py-20 md:py-32">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading eyebrow="Who we are" title="One team, five crafts." />
          <Reveal delay={0.1} className="flex flex-col gap-6 text-[18px] leading-[1.65] text-slate md:text-[20px]">
            <p>
              Isoform is a small digital studio. We design and build websites, run social media, edit video, automate repetitive
              work and create brand identities, all under one roof.
            </p>
            <p>
              Many of our clients are in and around Ooty and the Nilgiris: chocolate makers, travel companies, architects,
              boutiques and artists. They came to us for one thing and usually stayed for the rest, because it's easier when
              the people who build your website also make your posts and edit your reels.
            </p>
          </Reveal>
        </Container>
      </section>

      <Stats />

      <section data-nav="light" className="bg-snow py-20 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title={
              <>
                How we work with <span className="text-gradient-ink">every client.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {reasons.map((r, i) => {
              const Icon = reasonIcons[i];
              return (
                <Reveal key={r.title} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-[24px] bg-cloud p-6">
                    <span className="flex size-11 items-center justify-center rounded-[14px] bg-white text-brand shadow-[0_6px_20px_-10px_rgba(91,37,225,0.5)]">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-[20px] leading-[1.2] font-medium tracking-[-0.01em] text-coal">{r.title}</h3>
                    <p className="text-[15px] leading-[1.6] text-slate">{r.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section data-nav="light" className="bg-snow pb-20 md:pb-32">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we've worked with" title="Clients" />
            <ul className="mt-10 divide-y divide-fog border-y border-fog">
              {projects.map((p) => (
                <li key={p.slug}>
                  <a href={p.url} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 py-4">
                    <span className="text-[18px] font-medium text-coal transition-colors group-hover:text-brand md:text-[20px]">{p.name}</span>
                    <span className="text-[13px] text-ash">{p.category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="What we do" title="Services" />
            <ul className="mt-10 divide-y divide-fog border-y border-fog">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="group flex items-center justify-between gap-4 py-4">
                    <span className="text-[18px] font-medium text-coal transition-colors group-hover:text-brand md:text-[20px]">{s.name}</span>
                    <span className="font-mono text-[12px] text-ash">{s.number}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand title={<>Let's build something <span className="text-gradient">together.</span></>} />
    </main>
  );
}
