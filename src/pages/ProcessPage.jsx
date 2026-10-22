import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Container, PageHero, Reveal, SectionHeading } from "../components/Section.jsx";
import { CtaBand } from "../components/HomeSections.jsx";
import { faqs, steps } from "../data/site.js";

const stepDetail = [
  { youGet: "A clear picture of what will actually help", youDo: "Tell us about your business, customers and goals" },
  { youGet: "A written scope, fixed price and delivery date", youDo: "Read it, ask questions, approve it" },
  { youGet: "Designs and builds to review at each stage", youDo: "Give feedback and approve before we move on" },
  { youGet: "A launch, a walkthrough and ongoing support", youDo: "Start using it. We stay around for updates" },
];

function Faq({ item, open, onToggle }) {
  return (
    <div className="border-b border-fog">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left">
        <span className="text-[18px] font-medium tracking-[-0.01em] text-coal md:text-[22px]">{item.q}</span>
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-300 ${
            open ? "rotate-45 bg-coal text-white" : "bg-cloud text-coal"
          }`}
        >
          <Plus size={18} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[680px] pb-6 text-[16px] leading-[1.65] text-slate">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProcessPage() {
  const [open, setOpen] = useState(0);
  return (
    <main>
      <PageHero
        eyebrow="How we work"
        title={
          <>
            Four steps. <span className="text-gradient">No surprises.</span>
          </>
        }
        body="You always know what's happening, what it costs and when it's done. Here's exactly how a project runs."
      />

      <section data-nav="light" className="bg-snow py-20 md:py-28">
        <Container>
          <ol className="relative flex flex-col gap-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.number}>
                <div className="grid gap-6 rounded-[28px] bg-cloud p-6 md:grid-cols-[120px_1fr_1fr_1fr] md:items-start md:p-10">
                  <span className="text-[56px] leading-none font-medium tracking-[-0.04em] text-brand md:text-[72px]">{s.number}</span>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[26px] leading-[1.1] font-medium tracking-[-0.02em] text-coal md:text-[32px]">{s.title}</h2>
                    <p className="text-[15px] leading-[1.6] text-slate">{s.text}</p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-[18px] bg-white p-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-brand uppercase">You get</span>
                    <span className="text-[15px] leading-[1.5] text-coal">{stepDetail[i].youGet}</span>
                  </div>
                  <div className="flex flex-col gap-2 rounded-[18px] bg-white p-5">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-ash uppercase">You do</span>
                    <span className="text-[15px] leading-[1.5] text-coal">{stepDetail[i].youDo}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section data-nav="light" className="bg-snow pb-20 md:pb-32">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading eyebrow="Questions" title="Things people usually ask" />
          <Reveal delay={0.1} className="border-t border-fog">
            {faqs.map((f, i) => (
              <Faq key={f.q} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaBand title={<>Ready for <span className="text-gradient">step one?</span></>} cta="Book the first call" />
    </main>
  );
}
