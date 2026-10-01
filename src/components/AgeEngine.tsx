import { useMemo, useState } from 'react';
import {
  computeEngine,
  generateAccession,
  type EngineInputs,
  type EngineResult,
  type GlucoseTier,
  type RhrTier,
  type SleepTier,
  type Vo2Tier,
} from '../lib/age';
import SummaryModal, { type SummaryData } from './SummaryModal';
import SectionHeader from './SectionHeader';

interface Option {
  id: string;
  label: string;
  sub: string;
}

const SLEEP: Option[] = [
  { id: 'lt1', label: '< 1.0 hr', sub: 'Insufficient' },
  { id: 'h15', label: '1.5 hrs', sub: 'Moderate' },
  { id: 'h2p', label: '2.0+ hrs', sub: 'Protected' },
];

const RHR: Option[] = [
  { id: 'r45', label: '45 – 55 bpm', sub: 'Athlete' },
  { id: 'r56', label: '56 – 65 bpm', sub: 'Balanced' },
  { id: 'r66', label: '66+ bpm', sub: 'Elevated' },
];

const VO2: Option[] = [
  { id: 'fair', label: 'Fair', sub: '< 35 ml/kg/min' },
  { id: 'excellent', label: 'Excellent', sub: '35 – 50' },
  { id: 'elite', label: 'Elite', sub: '> 50 ml/kg/min' },
];

const GLUCOSE: Option[] = [
  { id: 'optimized', label: 'Optimized', sub: '< 85 mg/dL' },
  { id: 'borderline', label: 'Borderline', sub: '85 – 100' },
  { id: 'elevated', label: 'Elevated', sub: '> 100 mg/dL' },
];

function OptionGroup({
  title,
  unit,
  options,
  value,
  onChange,
}: {
  title: string;
  unit: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">{title}</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate2/70">{unit}</p>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1 border border-hairline bg-canvas p-1">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={`px-2 py-2 text-left transition-colors ${
              value === o.id ? 'bg-pine' : 'hover:bg-mist'
            }`}
          >
            <span className={`block font-mono text-[11px] tracking-wide ${value === o.id ? 'text-bone' : 'text-pine'}`}>
              {o.label}
            </span>
            <span
              className={`mt-0.5 block text-[9px] uppercase tracking-[0.12em] ${
                value === o.id ? 'text-bone/55' : 'text-slate2/60'
              }`}
            >
              {o.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AgeEngine() {
  const [age, setAge] = useState(45);
  const [sleep, setSleep] = useState<SleepTier>('h15');
  const [rhr, setRhr] = useState<RhrTier>('r56');
  const [vo2, setVo2] = useState<Vo2Tier>('excellent');
  const [glucose, setGlucose] = useState<GlucoseTier>('optimized');
  const [summary, setSummary] = useState<SummaryData | null>(null);

  const inputs: EngineInputs = { age, sleep, rhr, vo2, glucose };
  const result: EngineResult = useMemo(
    () => computeEngine(inputs),
    [age, sleep, rhr, vo2, glucose], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const deltaLabel = `${result.delta >= 0 ? '+' : '−'}${Math.abs(result.delta).toFixed(1)} YRS`;
  const barWidth = Math.min(100, Math.max(6, ((result.factor - 0.8) / 0.5) * 100));
  const status =
    result.factor <= 0.98
      ? { label: 'Within Optimized Band', cls: 'text-emerald2' }
      : result.factor <= 1.08
        ? { label: 'Moderate Elevation', cls: 'text-bone/60' }
        : { label: 'Clinical Elevation', cls: 'text-suede' };

  const exportSummary = () => {
    setSummary({
      age,
      labels: {
        sleep: SLEEP.find((o) => o.id === sleep)!.label,
        rhr: RHR.find((o) => o.id === rhr)!.label,
        vo2: VO2.find((o) => o.id === vo2)!.label,
        glucose: GLUCOSE.find((o) => o.id === glucose)!.label,
      },
      result,
      accession: generateAccession('SEQ'),
    });
  };

  return (
    <section id="engine" className="border-y border-hairline bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              overline="Epigenetic Engine · Interactive"
              title="Your biological age, measured — not estimated."
              blurb="The Aethel Diagnostic Engine calibrates four physiological axes against our 4,180-cohort reference population and projects your DNAm phenoage in real time."
            />
            <div className="mt-10 space-y-8">
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">Chronological Age</p>
                  <p className="font-mono text-sm tabular-nums text-pine">
                    {age} <span className="text-slate2">yrs</span>
                  </p>
                </div>
                <input
                  type="range"
                  min={25}
                  max={75}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="aethel-range mt-5"
                  aria-label="Chronological age"
                />
                <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.14em] text-slate2/70">
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                </div>
              </div>
              <OptionGroup title="Average Nightly Deep Sleep" unit="hrs / night" options={SLEEP} value={sleep} onChange={(id) => setSleep(id as SleepTier)} />
              <OptionGroup title="Resting Heart Rate" unit="bpm · fasting" options={RHR} value={rhr} onChange={(id) => setRhr(id as RhrTier)} />
              <OptionGroup title="VO2 Max Tier" unit="ml/kg/min" options={VO2} value={vo2} onChange={(id) => setVo2(id as Vo2Tier)} />
              <OptionGroup
                title="Fasting Glucose / Metabolic Status"
                unit="mg/dL · 12h fast"
                options={GLUCOSE}
                value={glucose}
                onChange={(id) => setGlucose(id as GlucoseTier)}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-pine bg-pine p-8 text-bone sm:p-10">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/50">Live Diagnostic Output</p>
                <p className="font-mono text-[9px] tracking-[0.14em] text-bone/40">ENGINE v4.2 · DNAm-CALIBRATED</p>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
                  Projected Biological / DNAm PhenoAge
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <p className="font-serif text-6xl tabular-nums">{result.phenoAge.toFixed(1)}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone/60">yrs</p>
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-[0.08em] text-bone/60">
                  CHRONOLOGICAL {age} YRS &middot; DELTA {deltaLabel}
                </p>
              </div>

              <div className="my-8 h-px bg-bone/15" />

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">Rate of Aging Factor</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <p className="font-serif text-4xl tabular-nums">{result.factor.toFixed(2)}x</p>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.16em] ${status.cls}`}>{status.label}</p>
                </div>
                <div className="mt-3 h-1 w-full bg-bone/15">
                  <div className="h-full bg-emerald2 transition-all duration-500" style={{ width: `${barWidth}%` }} />
                </div>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/40">
                  Population baseline 1.00x
                </p>
              </div>

              <div className="my-8 h-px bg-bone/15" />

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/50">
                  Epigenetic Target Reversal Potential
                </p>
                {result.optimized ? (
                  <>
                    <p className="mt-2 font-serif text-4xl">Optimized</p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-bone/60">
                      Physiological age within the managed band — maintenance pathway recommended under quarterly
                      supervision.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 font-serif text-5xl tabular-nums">
                      −{result.reversal.toFixed(1)} <span className="text-2xl text-bone/60">yrs</span>
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-bone/60">
                      Achievable over 18 months under CMO-supervised protocol (Tier II and above).
                    </p>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={exportSummary}
                className="mt-10 w-full border border-bone/30 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-pine"
              >
                Export Confidential Health Summary
              </button>
              <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35">
                Model AE-P4 &middot; Calibrated 09/2026 &middot; N = 4,180 Reference Cohorts
              </p>
            </div>
          </div>
        </div>
      </div>
      {summary && <SummaryModal data={summary} onClose={() => setSummary(null)} />}
    </section>
  );
}
