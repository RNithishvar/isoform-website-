import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Logo } from "./Logo.jsx";
import ArrowButton from "./ArrowButton.jsx";
import { contact, navLinks, services } from "../data/site.js";
import { useLenis } from "../lib/scroll.jsx";
import { useNavVisibility } from "../lib/ui.jsx";

const ease = [0.22, 1, 0.36, 1];

function activeFromPath(pathname) {
  const hit = navLinks.find((l) => pathname === l.to || pathname.startsWith(`${l.to}/`));
  return hit ? hit.id : null;
}

// Sections mark themselves with data-nav="dark" | "light"; the bar restyles to suit what's behind it.
function useNavTone() {
  const { pathname } = useLocation();
  const [tone, setTone] = useState("dark");
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      let next = "dark";
      for (const el of document.querySelectorAll("[data-nav]")) {
        const r = el.getBoundingClientRect();
        if (r.top <= 36 && r.bottom > 36) next = el.dataset.nav;
      }
      setTone(next);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    const t = setTimeout(check, 80);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  return tone;
}

function ServicesDropdown({ tone, active, replica }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  return (
    <div
      className="relative"
      onMouseEnter={() => !replica && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => !replica && setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <NavItem to="/services" label="Services" tone={tone} active={active} replica={replica} expanded={open}>
        <ChevronDown size={14} strokeWidth={2.4} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </NavItem>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.22, ease }}
            className="absolute top-full left-1/2 w-[540px] -translate-x-1/2 pt-3"
          >
            <div
              className={`grid grid-cols-2 gap-1 rounded-[22px] p-2 ${
                dark
                  ? "bg-ink-900/95 outline-1 -outline-offset-1 outline-white/12 backdrop-blur-xl"
                  : "bg-white shadow-[0_24px_60px_-20px_rgba(11,11,20,0.3)] outline-1 -outline-offset-1 outline-fog"
              }`}
            >
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className={`group flex flex-col gap-1 rounded-[16px] p-3.5 transition-colors ${dark ? "hover:bg-white/[0.06]" : "hover:bg-cloud"}`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`font-mono text-[11px] ${dark ? "text-brand-soft" : "text-brand"}`}>{s.number}</span>
                    <span className={`text-[14px] font-semibold ${dark ? "text-white" : "text-coal"}`}>{s.name}</span>
                  </span>
                  <span className={`text-[13px] leading-[1.45] ${dark ? "text-mist" : "text-slate"}`}>{s.headline}</span>
                </Link>
              ))}
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-[16px] p-3.5 text-[14px] font-semibold ${
                  dark ? "bg-brand/25 text-white hover:bg-brand/35" : "bg-coal text-white hover:bg-ink-800"
                }`}
              >
                All services
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ to, label, tone, active, replica, expanded, children }) {
  const reduce = useReducedMotion();
  const dark = tone === "dark";
  const isActive = active;
  return (
    <Link
      to={to}
      tabIndex={replica ? -1 : undefined}
      aria-current={isActive ? "page" : undefined}
      aria-expanded={expanded}
      className={`relative flex items-center gap-1 rounded-full px-4 py-[7px] text-[14px] leading-[1.5] font-medium whitespace-nowrap transition-colors duration-200 xl:px-[18px] ${
        isActive ? (dark ? "text-coal" : "text-white") : dark ? "text-haze hover:text-white" : "text-slate hover:text-coal"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId={replica ? undefined : "nav-pill"}
          transition={{ duration: reduce ? 0 : 0.4, ease }}
          className={`absolute inset-0 rounded-full ${dark ? "bg-white" : "bg-coal"}`}
        />
      )}
      <span className="relative">{label}</span>
      {children && <span className="relative">{children}</span>}
    </Link>
  );
}

function MenuButton({ open, onClick, tone, replica }) {
  const reduce = useReducedMotion();
  const dark = tone === "dark" || open;
  const t = { duration: reduce ? 0 : 0.3, ease };
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={replica ? -1 : undefined}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`flex cursor-pointer items-center gap-2.5 rounded-full py-[5px] pr-[5px] pl-4 text-[14px] font-medium transition-colors duration-300 lg:hidden ${
        dark ? "bg-white/[0.08] text-white outline-1 -outline-offset-1 outline-white/20 backdrop-blur-md" : "bg-coal text-white"
      }`}
    >
      <span className="relative h-[21px] w-[46px] overflow-hidden text-left leading-[21px]">
        <motion.span animate={{ y: open ? "-100%" : "0%" }} transition={t} className="absolute inset-0">
          Menu
        </motion.span>
        <motion.span animate={{ y: open ? "0%" : "100%" }} transition={t} className="absolute inset-0">
          Close
        </motion.span>
      </span>
      <span className={`relative flex size-[30px] items-center justify-center rounded-full ${dark ? "bg-white text-coal" : "bg-white text-coal"}`}>
        <motion.span animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }} transition={t} className="absolute h-[1.6px] w-3.5 rounded bg-current" />
        <motion.span animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }} transition={t} className="absolute h-[1.6px] w-3.5 rounded bg-current" />
      </span>
    </button>
  );
}

