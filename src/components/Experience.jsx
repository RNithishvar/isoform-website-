import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Check } from "lucide-react";
import { NavBar } from "./Navbar.jsx";
import { Logo } from "./Logo.jsx";
import Phone3D from "./Phone3D.jsx";
import { ScreenFor } from "./PhoneScreens.jsx";
import { HandBack, HandFront } from "./Hand.jsx";
import { HeroBackground, HeroCards, HeroCopy } from "./HeroScene.jsx";
import ArrowButton from "./ArrowButton.jsx";
import { services } from "../data/site.js";
import { scrollToY, useLenis } from "../lib/scroll.jsx";
import { useDeviceKind, useMediaQuery } from "../lib/hooks.js";
import { useNavVisibility } from "../lib/ui.jsx";

/*
  The whole opening of the home page is one pinned scene, driven by scroll:
  1. A device (laptop / tablet / phone, matching the visitor's screen) zooms in until
     its screen becomes the page.
  2. The hero: a phone held in a hand, with floating cards.
  3. The phone leaves the hand and spins from side to side through the five services.
  Everything below is measured in "u": viewport-heights of scrolling.
*/

const ZOOM = 1.4;
const LIFT_START = 1.85;
const P0_START = 2.7;
const MOVE = 0.6;
const REST = 0.35;
const STEP = MOVE + REST;
const RESTS = [[0, LIFT_START], ...Array.from({ length: 6 }, (_, k) => [P0_START + k * STEP, P0_START + k * STEP + REST])];
const TOTAL = RESTS[RESTS.length - 1][1] + 0.3;

const frames = {
  laptop: { start: 0.56, radius: 14, bezel: 14, y: -0.045 },
  tablet: { start: 0.62, radius: 26, bezel: 18, y: -0.01 },
  phone: { start: 0.6, radius: 40, bezel: 10, y: 0 },
};

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// Desktop resting poses for the services part (x as a share of viewport width).
const desktopPoses = [
  { x: 0.2, rx: 8, ry: 338, rz: 4, s: 0.95 },
  { x: -0.21, rx: 6, ry: 742, rz: -3, s: 1 },
  { x: 0.21, rx: 6, ry: 1058, rz: 3, s: 1 },
  { x: 0.2, rx: 8, ry: 1422, rz: -4, s: 1.04 },
  { x: -0.21, rx: 6, ry: 1822, rz: -3, s: 1 },
  { x: 0.21, rx: 6, ry: 2138, rz: 3, s: 1 },
];

function computeLayout(vw, vh, copyBottom) {
  const mobile = vw < 768;
  // phone resting in the hand, just under the hero copy
  const top = copyBottom + (mobile ? 22 : 28);
  // whole phone visible, the hand runs off the bottom of the screen
  const s = Math.min(mobile ? 0.68 : 0.88, Math.max(mobile ? 0.46 : 0.46, (vh - top - 14) / 600));
  const hx = (mobile ? 0.03 : 0.025) * vw;
  const hand = { x: hx, y: top - vh / 2 + 300 * s, rx: 4, ry: 6, rz: -9, s };

  const fit = mobile ? Math.min(0.56, Math.max(0.38, (vh * 0.42) / 600)) : Math.min(1, (vh - 190) / 600);
  const rest = desktopPoses.map((p, k) => {
    if (!mobile) return { x: p.x * vw, y: 0, rx: p.rx, ry: p.ry, rz: p.rz, s: p.s * fit };
    const sm = fit * (k === 3 ? 1.05 : 1);
    return { x: 0, y: 88 - vh / 2 + 300 * sm, rx: p.rx, ry: p.ry, rz: p.rz / 2, s: sm };
  });

  return {
    mobile,
    vw,
    vh,
    poses: [hand, ...rest],
    handBox: { left: vw / 2 + hx - 145 * s, top, width: 290 * s, height: 600 * s },
  };
}

function mix(a, b, t, lift) {
  const e = smooth(t);
  const bump = Math.sin(e * Math.PI);
  return {
    x: lerp(a.x, b.x, e),
    y: lerp(a.y, b.y, lift ? easeOut(t) : e) - (lift ? bump * 30 : 0),
    rx: lerp(a.rx, b.rx, e) - bump * 6,
    ry: lerp(a.ry, b.ry, e),
    rz: lerp(a.rz, b.rz, e),
    s: lerp(a.s, b.s, e) - bump * 0.05,
  };
}

function poseAt(u, poses) {
  for (let k = 0; k < RESTS.length; k++) {
    const [a, b] = RESTS[k];
    if (u <= b) {
      if (u >= a || k === 0) return poses[k];
      const prevEnd = RESTS[k - 1][1];
      return mix(poses[k - 1], poses[k], (u - prevEnd) / (a - prevEnd), k === 1);
    }
  }
  return poses[poses.length - 1];
}

