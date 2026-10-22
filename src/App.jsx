import { useEffect, useLayoutEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import WorkPage from "./pages/WorkPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProcessPage from "./pages/ProcessPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import { SmoothScroll, useLenis } from "./lib/scroll.jsx";
import { NavVisibilityProvider } from "./lib/ui.jsx";
import { Container } from "./components/Section.jsx";

const titles = {
  "/": "Isoform — Websites, social media, video & automation",
  "/services": "Services — Isoform",
  "/work": "Our work — Isoform",
  "/about": "About — Isoform",
  "/process": "How we work — Isoform",
  "/contact": "Contact — Isoform",
};

// Top of page and a fresh title on every route change.
function RouteEffects() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    document.title = titles[pathname] ?? "Isoform — Digital · Design · Experience";
  }, [pathname, lenis]);

  return null;
}

function NotFound() {
  return (
    <main data-nav="light" className="flex min-h-svh items-center bg-snow pt-24">
      <Container className="flex flex-col items-start gap-5">
        <span className="eyebrow text-brand">404</span>
        <h1 className="text-[44px] leading-[1.05] font-medium tracking-[-0.03em] text-coal md:text-[64px]">This page doesn't exist.</h1>
        <Link to="/" className="text-[16px] font-medium text-brand hover:text-brand-deep">
          Back to the homepage →
        </Link>
      </Container>
    </main>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <NavVisibilityProvider>
        <RouteEffects />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </NavVisibilityProvider>
    </SmoothScroll>
  );
}
