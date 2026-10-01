import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AgeEngine from './components/AgeEngine';
import Tiers from './components/Tiers';
import BiomarkerPanel from './components/BiomarkerPanel';
import Locations from './components/Locations';
import Faculty from './components/Faculty';
import Footer from './components/Footer';
import AdmissionModal from './components/AdmissionModal';
import PortalDrawer from './components/PortalDrawer';
import { CurrencyProvider } from './lib/currency';
import type { TierId } from './data/tiers';

export default function App() {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [admissionTier, setAdmissionTier] = useState<TierId | undefined>(undefined);
  const [portalOpen, setPortalOpen] = useState(false);

  const openAdmission = (tier?: TierId) => {
    setAdmissionTier(tier);
    setAdmissionOpen(true);
  };

  return (
    <CurrencyProvider>
      <div id="top" className="min-h-screen bg-canvas text-pine">
        <Nav onAdmission={() => openAdmission()} onPortal={() => setPortalOpen(true)} />
        <main>
          <Hero onIntake={() => openAdmission()} />
          <AgeEngine />
          <Tiers onAllocate={(t) => openAdmission(t)} />
          <div className="bg-pine py-16">
            <p className="mx-auto max-w-3xl px-6 text-center font-serif text-2xl leading-relaxed text-bone/90 sm:text-3xl">
              &ldquo;Physiological age is not a fixed outcome. It is a managed variable — measured at the methylation
              site, and revised under supervision.&rdquo;
            </p>
            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.26em] text-bone/40">
              Dr. A. Vontobel — Chief Medical Officer
            </p>
          </div>
          <BiomarkerPanel />
          <Locations />
          <Faculty />
        </main>
        <Footer />
        <AdmissionModal open={admissionOpen} tierId={admissionTier} onClose={() => setAdmissionOpen(false)} />
        <PortalDrawer open={portalOpen} onClose={() => setPortalOpen(false)} />
      </div>
    </CurrencyProvider>
  );
}