function stateAt(u) {
  for (let k = 0; k < RESTS.length - 1; k++) {
    if (u < (RESTS[k][1] + RESTS[k + 1][0]) / 2) return k;
  }
  return RESTS.length - 1;
}

function restDistance(u, k) {
  const [a, b] = RESTS[k];
  return u < a ? a - u : u > b ? u - b : 0;
}

const toTransform = (p, extraY = 0) =>
  `translate3d(${p.x}px, ${p.y + extraY}px, 0) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) scale(${p.s})`;

function DeviceFrame({ kind, bezel, radius }) {
  const outer = radius + bezel;
  if (kind === "laptop") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute bg-[#0c0b11] shadow-[0_0_0_2px_#2c2938,0_60px_140px_-30px_rgba(40,20,90,0.55)]"
          style={{ inset: -bezel, bottom: -bezel * 1.35, borderRadius: `${outer}px ${outer}px ${bezel * 0.6}px ${bezel * 0.6}px` }}
        >
          <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#1f1d29]" style={{ top: bezel * 0.36, width: bezel * 0.32, height: bezel * 0.32 }} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: `calc(100% + ${bezel * 1.35}px)`, width: "118%" }}>
          <div
            className="relative w-full bg-[linear-gradient(to_bottom,#ecebf3,#d2d0dc_45%,#a6a3b4)] shadow-[0_1px_0_#fff_inset,0_30px_60px_-20px_rgba(20,10,60,0.45)]"
            style={{ height: bezel * 1.7, borderRadius: `0 0 ${bezel * 3}px ${bezel * 3}px` }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#bdbac9]" style={{ width: "14%", height: bezel * 0.55, borderRadius: `0 0 ${bezel}px ${bezel}px` }} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute bg-[#0c0b11] shadow-[0_0_0_2px_#34304a,0_0_0_4px_#18151f,0_70px_140px_-30px_rgba(40,20,90,0.55)]"
        style={{ inset: -bezel, borderRadius: outer }}
      >
        {kind === "tablet" && (
          <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#1f1d29]" style={{ top: bezel * 0.36, width: bezel * 0.3, height: bezel * 0.3 }} />
        )}
      </div>
      {kind === "phone" && (
        <>
          <span className="absolute rounded-l-sm bg-[#2c2838]" style={{ left: -bezel - 6, top: "18%", width: 6, height: "7%" }} />
          <span className="absolute rounded-l-sm bg-[#2c2838]" style={{ left: -bezel - 6, top: "28%", width: 6, height: "11%" }} />
          <span className="absolute rounded-r-sm bg-[#2c2838]" style={{ right: -bezel - 6, top: "24%", width: 6, height: "15%" }} />
        </>
      )}
    </div>
  );
}

function IntroCopy() {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <span className="eyebrow text-brand-soft">What we do</span>
      <h2 className="text-[30px] leading-[1.04] font-medium tracking-[-0.03em] text-balance text-white md:text-[44px] xl:text-[56px]">
        Five services. <span className="text-gradient">One team</span> doing all of them.
      </h2>
      <p className="max-w-[440px] text-[15px] leading-[1.6] text-mist md:text-[16px] xl:text-[17px]">
        Keep scrolling and the phone turns. Each side is something we do every week for real businesses.
      </p>
    </div>
  );
}

function ServiceCopy({ service }) {
  return (
    <div className="flex flex-col gap-3.5 md:gap-5">
      <span className="eyebrow text-brand-soft">
        {service.number} / 05 — {service.name}
      </span>
      <h3 className="text-[26px] leading-[1.06] font-medium tracking-[-0.03em] text-balance text-white md:text-[38px] xl:text-[46px]">
        {service.headline}
      </h3>
      <p className="max-w-[470px] text-[15px] leading-[1.6] text-mist max-md:[@media(max-height:720px)]:hidden md:text-[16px] xl:text-[17px]">
        {service.body}
      </p>
      <ul className="hidden flex-col gap-2.5 md:flex">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[15px] text-haze">
            <span className="mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-white/10 text-lilac">
              <Check size={11} strokeWidth={3} />
            </span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-1">
        <ArrowButton to={`/services/${service.slug}`} variant="ghost" size="sm">
          More on {service.short.toLowerCase()}
        </ArrowButton>
      </div>
    </div>
  );
}

