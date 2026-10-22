import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo.jsx";
import { Container } from "./Section.jsx";
import { contact, navLinks, services } from "../data/site.js";

export default function Footer() {
  return (
    <footer data-nav="dark" className="relative overflow-hidden bg-ink-950 pt-20 pb-10 text-white">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,59,255,0.35),transparent)]" />
      <Container className="relative">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="max-w-[340px] text-[15px] leading-[1.6] text-mist">
              Websites, social media, video, automation and branding for businesses that want to look as good online as they are in person.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex w-fit items-center gap-1.5 text-[16px] font-medium text-white transition-colors hover:text-lilac"
            >
              {contact.email}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div>
            <h2 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-brand-soft uppercase">Services</h2>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-[15px] text-mist transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-mono text-[11px] tracking-[0.18em] text-brand-soft uppercase">Studio</h2>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link to="/" className="text-[15px] text-mist transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <Link to={l.to} className="text-[15px] text-mist transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="mt-16 overflow-hidden">
          <p className="bg-gradient-to-b from-white/[0.12] to-transparent bg-clip-text text-center font-brand text-[12.5vw] leading-[0.9] tracking-[0.04em] sm:tracking-[0.08em] text-transparent select-none lg:text-[180px]">
            ISOFORM
          </p>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-dim sm:flex-row">
          <span>© {new Date().getFullYear()} Isoform. All rights reserved.</span>
          <span className="font-mono tracking-[0.18em] uppercase">Digital · Design · Experience</span>
        </div>
      </Container>
    </footer>
  );
}
