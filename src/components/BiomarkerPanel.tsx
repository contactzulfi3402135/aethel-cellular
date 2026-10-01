import { useState } from 'react';
import { BIOMARKER_CATEGORIES } from '../data/biomarkers';
import SectionHeader from './SectionHeader';

export default function BiomarkerPanel() {
  const [activeId, setActiveId] = useState(BIOMARKER_CATEGORIES[0].id);
  const cat = BIOMARKER_CATEGORIES.find((c) => c.id === activeId) ?? BIOMARKER_CATEGORIES[0];

  return (
    <section id="protocol" className="border-y border-hairline bg-mist">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:items-end">
          <SectionHeader
            overline="The Protocol · Biomarker Sequencing"
            title="140+ biomarkers, sequenced across four clinical axes."
            blurb={cat.blurb}
          />
          <figure>
            <img
              src="/assets/images/biomarker-sequencing-lab.jpg"
              alt="Aethel epigenetic sequencing cleanroom"
              className="h-52 w-full object-cover"
            />
            <figcaption className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate2">
              Automated Liquid Handling — GCP / GLP Certified, Zürich
            </figcaption>
          </figure>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-hairline">
          {BIOMARKER_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              aria-pressed={c.id === activeId}
              className={`-mb-px border-b-2 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                c.id === activeId ? 'border-pine text-pine' : 'border-transparent text-slate2 hover:text-pine'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {cat.markers.map((m, i) => (
            <article key={m.id} className="bg-canvas p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate2/60">
                {cat.label} &middot; {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="mt-2 font-serif text-lg text-pine">{m.name}</h4>
              <dl className="mt-4 space-y-2.5">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate2">Standard Range</dt>
                  <dd className="text-right font-mono text-[12px] tabular-nums text-pine">{m.standard}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-emerald2">Aethel Target</dt>
                  <dd className="text-right font-mono text-[12px] tabular-nums text-emerald2">{m.target}</dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-hairline pt-3 text-[12px] leading-relaxed text-slate2">{m.mechanism}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