function ScrollCue() {
  const touch = useMediaQuery("(pointer: coarse)");
  return (
    <span className="flex items-center gap-3 rounded-full border border-coal/10 bg-white/70 py-2 pr-4 pl-2 shadow-[0_10px_30px_-18px_rgba(40,20,90,0.5)] backdrop-blur">
      <span className="flex size-8 items-center justify-center rounded-full bg-coal text-white">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 5v14" />
          <path d="m6 13 6 6 6-6" style={{ animation: "nudge-down 1.4s ease-in-out infinite" }} />
        </svg>
      </span>
      <span className="text-[14px] font-medium text-coal">{touch ? "Swipe up to come in" : "Scroll to come in"}</span>
    </span>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const copyRef = useRef(null);
  const lenis = useLenis();
  const kind = useDeviceKind();
  const frame = frames[kind];
  const { setHidden } = useNavVisibility();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [layout, setLayout] = useState(() => computeLayout(window.innerWidth, window.innerHeight, window.innerHeight * 0.42));
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const copy = copyRef.current;
      if (!stage || !copy) return;
      setLayout(computeLayout(stage.offsetWidth, stage.offsetHeight, copy.offsetTop + copy.offsetHeight));
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Dev only: ?u=2.3 pins the scene at that point of the timeline, for layout screenshots.
  const pinned = import.meta.env.DEV ? parseFloat(new URLSearchParams(window.location.search).get("u")) : NaN;
  const pinnedU = useMotionValue(pinned);
  const scrolledU = useTransform(scrollYProgress, (p) => p * TOTAL);
  const u = Number.isFinite(pinned) ? pinnedU : scrolledU;

  // 1. device zoom
  const eased = useTransform(u, (v) => easeInOut(clamp01(v / ZOOM)));
  const scale = useTransform(eased, (e) => frame.start + (1 - frame.start) * e);
  const stageY = useTransform(eased, (e) => `${frame.y * (1 - e) * 100}vh`);
  const radius = useTransform(eased, (e) => (frame.radius / frame.start) * (1 - e));
  const introFade = useTransform(u, (v) => 1 - clamp01(v / 0.3));
  const islandOpacity = useTransform(eased, [0, 0.55], [1, 0]);
  const replicaOpacity = useTransform(u, (v) => (v >= ZOOM ? 0 : 1));

  // 2. hero leaving
  const heroOut = useTransform(u, (v) => clamp01((v - LIFT_START) / 0.4));
  const heroCopyOpacity = useTransform(heroOut, (t) => 1 - t);
  const heroCopyY = useTransform(heroOut, (t) => -t * 80);
  const cardsOpacity = useTransform(u, (v) => 1 - clamp01((v - LIFT_START + 0.05) / 0.3));
  const cardsScale = useTransform(u, (v) => 1 + clamp01((v - LIFT_START + 0.05) / 0.4) * 0.08);
  const handDrop = (v) => clamp01((v - LIFT_START - 0.05) / 0.55);
  const handTransform = useTransform(u, (v) => {
    const h = layoutRef.current.poses[0];
    const drop = easeInOut(handDrop(v)) * layoutRef.current.vh * 0.8;
    return `translate(${h.x}px, ${h.y + drop}px) rotate(${h.rz}deg) scale(${h.s})`;
  });
  const handOpacity = useTransform(u, (v) => 1 - clamp01((v - LIFT_START - 0.3) / 0.3));
  const dim = useTransform(u, (v) => clamp01((v - LIFT_START) / 0.8) * 0.78);

  // 3. phone + services
  const phoneTransform = useTransform(u, (v) => toTransform(poseAt(v, layoutRef.current.poses)));
  const glowX = useTransform(u, (v) => `${50 + (poseAt(v, layoutRef.current.poses).x / layoutRef.current.vw) * 100}%`);
  const servicesIn = useTransform(u, (v) => clamp01((v - (P0_START - 0.35)) / 0.3));
  const [state, setState] = useState(0);
  const copyOpacity = useTransform(u, (v) => {
    const k = stateAt(v);
    if (k === 0) return 0;
    return 1 - clamp01(restDistance(v, k) / (MOVE * 0.42));
  });

  const sync = (v) => {
    setHidden(v < ZOOM);
    setState(stateAt(v));
  };
  useMotionValueEvent(u, "change", sync);
  useEffect(() => {
    sync(u.get());
    return () => setHidden(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bezel = frame.bezel / frame.start;
  const stageRadius = frame.radius / frame.start;
  const serviceIndex = state - 2;
  const service = serviceIndex >= 0 ? services[serviceIndex] : null;
  const screen = service ? service.screen : "home";
  const phoneOnRight = layout.poses[Math.max(1, state)].x > 0;

  const goTo = (k) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    scrollToY(lenis, top + (RESTS[k][0] + REST / 2) * window.innerHeight);
  };

  return (
    <section ref={ref} data-nav="dark" className="relative bg-paper" style={{ height: `${(TOTAL + 1) * 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* light scene around the device */}
        <motion.div style={{ opacity: introFade }} className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,37,225,0.14)_1px,transparent_1.4px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="absolute top-1/2 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,59,255,0.24),transparent)]" />
        </motion.div>

        <motion.div
          style={{ opacity: introFade }}
          className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 md:px-8 md:py-6"
        >
          <Logo tone="dark" markClassName="h-7" />
          <span className="hidden font-mono text-[11px] tracking-[0.22em] text-ink-600 uppercase sm:block">
            Digital <span className="text-brand">•</span> Design <span className="text-brand">•</span> Experience
          </span>
        </motion.div>

        {/* the device and everything on its screen */}
        <motion.div style={{ scale, y: stageY }} className="absolute inset-0 z-10 origin-center">
          <DeviceFrame kind={kind} bezel={bezel} radius={stageRadius} />
          <motion.div ref={stageRef} style={{ borderRadius: radius }} className="absolute inset-0 overflow-hidden bg-ink-950 [transform:translateZ(0)]">
            <HeroBackground />
            <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink-950" aria-hidden />
            <motion.div
              aria-hidden
              style={{ left: glowX, opacity: servicesIn }}
              className="pointer-events-none absolute top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,59,255,0.45),rgba(74,31,255,0.12)_60%,transparent)] max-md:top-[30%]"
            />

            <HeroCopy ref={copyRef} style={{ opacity: heroCopyOpacity, y: heroCopyY }} />
            <HeroCards box={layout.handBox} style={{ opacity: cardsOpacity, scale: cardsScale }} />

            {/* hand behind the phone */}
            <motion.div style={{ opacity: handOpacity }} className="pointer-events-none absolute inset-0 z-[11] flex items-center justify-center">
              <motion.div style={{ transform: handTransform }} className="relative h-[600px] w-[290px] shrink-0">
                <HandBack />
              </motion.div>
            </motion.div>

            {/* the phone */}
            <div className="pointer-events-none absolute inset-0 z-[12] flex items-center justify-center [perspective:1600px]">
              <motion.div style={{ transform: phoneTransform }} className="shrink-0 [transform-style:preserve-3d]">
                <Phone3D>
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={screen}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0"
                    >
                      <ScreenFor screen={screen} />
                    </motion.div>
                  </AnimatePresence>
                </Phone3D>
              </motion.div>
            </div>

            {/* thumb + fingertips in front of the phone */}
            <motion.div style={{ opacity: handOpacity }} className="pointer-events-none absolute inset-0 z-[13] flex items-center justify-center">
              <motion.div style={{ transform: handTransform }} className="relative h-[600px] w-[290px] shrink-0">
                <HandFront />
              </motion.div>
            </motion.div>

            {/* services copy */}
            <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex w-full max-w-[1280px] px-5 md:px-8">
              <AnimatePresence mode="wait" initial={false}>
                {state >= 1 && (
                  <motion.div
                    key={state}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`self-end pb-[64px] max-md:w-full md:w-[44%] md:self-center md:pb-0 ${phoneOnRight ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <motion.div style={{ opacity: copyOpacity }} className="pointer-events-auto">
                      {service ? <ServiceCopy service={service} /> : <IntroCopy />}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* services progress */}
            <motion.nav
              aria-label="Services"
              style={{ opacity: servicesIn }}
              className={`absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[1280px] items-end gap-2 px-5 pb-5 md:gap-4 md:px-8 md:pb-7 ${
                state >= 1 ? "" : "pointer-events-none"
              }`}
            >
              {services.map((s, i) => {
                const k = i + 2;
                const active = state === k;
                return (
                  <button key={s.slug} type="button" onClick={() => goTo(k)} aria-current={active ? "step" : undefined} className="group flex flex-1 cursor-pointer flex-col gap-2 text-left">
                    <span className={`hidden text-[12px] font-medium transition-colors md:block ${active ? "text-white" : "text-dim group-hover:text-haze"}`}>
                      {s.short}
                    </span>
                    <span className="relative h-[3px] overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`absolute inset-y-0 left-0 rounded-full bg-lilac transition-[width,opacity] duration-500 ${
                          state > k ? "w-full opacity-40" : active ? "w-full" : "w-0"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </motion.nav>

            <motion.div style={{ opacity: replicaOpacity }} className="absolute inset-x-0 top-0 z-30" aria-hidden inert>
              <NavBar replica tone="dark" />
            </motion.div>
            {kind === "phone" && (
              <motion.span
                aria-hidden
                style={{ opacity: islandOpacity }}
                className="absolute top-[1.6%] left-1/2 z-40 h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black"
              />
            )}
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: introFade }} className="absolute inset-x-0 bottom-0 z-20 flex justify-center pb-6 md:pb-8" aria-hidden>
          <ScrollCue />
        </motion.div>
      </div>
    </section>
  );
}
