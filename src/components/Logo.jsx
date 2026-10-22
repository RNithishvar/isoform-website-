// The Isoform "F" mark, traced from the logo: a full-height bar plus three slanted strokes.
export function FMark({ className = "", title }) {
  return (
    <svg
      viewBox="0 0 539 684"
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="0" y="0" width="126" height="684" />
      <polygon points="166,0 539,0 466,134 166,134" />
      <polygon points="166,216 421,216 348,350 166,350" />
      <polygon points="166,431 302,431 166,684" />
    </svg>
  );
}

export function Logo({ tone = "light", className = "", markClassName = "h-8 md:h-9" }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <FMark className={`w-auto shrink-0 text-brand ${markClassName}`} />
      <span
        className={`font-brand text-[14px] leading-none tracking-[0.3em] md:text-[16px] ${
          tone === "light" ? "text-white" : "text-ink-950"
        }`}
      >
        ISOFORM
      </span>
    </span>
  );
}

export function InstagramIcon({ className = "size-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
