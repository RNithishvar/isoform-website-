import { FMark } from "./Logo.jsx";

/*
  A phone built from CSS 3D layers: a front screen, a back with the camera,
  and a stack of thin slices in between that read as the rounded metal edge.
  Rotate the parent (or pass `style`) to turn it.
*/

export const PHONE = { width: 290, height: 600, radius: 50, depth: 16, layers: 8 };

export function PhoneBack() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[linear-gradient(150deg,#2f2748_0%,#18131f_48%,#271f3d_100%)] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(164,135,255,0.25),transparent_45%)]" />
      {/* camera module */}
      <div className="absolute top-[18px] left-[18px] size-[132px] rounded-[38px] bg-[linear-gradient(145deg,#2a2340,#141019)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.45)]">
        {[
          { top: 12, left: 12 },
          { top: 70, left: 12 },
          { top: 41, left: 70 },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute size-[50px] rounded-full bg-[#07060b] shadow-[0_0_0_3px_#3a3350,0_0_0_5px_#0e0b14,0_6px_12px_rgba(0,0,0,0.6)]"
            style={pos}
          >
            <span className="absolute inset-[9px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#4d6bff_0%,#1c1550_35%,#05040a_70%)]" />
            <span className="absolute top-[14px] left-[15px] size-[7px] rounded-full bg-white/70 blur-[0.5px]" />
            <span className="absolute right-[13px] bottom-[13px] size-[4px] rounded-full bg-brand-soft/80" />
          </span>
        ))}
        <span className="absolute top-[18px] right-[20px] size-[16px] rounded-full bg-[radial-gradient(circle,#fff7e0,#d8c9a0)] shadow-[0_0_8px_rgba(255,240,200,0.5)]" />
        <span className="absolute right-[24px] bottom-[22px] size-[7px] rounded-full bg-[#07060b]" />
      </div>
      <div className="absolute bottom-[64px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-80">
        <FMark className="h-[46px] w-auto text-brand-soft/70" />
        <span className="font-brand text-[9px] tracking-[0.4em] text-white/40">ISOFORM</span>
      </div>
    </div>
  );
}

export default function Phone3D({ children, back = <PhoneBack />, scale = 1, className = "" }) {
  const { width, height, radius, depth, layers } = PHONE;
  return (
    <div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ width: width * scale, height: height * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left [transform-style:preserve-3d]"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {/* edge slices */}
        {Array.from({ length: layers }, (_, i) => {
          const z = -depth / 2 + ((i + 1) * depth) / (layers + 1);
          return (
            <div
              key={i}
              className="absolute inset-0 bg-[linear-gradient(90deg,#4a4366,#231d33_30%,#2c2540_70%,#514a70)]"
              style={{ borderRadius: radius, transform: `translateZ(${z}px)` }}
            />
          );
        })}
        {/* side buttons */}
        <span className="absolute top-[120px] left-[-3px] h-[34px] w-[4px] rounded-l bg-[#4a4366]" />
        <span className="absolute top-[170px] left-[-3px] h-[58px] w-[4px] rounded-l bg-[#4a4366]" />
        <span className="absolute top-[150px] right-[-3px] h-[80px] w-[4px] rounded-r bg-[#4a4366]" />

        {/* back */}
        <div
          className="absolute inset-0 [backface-visibility:hidden]"
          style={{ borderRadius: radius, transform: `rotateY(180deg) translateZ(${depth / 2}px)` }}
        >
          {back}
        </div>

        {/* front */}
        <div
          className="absolute inset-0 bg-[#050409] p-[9px] shadow-[inset_0_0_0_1.5px_#3a3350] [backface-visibility:hidden]"
          style={{ borderRadius: radius, transform: `translateZ(${depth / 2}px)` }}
        >
          <div className="relative h-full w-full overflow-hidden bg-ink-950" style={{ borderRadius: radius - 9 }}>
            {children}
            <span className="absolute top-[11px] left-1/2 z-30 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
            <span className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(115deg,rgba(255,255,255,0.10)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.04)_100%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
