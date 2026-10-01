import { ACCREDITATIONS, FACULTY } from '../data/faculty';
import SectionHeader from './SectionHeader';

export default function Faculty() {
  return (
    <section id="faculty">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-4 lg:pb-32">
        <SectionHeader
          overline="Physician Faculty · Clinical Governance"
          title="Led by physicians. Governed by evidence."
          blurb="Every Aethel protocol is designed, dosed and audited by a senior physician of record. Faculty cohorts are capped at one hundred patients per physician annually."
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {FACULTY.map((f) => (
            <article key={f.name} className="grid gap-6 sm:grid-cols-[240px_1fr]">
              <img src={f.image} alt={`Portrait of ${f.name}`} className="aspect-square w-full object-cover" />
              <div>
                <h3 className="font-serif text-2xl">{f.name}</h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald2">{f.title}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-slate2">{f.credentials}</p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-slate2">{f.bio}</p>
                <p className="mt-5 border-t border-hairline pt-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate2">
                  Focus — {f.focus}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {ACCREDITATIONS.map((a) => (
            <div key={a} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-emerald2" />
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-slate2">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
