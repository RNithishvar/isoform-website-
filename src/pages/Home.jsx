import Experience from "../components/Experience.jsx";
import { CtaBand, FeaturedWork, ProcessPreview, ServicesGrid, Statement, Stats } from "../components/HomeSections.jsx";

// Dev only: /?sections skips the scroll scene so the sections below can be screenshotted.
const skipScene = import.meta.env.DEV && new URLSearchParams(window.location.search).has("sections");

export default function Home() {
  return (
    <main>
      {!skipScene && <Experience />}
      <Statement />
      <ServicesGrid />
      <Stats />
      <FeaturedWork />
      <ProcessPreview />
      <CtaBand />
    </main>
  );
}
