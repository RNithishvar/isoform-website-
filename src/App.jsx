import { useMemo, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import RouteEffects from './components/RouteEffects.jsx';
import { IntroContext, markNavigated, shouldShowIntro } from './lib/intro.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Privacy from './pages/Privacy.jsx';
import Process from './pages/Process.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Services from './pages/Services.jsx';
import Work from './pages/Work.jsx';

export default function App() {
  const location = useLocation();

  // Note the first in-app navigation, so the home intro only plays on arrival.
  const lastKey = useRef(location.key);
  if (lastKey.current !== location.key) {
    lastKey.current = location.key;
    markNavigated();
  }

  const [introActive, setIntroActive] = useState(() => location.pathname === '/' && shouldShowIntro());
  const intro = useMemo(() => ({ introActive, setIntroActive }), [introActive]);

  return (
    <IntroContext.Provider value={intro}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </IntroContext.Provider>
  );
}