/*
  The bar itself. `replica` renders a non-interactive copy inside the intro device screen,
  so the zoom lands exactly on the real fixed navbar.
*/
export function NavBar({ replica = false, tone = "dark", active = null, menuOpen = false, onToggleMenu }) {
  const dark = tone === "dark" || menuOpen;
  return (
    <div className="mx-auto flex w-full max-w-[1280px] items-center gap-x-4 px-5 py-4 md:px-8 xl:py-5">
      <div className="flex flex-1 items-center justify-start">
        <Link to="/" aria-label="Isoform home" tabIndex={replica ? -1 : undefined}>
          <Logo tone={dark ? "light" : "dark"} markClassName="h-7" />
        </Link>
      </div>

      <nav
        aria-label="Main"
        className={`hidden shrink-0 items-center gap-0.5 rounded-full p-1 transition-colors duration-300 lg:flex ${
          dark
            ? "bg-white/[0.07] outline-1 -outline-offset-1 outline-white/15 backdrop-blur-md"
            : "bg-white/85 shadow-[0_10px_30px_-18px_rgba(11,11,20,0.35)] outline-1 -outline-offset-1 outline-fog backdrop-blur-md"
        }`}
      >
        {navLinks.map((link) =>
          link.hasMenu ? (
            <ServicesDropdown key={link.id} tone={tone} active={active === link.id} replica={replica} />
          ) : (
            <NavItem key={link.id} to={link.to} label={link.label} tone={tone} active={active === link.id} replica={replica} />
          )
        )}
      </nav>

      <div className="flex flex-1 items-center justify-end">
        <div className="hidden shrink-0 lg:block">
          <ArrowButton to="/contact" size="sm" variant={dark ? "white" : "dark"} tabIndex={replica ? -1 : undefined}>
            Start a project
          </ArrowButton>
        </div>
        <MenuButton open={menuOpen} onClick={onToggleMenu} tone={tone} replica={replica} />
      </div>
    </div>
  );
}

function MobileMenu({ onClose, active }) {
  const reduce = useReducedMotion();
  const [servicesOpen, setServicesOpen] = useState(active === "services");
  const items = [{ label: "Home", to: "/", id: "home" }, ...navLinks];
  const origin = "calc(100% - 50px) 38px";

  return (
    <motion.div
      key="mobile-menu"
      initial={reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${origin})` }}
      animate={reduce ? { opacity: 1 } : { clipPath: `circle(150% at ${origin})` }}
      exit={reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${origin})` }}
      transition={{ duration: reduce ? 0 : 0.6, ease }}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-950 lg:hidden"
      data-lenis-prevent
    >
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(109,59,255,0.55),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-40 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(180,107,255,0.35),transparent)]" />

      <nav aria-label="Mobile" className="relative flex flex-1 flex-col px-6 pt-28 pb-10 md:px-10">
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.18 + i * 0.06 }}
              className="border-b border-white/10"
            >
              <div className="flex items-center">
                <Link
                  to={item.to}
                  onClick={onClose}
                  className={`group flex flex-1 items-baseline gap-4 py-4 ${active === item.id ? "text-white" : "text-haze"}`}
                >
                  <span className="w-6 font-mono text-[11px] text-brand-soft">0{i + 1}</span>
                  <span className="text-[34px] leading-none font-medium tracking-[-0.02em] transition-colors group-hover:text-white md:text-[44px]">
                    {item.label}
                  </span>
                  {active === item.id && <span className="size-2 self-center rounded-full bg-brand-soft" />}
                </Link>
                {item.hasMenu && (
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-label={servicesOpen ? "Hide services" : "Show services"}
                    aria-expanded={servicesOpen}
                    className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/[0.07] text-white"
                  >
                    <ChevronDown size={20} className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
              {item.hasMenu && (
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to={`/services/${s.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between py-2.5 pr-1 pl-10 text-[17px] text-mist transition-colors hover:text-white"
                          >
                            {s.name}
                            <ArrowUpRight size={16} />
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.6 }}
          className="mt-auto flex flex-col gap-5 pt-10"
        >
          <ArrowButton to="/contact" onClick={onClose} variant="white" full>
            Start a project
          </ArrowButton>
          <a href={`mailto:${contact.email}`} className="text-[15px] text-mist">
            {contact.email}
          </a>
        </motion.div>
      </nav>
    </motion.div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { hidden } = useNavVisibility();
  const { pathname } = useLocation();
  const lenis = useLenis();
  const tone = useNavTone();
  const active = activeFromPath(pathname);
  const reduce = useReducedMotion();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = tone === "dark" || menuOpen;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ opacity: hidden && !menuOpen ? 0 : 1, y: hidden && !menuOpen ? -12 : 0 }}
        transition={{ duration: reduce ? 0 : 0.3, ease }}
        className={`fixed inset-x-0 top-0 z-50 ${hidden && !menuOpen ? "pointer-events-none" : ""}`}
        aria-hidden={(hidden && !menuOpen) || undefined}
        inert={(hidden && !menuOpen) || undefined}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-[120%] transition-opacity duration-500 ${
            dark ? "bg-gradient-to-b from-ink-950/80 to-transparent" : "bg-gradient-to-b from-white/90 to-transparent"
          } ${scrolled && !menuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div className="relative">
          <NavBar tone={tone} active={active} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
        </div>
      </motion.header>
      <AnimatePresence>{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} active={active} />}</AnimatePresence>
    </>
  );
}
