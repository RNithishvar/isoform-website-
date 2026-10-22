import { ArrowUpRight, Mail } from "lucide-react";
import { Container, PageHero, Reveal } from "../components/Section.jsx";
import ContactForm from "../components/Contact.jsx";
import { contact } from "../data/site.js";

const next = [
  { n: "01", t: "We read it properly", d: "Someone from the team reads your message, not a bot." },
  { n: "02", t: "We reply with next steps", d: "Honest advice on what will help, and what won't." },
  { n: "03", t: "A short call, if it fits", d: "Then a written plan with a fixed price and a date." },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you need. <span className="text-gradient">We'll be honest.</span>
          </>
        }
        body="Share a little about your business. We'll reply with clear next steps, even if the answer is that you don't need us yet."
      />

      <section data-nav="light" className="bg-snow py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-8">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-4 rounded-[24px] bg-coal p-5 text-white transition-colors hover:bg-ink-800"
            >
              <span className="flex size-12 items-center justify-center rounded-[14px] bg-white/10">
                <Mail size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] text-white/60">Prefer email?</span>
                <span className="block truncate text-[17px] font-medium">{contact.email}</span>
              </span>
              <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="rounded-[24px] bg-cloud p-6 md:p-8">
              <h2 className="font-mono text-[12px] tracking-[0.16em] text-brand uppercase">What happens next</h2>
              <ol className="mt-6 flex flex-col gap-6">
                {next.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[12px] text-brand">{s.n}</span>
                    <span>
                      <span className="block text-[17px] font-medium text-coal">{s.t}</span>
                      <span className="mt-1 block text-[15px] leading-[1.55] text-slate">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
