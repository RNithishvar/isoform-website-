import { useEffect, useState } from "react";
import { Bell, CheckCheck, Music2, Palette, Pause, Scissors, Send, Sparkles, Type, Wand2 } from "lucide-react";
import { FMark } from "./Logo.jsx";
import { services } from "../data/site.js";

const captionScript = [
  ["THIS IS", "THE HOOK"],
  ["STOP", "SCROLLING"],
  ["WATCH", "TILL THE END"],
  ["BOOK", "YOUR TABLE"],
];

/* Screens shown on the 3D phone, one per service. Sized for a 272 x 582 screen. */

function StatusBar({ dark = true }) {
  return (
    <div
      className={`absolute inset-x-0 top-0 z-20 flex h-[46px] items-center justify-between px-[26px] pt-1 text-[12px] font-semibold ${
        dark ? "text-white" : "text-ink-950"
      }`}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current/60 p-[1px]">
          <span className="block h-full w-[70%] rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

export function ScreenHome() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(180deg,#2a1470_0%,#120a3a_45%,#07051a_100%)] text-white">
      <StatusBar />
      <div className="absolute -top-16 left-1/2 h-[280px] w-[300px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(198,170,255,0.75),rgba(109,59,255,0.35)_55%,transparent)] blur-[6px]" />
      <div className="relative flex h-full flex-col px-4 pt-[56px] pb-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <FMark className="h-3 w-auto text-white" />
            </span>
            <span className="text-[11px] text-white/80">Hello, Priya</span>
          </span>
          <span className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-4 rounded bg-white/80" />
            <span className="h-[2px] w-4 rounded bg-white/80" />
          </span>
        </div>
        <p className="mt-5 text-[22px] leading-[1.08] font-semibold tracking-[-0.02em]">
          Your business, <br />
          online and <span className="text-gradient">growing.</span>
        </p>
        <div className="mt-4 flex gap-1.5 text-[9px]">
          {["All", "Website", "Social", "Video"].map((c, i) => (
            <span key={c} className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-white text-coal" : "bg-white/10 text-white/80"}`}>
              {c}
            </span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {services.slice(0, 4).map((s) => (
            <span key={s.slug} className="flex h-[78px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.08] p-2.5 backdrop-blur">
              <span className="font-mono text-[8px] text-lilac">{s.number}</span>
              <span className="text-[11px] leading-[1.2] font-medium">{s.short}</span>
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.08] p-2.5">
          <span className="text-[11px] font-medium">{services[4].short}</span>
          <span className="font-mono text-[8px] text-lilac">{services[4].number}</span>
        </div>
        <span className="mt-auto flex items-center gap-2 rounded-full bg-white/10 p-1 pl-3 text-[10px] text-white/70">
          How can we help?
          <span className="ml-auto flex size-6 items-center justify-center rounded-full bg-white text-coal">
            <Send size={11} />
          </span>
        </span>
      </div>
    </div>
  );
}

export function ScreenImage({ src, alt, caption, dark = true, position = "top" }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-900">
      <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position }} />
      {caption && (
        <div className="absolute inset-x-3 bottom-4 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-950/80 px-3 py-2.5 backdrop-blur-md">
          <span className="size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="truncate text-[11px] font-medium text-white">{caption}</span>
        </div>
      )}
      {!dark && <StatusBar dark={false} />}
    </div>
  );
}

export function ScreenSocial() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src="/work/ooty-trip-planner.jpg"
        alt="Instagram profile of Ooty Trip Planner, managed by Isoform"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-x-3 top-[52px] z-20 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-850/90 p-2.5 shadow-xl backdrop-blur-md">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand">
          <Bell size={15} className="text-white" />
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold text-white">Post scheduled</span>
          <span className="block truncate text-[10px] text-mist">“2N/3D Ooty package” · Tue, 6:30 PM</span>
        </span>
      </div>
    </div>
  );
}

// A live editing timeline: captions change word by word, clips drop onto the
// timeline, the playhead sweeps, the waveform pulses and the export bar fills.
export function ScreenVideo() {
  const [line, setLine] = useState(0);
  const [frame, setFrame] = useState(3);
  useEffect(() => {
    const words = setInterval(() => setLine((l) => (l + 1) % captionScript.length), 1100);
    const clock = setInterval(() => setFrame((f) => (f >= 28 ? 0 : f + 1)), 160);
    return () => {
      clearInterval(words);
      clearInterval(clock);
    };
  }, []);
  const [top, bottom] = captionScript[line];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0818] text-white">
      <StatusBar />
      <div className="mt-[48px] flex items-center justify-between px-4">
        <span className="text-[13px] font-semibold">Reel · Cafe launch</span>
        <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[8px] text-lilac">9:16 · 1080p</span>
      </div>

      {/* preview */}
      <div className="relative mx-3 mt-2.5 h-[248px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_25%,#6d3bff_0%,#2a1470_45%,#0c0820_80%)]">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(6,5,26,0.85),transparent)]" />
        <div className="absolute bottom-0 left-1/2 h-[150px] w-[130px] -translate-x-1/2 rounded-t-[70px] bg-[linear-gradient(to_bottom,#3b2a7a,#140e2c)]" />
        <div className="absolute top-[42px] left-1/2 size-[58px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom,#4b3a8f,#22184a)]" />
        <div className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-1">
          <span key={`a${line}`} className="rounded-md bg-white px-2 py-0.5 text-[16px] leading-none font-bold text-coal [animation:pop_0.35s_cubic-bezier(0.22,1,0.36,1)]">
            {top}
          </span>
          <span key={`b${line}`} className="rounded-md bg-brand px-2 py-0.5 text-[16px] leading-none font-bold [animation:pop_0.35s_0.12s_cubic-bezier(0.22,1,0.36,1)_both]">
            {bottom}
          </span>
        </div>
        <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 font-mono text-[8px]">
          <span className="size-1.5 rounded-full bg-red-500" style={{ animation: "blink 1.1s steps(1) infinite" }} />
          00:{String(frame).padStart(2, "0")} / 00:28
        </span>
        <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[8px] text-lilac">
          <Wand2 size={9} /> Auto captions
        </span>
      </div>

      {/* controls */}
      <div className="mt-2.5 flex items-center justify-center gap-6 text-mist">
        <Scissors size={14} className="text-lilac" style={{ animation: "float-y 1.6s ease-in-out infinite" }} />
        <span className="flex size-8 items-center justify-center rounded-full bg-white text-coal">
          <Pause size={13} fill="currentColor" />
        </span>
        <Type size={14} />
      </div>

      {/* timeline */}
      <div className="relative mx-3 mt-2.5 flex flex-col gap-1.5 overflow-hidden rounded-xl border border-white/8 bg-white/[0.04] p-2">
        <div className="flex justify-between font-mono text-[7px] text-dim">
          {["0s", "7s", "14s", "21s", "28s"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="flex gap-1">
          {[26, 20, 32, 22].map((w, i) => (
            <span
              key={i}
              className="relative h-8 overflow-hidden rounded-md"
              style={{
                width: `${w}%`,
                background: ["#5b25e1", "#4a1fff", "#6d3bff", "#b46bff"][i],
                animation: `clip-in 4.4s ${i * 0.18}s cubic-bezier(0.22,1,0.36,1) infinite`,
              }}
            >
              <span className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.14)_0_10px,transparent_10px_20px)]" />
            </span>
          ))}
        </div>
        <div className="flex gap-1">
          {[10, 16, 12, 14, 18, 11].map((w, i) => (
            <span
              key={i}
              className="h-2.5 rounded-sm bg-lilac/80"
              style={{ width: `${w}%`, animation: `clip-in 4.4s ${0.5 + i * 0.1}s cubic-bezier(0.22,1,0.36,1) infinite` }}
            />
          ))}
        </div>
        <div className="flex h-5 items-center gap-[2px]">
          {Array.from({ length: 40 }, (_, i) => (
            <span
              key={i}
              className="h-full w-full origin-center rounded-full bg-brand-soft/70"
              style={{ animation: `wave ${0.7 + (i % 5) * 0.12}s ${(i % 7) * 0.09}s ease-in-out infinite` }}
            />
          ))}
        </div>
        <span className="absolute top-4 bottom-1 w-[2px] rounded bg-white shadow-[0_0_8px_white]" style={{ animation: "playhead 4.4s linear infinite" }} />
      </div>

      {/* export */}
      <div className="mx-3 mt-auto mb-5 rounded-xl border border-white/8 bg-white/[0.05] p-2.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles size={11} className="text-brand-soft" /> Exporting for Reels
          </span>
          <Music2 size={11} className="text-mist" />
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-gradient-to-r from-brand to-orchid" style={{ animation: "render-bar 4.4s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

