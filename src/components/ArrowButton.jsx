import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Round icon with two arrows: on hover the first flies out to the top-right and the second slides in.
export function ArrowIcon({ size = 40, className = "bg-ink-950 text-white" }) {
  const icon = size <= 32 ? 14 : 17;
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      <ArrowUpRight
        size={icon}
        strokeWidth={2.25}
        className="absolute transition-all duration-300 ease-out-expo group-hover:translate-x-[15px] group-hover:-translate-y-[15px] group-hover:opacity-0"
      />
      <ArrowUpRight
        size={icon}
        strokeWidth={2.25}
        aria-hidden
        className="absolute -translate-x-[15px] translate-y-[15px] opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      />
    </span>
  );
}

// Button styles: label colours + the colours of the round arrow icon.
const variants = {
  primary: ["bg-brand text-white font-semibold hover:bg-brand-bright shadow-[0_10px_36px_-12px_rgba(91,37,225,0.9)]", "bg-white text-brand"],
  white: ["bg-white text-coal font-semibold hover:bg-lilac", "bg-coal text-white"],
  dark: ["bg-coal text-white font-semibold hover:bg-ink-800", "bg-white text-coal"],
  ghost: ["bg-white/[0.08] text-white font-medium outline-1 -outline-offset-1 outline-white/25 hover:bg-white/[0.14] backdrop-blur-md", "bg-white/15 text-white"],
  outline: ["bg-white text-coal font-medium outline-1 -outline-offset-1 outline-fog hover:outline-coal/30", "bg-cloud text-coal"],
};

const sizes = {
  sm: { cls: "text-[14px] py-[5px] pr-[5px] pl-4 gap-2.5", icon: 30 },
  md: { cls: "text-[15px] xl:text-[16px] py-1.5 pr-1.5 pl-6 gap-3", icon: 38 },
};

export default function ArrowButton({
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  full = false,
  className = "",
  children,
  ...rest
}) {
  const [label, icon] = variants[variant] ?? variants.primary;
  const s = sizes[size] ?? sizes.md;
  const classes = `group inline-flex cursor-pointer items-center rounded-full leading-[1.5] whitespace-nowrap transition-[transform,background-color,color,outline-color] duration-300 ease-out-expo hover:scale-[1.03] active:scale-[0.97] ${label} ${
    s.cls
  } ${full ? "w-full justify-between" : "justify-center"} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowIcon size={s.icon} className={icon} />
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
