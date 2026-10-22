import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

// tone="light" for white sections, tone="dark" for night sections.
export function SectionHeading({ eyebrow, title, body, align = "left", tone = "light", as: Heading = "h2", size = "md", className = "" }) {
  const centered = align === "center";
  const dark = tone === "dark";
  const sizes = {
    md: "text-[32px] md:text-[44px] xl:text-[52px]",
    lg: "text-[40px] md:text-[60px] xl:text-[72px]",
  };
  return (
    <div className={`flex flex-col gap-5 ${centered ? "items-center text-center" : ""} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${dark ? "text-brand-soft" : "text-brand"}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Heading
          className={`${sizes[size]} leading-[1.03] font-medium tracking-[-0.035em] text-balance ${dark ? "text-white" : "text-coal"} ${
            centered ? "mx-auto max-w-[900px]" : "max-w-[860px]"
          }`}
        >
          {title}
        </Heading>
      </Reveal>
      {body && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-[600px] text-[16px] leading-[1.6] text-pretty xl:text-[17px] ${dark ? "text-mist" : "text-slate"} ${
              centered ? "mx-auto" : ""
            }`}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Container({ children, className = "" }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 ${className}`}>{children}</div>;
}

// Dark violet header used at the top of every inner page.
export function PageHero({ eyebrow, title, body, children }) {
  return (
    <section data-nav="dark" className="noise relative isolate overflow-hidden bg-ink-950 pt-36 pb-20 text-white md:pt-44 md:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-55%] left-1/2 h-[120%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_45%_50%_at_50%_50%,rgba(198,170,255,0.55)_0%,rgba(109,59,255,0.45)_35%,transparent_75%)] [animation:glow-drift_16s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-40%] left-[-15%] h-[80%] w-[45%] bg-[radial-gradient(closest-side,rgba(246,199,107,0.35),transparent)]" />
        <div className="absolute right-[-15%] bottom-[-30%] h-[90%] w-[55%] bg-[radial-gradient(closest-side,rgba(74,31,255,0.55),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(6,5,26,0.85),transparent)]" />
      </div>
      <Container className="relative">
        <SectionHeading as="h1" tone="dark" size="lg" eyebrow={eyebrow} title={title} body={body} />
        {children}
      </Container>
    </section>
  );
}
