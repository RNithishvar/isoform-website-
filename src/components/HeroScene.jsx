import { forwardRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Play } from "lucide-react";
import ArrowButton from "./ArrowButton.jsx";

const ease = [0.22, 1, 0.36, 1];

// Luminous ultraviolet backdrop: lavender bloom at the top, deep violet sides, a warm glow low-left.
export function HeroBackground() {
  return (
    <div aria-hidden className="noise pointer-events-none absolute inset-0 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 [animation:glow-drift_14s_ease-in-out_infinite]">
        <div className="absolute top-[-30%] left-1/2 h-[120%] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_45%_at_50%_46%,rgba(206,186,255,0.78)_0%,rgba(150,104,255,0.78)_26%,rgba(91,37,225,0.68)_52%,transparent_78%)]" />
        <div className="absolute top-[20%] left-[-10%] h-[90%] w-[60%] bg-[radial-gradient(closest-side,rgba(180,107,255,0.55),transparent)]" />
        <div className="absolute top-[30%] right-[-12%] h-[90%] w-[60%] bg-[radial-gradient(closest-side,rgba(74,31,255,0.65),transparent)]" />
        <div className="absolute bottom-[-25%] left-[-12%] h-[70%] w-[50%] bg-[radial-gradient(closest-side,rgba(246,199,107,0.75),rgba(246,199,107,0.2)_55%,transparent)]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgba(6,5,26,0.9),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-[22%] bg-[linear-gradient(to_bottom,rgba(6,5,26,0.55),transparent)]" />
    </div>
  );
}

export const HeroCopy = forwardRef(function HeroCopy({ style }, ref) {
  const reduce = useReducedMotion();
  const rise = (i) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: 0.15 + i * 0.12 } };

  return (
    <motion.div
      ref={ref}
      style={style}
      className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[980px] flex-col items-center px-5 pt-[clamp(92px,13vh,128px)] text-center"
    >
      <motion.h1
        {...rise(0)}
        className="text-[clamp(36px,min(6.4vw,7.4vh),70px)] leading-[1.02] font-medium tracking-[-0.035em] text-balance text-white [text-shadow:0_2px_30px_rgba(40,10,120,0.35)]"
      >
        We build the online side
        <br className="max-sm:hidden" /> of your business.
      </motion.h1>
      <motion.p
        {...rise(1)}
        className="mt-[clamp(10px,1.8vh,18px)] max-w-[520px] text-[clamp(15px,1.9vh,17px)] leading-[1.5] text-white/80"
      >
        Websites, social media, video, automation and branding. One small team, start to finish.
      </motion.p>
      <motion.div {...rise(2)} className="mt-[clamp(16px,2.8vh,28px)] flex flex-wrap items-center justify-center gap-3">
        <ArrowButton to="/contact" variant="white">
          Start a project
        </ArrowButton>
        <ArrowButton to="/work" variant="ghost" className="max-sm:hidden">
          See our work
        </ArrowButton>
      </motion.div>
    </motion.div>
  );
});

function Card({ className = "", style, delay = 0, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease, delay }}
      className={`absolute ${className}`}
      style={style}
    >
      <div className="glass rounded-[20px] p-3.5 text-white" style={{ animation: `float-y ${5 + delay * 2}s ease-in-out infinite` }}>
        {children}
      </div>
    </motion.div>
  );
}

/*
  Frosted cards floating around the phone. Positioned against the phone's box:
  `box` = { left, top, width, height } in px of the phone at rest in the hand.
*/
export function HeroCards({ box, style }) {
  if (!box) return null;
  const { left, top, width, height } = box;
  return (
    <motion.div style={style} className="pointer-events-none absolute inset-0 z-[15] max-lg:hidden" aria-hidden>
      <Card delay={0.7} style={{ left: left - 250, top: top + height * 0.12 }} className="w-[220px]">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6c76b,#b46bff)] text-[13px] font-bold">PR</span>
          <span>
            <span className="block text-[13px] font-semibold">New enquiry</span>
            <span className="block text-[11px] text-white/70">From your website · 2 min ago</span>
          </span>
        </div>
      </Card>

      <Card delay={0.85} style={{ left: left - 290, top: top + height * 0.42 }} className="w-[250px]">
        <span className="block text-[13px] font-semibold">Your reel is ready</span>
        <span className="mt-0.5 block text-[11px] text-white/70">Captions, music and cuts done</span>
        <span className="mt-3 flex items-center gap-2 rounded-full bg-white/15 p-1 pl-1">
          <span className="flex size-7 items-center justify-center rounded-full bg-white text-coal">
            <Play size={12} fill="currentColor" />
          </span>
          <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
            <span className="block h-full w-2/3 rounded-full bg-white" />
          </span>
          <span className="pr-2 font-mono text-[10px] text-white/80">0:28</span>
        </span>
      </Card>

      <Card delay={1} style={{ left: left + width + 40, top: top + height * 0.08 }} className="w-[220px]">
        <span className="block text-[13px] font-semibold">Build your setup</span>
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {[
            ["Website", true],
            ["Social media", true],
            ["Video edits", false],
            ["Automation", false],
          ].map(([label, on]) => (
            <li key={label} className="flex items-center gap-2 text-[12px]">
              <span
                className={`flex size-4 items-center justify-center rounded-full ${on ? "bg-white text-brand" : "border border-white/50"}`}
              >
                {on && <Check size={10} strokeWidth={3.5} />}
              </span>
              <span className={on ? "text-white" : "text-white/70"}>{label}</span>
            </li>
          ))}
        </ul>
        <span className="mt-3 flex w-fit items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-coal">Get a quote</span>
      </Card>

      <Card delay={1.15} style={{ left: left + width + 90, top: top + height * 0.08 + 196 }} className="w-[190px]">
        <span className="flex items-center justify-between text-[11px] text-white/70">
          This month <span className="rounded-full bg-emerald-400/20 px-1.5 py-0.5 text-[9px] text-emerald-200">Live</span>
        </span>
        <span className="mt-1 block text-[22px] leading-none font-semibold">
          18 <span className="text-[12px] font-normal text-white/70">posts scheduled</span>
        </span>
        <span className="mt-3 flex h-8 items-end gap-1">
          {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-white/70" style={{ height: `${h}%` }} />
          ))}
        </span>
      </Card>
    </motion.div>
  );
}
