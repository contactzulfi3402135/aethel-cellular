import { useCurrency } from '../lib/currency';
import { TIERS, type TierId } from '../data/tiers';
import SectionHeader from './SectionHeader';

export default function Tiers({ onAllocate }: { onAllocate: (id: TierId) => void }) {
  const { fmt } = useCurrency();

  return (
    <section id="tiers" className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          overline="Diagnostic Tiers"
          title="Three protocols. One measurable objective."
          blurb="Every allocation begins with a full epigenetic baseline. Tiers differ in intervention depth, monitoring cadence and physician access — priced annually, convertible to your currency in real time."
        />
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-slate2 lg:pb-2 lg:text-right">
          Annual Allocation &middot; Cohort 2026/2027
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t) => (
          <article
            key={t.id}
            className={`flex flex-col border p-8 transition-colors ${
              t.flagship ? 'border-pine bg-pine text-bone' : 'border-hairline bg-canvas hover:border-slate2/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className={`font-mono text-[10px] uppercase tracking-[0.28em] ${t.flagship ? 'text-bone/50' : 'text-slate2'}`}>
                Tier {t.numeral}
              </p>
              {t.flagship && (
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-suede">Flagship Protocol</p>
              )}
            </div>
            <h3 className="mt-5 font-serif text-[26px] leading-snug">{t.name}</h3>
            <p className={`mt-2 text-[13px] leading-relaxed ${t.flagship ? 'text-bone/60' : 'text-slate2'}`}>
              {t.tagline}
            </p>
            <div className={`mt-6 border-t pt-5 ${t.flagship ? 'border-bone/15' : 'border-hairline'}`}>
              <p className="font-serif text-3xl tabular-nums">
                {fmt(t.priceChf)}{' '}
                <span className={`font-mono text-[11px] uppercase tracking-[0.12em] ${t.flagship ? 'text-bone/50' : 'text-slate2'}`}>
                  / yr
                </span>
              </p>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex gap-3 text-[13px] leading-relaxed">
                  <span className={`mt-[7px] h-1 w-3 shrink-0 ${t.flagship ? 'bg-suede' : 'bg-emerald2'}`} />
                  <span className={t.flagship ? 'text-bone/75' : 'text-slate2'}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onAllocate(t.id)}
              className={`mt-8 w-full py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                t.flagship ? 'bg-bone text-pine hover:bg-suede' : 'bg-pine text-bone hover:bg-emerald2'
              }`}
            >
              Initiate Allocation
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
