import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Container, PageHero, Reveal } from "../components/Section.jsx";
import Phone3D from "../components/Phone3D.jsx";
import { ScreenFor } from "../components/PhoneScreens.jsx";
import { CtaBand } from "../components/HomeSections.jsx";
import { services } from "../data/site.js";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Five services. <span className="text-gradient">One team.</span>
          </>
        }
        body="Pick one, or let us run the whole online side of your business. Every service is done in-house, by the same people."
      />

      <section data-nav="light" className="bg-snow py-20 md:py-28">
        <Container className="flex flex-col gap-4">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <Link
                to={`/services/${s.slug}`}
                className="group grid items-center gap-8 overflow-hidden rounded-[30px] bg-cloud p-6 transition-colors hover:bg-[#ececf2] md:grid-cols-[1fr_auto] md:p-10 lg:grid-cols-[1.3fr_1fr_auto]"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[12px] tracking-[0.14em] text-brand uppercase">
                    {s.number} / 05
                  </span>
                  <h2 className="text-[30px] leading-[1.05] font-medium tracking-[-0.03em] text-coal md:text-[42px]">{s.name}</h2>
                  <p className="max-w-[460px] text-[16px] leading-[1.6] text-slate">{s.body}</p>
                  <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-coal py-1.5 pr-1.5 pl-5 text-[14px] font-semibold text-white">
                    Learn more
                    <span className="flex size-8 items-center justify-center rounded-full bg-white text-coal transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={15} />
                    </span>
                  </span>
                </div>
                <ul className="hidden flex-col gap-3 lg:flex">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[15px] text-coal">
                      <span className="mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand text-white">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="relative hidden h-[300px] w-[200px] [perspective:1400px] md:block">
                  <div className="absolute top-0 left-0 transition-transform duration-700 ease-out-expo [transform-style:preserve-3d] [transform:rotateY(-18deg)_rotateZ(3deg)] group-hover:[transform:rotateY(-4deg)_rotateZ(0deg)]">
                    <Phone3D scale={0.5} className={i % 2 ? "" : ""}>
                      <ScreenFor screen={s.screen} />
                    </Phone3D>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
