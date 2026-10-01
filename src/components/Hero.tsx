import { useState } from 'react';

const HOTSPOTS = [
  {
    x: 22,
    y: 44,
    title: 'Circadian Recovery Suite',
    detail: 'Hydrotherapy, infrared sauna and polysomnography-linked sleep architecture monitoring.',
    alignRight: false,
  },
  {
    x: 52,
    y: 30,
    title: 'Sequencing Cleanroom Corridor',
    detail: 'Grade A/B epigenetic sequencing environment — Enge wing, Zürich.',
    alignRight: false,
  },
  {
    x: 80,
    y: 60,
    title: 'Private Consultation Salon',
    detail: 'CMO review rooms with direct dossier access. By appointment only.',
    alignRight: true,
  },
];

const STATS = [
  { value: '3.4', unit: 'yrs', label: 'Average Epigenetic Age Reduction at Month 12' },
  { value: '140+', unit: '', label: 'Active Serum & Cellular Biomarkers Tracked' },
  { value: '100', unit: '', label: 'Patient Cohort Cap per Physician Annually' },
];

export default function Hero({ onIntake }: { onIntake: () => void }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-14 lg:grid-cols-[11fr_13fr] lg:gap-16 lg:pt-20">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald2">
            Clinical Longevity Medicine &middot; Cohort 2026/2027
          </p>
          <h1 className="mt-6 font-serif text-[42px] leading-[1.05] text-pine sm:text-6xl lg:text-[62px]">
            Systemic cellular restoration through <span className="italic">deep epigenetic sequencing.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-slate2">
            AETHEL combines whole-genome sequencing, real-time metabolomic profiling, and personalized peptide
            interventions for patients requiring verifiable physiological age reversal.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#engine"
              className="bg-pine px-7 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-emerald2"
            >
              Calculate Biological Age
            </a>
            <button
              type="button"
              onClick={onIntake}
              className="border border-pine px-7 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-pine transition-colors hover:bg-pine hover:text-bone"
            >
              Request Confidential Intake
            </button>
          </div>
          <div className="mt-14 grid grid-cols-3 divide-x divide-hairline border-t border-hairline">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 pt-5 first:pl-0">
                <p className="font-serif text-3xl text-pine lg:text-4xl">
                  {s.value}
                  {s.unit && <span className="ml-1 text-xl text-slate2">{s.unit}</span>}
                </p>
                <p className="mt-2 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-slate2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden">
            <img
              src="/assets/images/clinic-interior-zurich.jpg"
              alt="Aethel private clinic interior, Enge wing, Zürich"
              className="h-[440px] w-full object-cover sm:h-[520px] lg:h-[560px]"
            />
            {HOTSPOTS.map((h, i) => (
              <button
                key={h.title}
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={h.title}
              >
                <span className="relative flex h-3.5 w-3.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald2/60"
                    style={{ animationDuration: '2.8s' }}
                  />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-canvas bg-emerald2 transition-transform group-hover:scale-125" />
                </span>
                {active === i && (
                  <span
                    className={`absolute bottom-5 z-10 w-60 border border-bone/25 bg-pine/95 p-3.5 ${
                      h.alignRight ? 'right-[-8px]' : 'left-1/2 -translate-x-1/2'
                    }`}
                  >
                    <span className="block font-mono text-[9px] uppercase tracking-[0.24em] text-bone/50">
                      Diagnostic Zone 0{i + 1}
                    </span>
                    <span className="mt-1.5 block font-serif text-[15px] text-canvas">{h.title}</span>
                    <span className="mt-1.5 block text-[11.5px] leading-relaxed text-bone/75">{h.detail}</span>
                  </span>
                )}
              </button>
            ))}
            <p className="absolute bottom-4 left-4 bg-pine/80 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/80">
              Enge Wing — Gotthardstrasse 26, Zürich
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