function Bubble({ from = "them", children, time }) {
  const mine = from === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3 py-2 text-[11px] leading-[1.4] ${
          mine ? "rounded-br-md bg-[#2b1d63] text-white" : "rounded-bl-md bg-ink-800 text-haze"
        }`}
      >
        {children}
        {time && (
          <span className="mt-0.5 flex items-center justify-end gap-1 text-[8px] text-mist">
            {time}
            {mine && <CheckCheck size={10} className="text-brand-soft" />}
          </span>
        )}
      </div>
    </div>
  );
}

export function ScreenAutomation() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0b0a12] text-white">
      <StatusBar />
      <div className="mt-[46px] flex items-center gap-2.5 border-b border-white/8 px-4 pb-3">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand text-[11px] font-bold">YB</span>
        <span>
          <span className="block text-[12px] font-semibold">Your Business</span>
          <span className="flex items-center gap-1 text-[9px] text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Auto-reply on
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 pt-3">
        <Bubble time="10:02">Hi! Is the 2 night Ooty package free on the 14th?</Bubble>
        <Bubble from="me" time="10:02">
          Hi Priya! Yes, the 14th is open. Reply with a number:
          <span className="mt-1.5 flex flex-col gap-1">
            {["1  Book it", "2  See price", "3  Talk to us"].map((o) => (
              <span key={o} className="rounded-lg bg-white/10 px-2 py-1 text-[10px]">
                {o}
              </span>
            ))}
          </span>
        </Bubble>
        <Bubble time="10:03">1</Bubble>
        <Bubble from="me" time="10:03">
          Done ✅ Booking confirmed. Details are on their way to your email.
        </Bubble>
      </div>
      <div className="mx-3 mb-5 rounded-2xl border border-white/10 bg-ink-850 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold">Today's bookings</span>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] text-emerald-300">Synced to Sheets</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            ["6", "Booked"],
            ["14", "New leads"],
            ["0", "Missed"],
          ].map(([n, l]) => (
            <span key={l} className="rounded-lg bg-white/[0.05] px-2 py-1.5">
              <span className="block text-[15px] font-bold">{n}</span>
              <span className="block text-[8px] text-mist">{l}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScreenDesign() {
  const swatches = ["#5b25e1", "#a487ff", "#07060c", "#f4f2fb", "#ffc46b"];
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0b0a12] px-4 text-white">
      <StatusBar />
      <div className="mt-[52px] flex items-center justify-between">
        <span className="text-[14px] font-bold">Brand kit</span>
        <Palette size={15} className="text-brand-soft" />
      </div>
      <div className="mt-3 flex h-[120px] items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#7445ff,#5b25e1_55%,#3d14b0)]">
        <span className="flex flex-col items-center gap-2">
          <FMark className="h-[44px] w-auto text-white" />
          <span className="font-brand text-[8px] tracking-[0.35em]">ISOFORM</span>
        </span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {swatches.map((c) => (
          <span key={c} className="flex-1">
            <span className="block h-9 rounded-lg border border-white/10" style={{ background: c }} />
            <span className="mt-1 block text-center font-mono text-[7px] text-mist">{c.slice(1).toUpperCase()}</span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3">
        <span className="text-[34px] leading-none font-bold">Aa</span>
        <span>
          <span className="block text-[12px] font-semibold">Space Grotesk</span>
          <span className="block text-[9px] text-mist">Headlines · Bold 700</span>
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <span className="flex aspect-square flex-col justify-end rounded-xl bg-paper p-2 text-ink-950">
          <span className="text-[13px] leading-none font-bold">NEW MENU</span>
          <span className="mt-1 text-[8px] text-ink-600">From Monday</span>
        </span>
        <span className="flex aspect-square flex-col justify-end rounded-xl bg-brand p-2">
          <span className="text-[13px] leading-none font-bold">OPEN 9–6</span>
          <span className="mt-1 text-[8px] text-lilac">Every day</span>
        </span>
        <span className="flex aspect-[2/1] items-center justify-center rounded-xl bg-ink-800 text-[10px] font-semibold text-lilac">
          Story template
        </span>
        <span className="flex aspect-[2/1] items-center justify-center rounded-xl border border-dashed border-brand-soft/40 text-[10px] text-mist">
          + Business card
        </span>
      </div>
    </div>
  );
}

export function ScreenFor({ screen }) {
  switch (screen) {
    case "website":
      return (
        <ScreenImage
          src="/work/ssarch-mobile.png"
          alt="Mobile view of the SS Architects & Interiors website built by Isoform"
          caption="ssachitectandinterior.com · Live"
        />
      );
    case "social":
      return <ScreenSocial />;
    case "video":
      return <ScreenVideo />;
    case "automation":
      return <ScreenAutomation />;
    case "design":
      return <ScreenDesign />;
    default:
      return <ScreenHome />;
  }
}
