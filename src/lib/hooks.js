import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// Which device frame the intro uses: laptop on desktop, tablet on tablets, phone on phones.
function getDeviceKind() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w >= 1024 && w / h >= 1.15) return "laptop";
  if (w >= 640) return "tablet";
  return "phone";
}

export function useDeviceKind() {
  const [kind, setKind] = useState(getDeviceKind);
  useEffect(() => {
    const onResize = () => setKind(getDeviceKind());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return kind;
}

export function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}
