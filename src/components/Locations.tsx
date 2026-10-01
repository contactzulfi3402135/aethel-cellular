import SectionHeader from './SectionHeader';

const LOCATIONS = [
  {
    city: 'Zürich — Enge',
    line1: 'Gotthardstrasse 26, Enge',
    line2: '8004 Zürich, Switzerland',
    phone: '+41 44 210 68 40',
    hours: 'Mon – Fri · 07:30 – 19:00 · By appointment only',
  },
  {
    city: 'London — Marylebone',
    line1: '14 Queen Anne Street, Marylebone',
    line2: 'London W1G 0HQ, United Kingdom',
    phone: '+44 20 7210 68 40',
    hours: 'Mon – Fri · 08:00 – 18:00 · Mayfair recovery hall',
  },
  {
    city: 'Geneva — Rhône',
    line1: 'Rue du Rhône 54',
    line2: '1204 Genève, Switzerland',
    phone: '+41 22 736 68 40',
    hours: 'Tue – Sat · 08:30 – 17:30 · Sequencing satellite',
  },
];

export default function Locations() {
  return (
    <section id="locations">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          overline="Clinical Locations"
          title="Three private clinical houses. One standard of care."
          blurb="Appointments are made exclusively through your physician of record. All three sites operate under a single confidential data vault with identical assay specifications."
        />

        <figure className="relative mt-12">
          <img
            src="/assets/images/cryo-chamber-detail.jpg"
            alt="Aethel cryo-longevity recovery chamber, London"
            className="h-[380px] w-full object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 bg-pine/85 px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/85">
            Recovery Hall — 14 Queen Anne Street, London
          </figcaption>
        </figure>

        <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          {LOCATIONS.map((l) => (
            <div key={l.city} className="bg-canvas p-7">
              <p className="font-serif text-xl">{l.city}</p>
              <p className="mt-3 font-mono text-[11.5px] leading-relaxed text-slate2">
                {l.line1}
                <br />
                {l.line2}
              </p>
              <div className="mt-5 space-y-1.5 border-t border-hairline pt-4 font-mono text-[10px] tracking-[0.06em] text-slate2">
                <p>{l.phone}</p>
                <p className="text-slate2/80">{l.hours}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 border border-hairline bg-canvas p-6 sm:p-8 lg:grid-cols-[280px_1fr]">
          <img
            src="/assets/images/phlebotomy-kit-luxury.jpg"
            alt="Aethel at-home phlebotomy courier kit"
            className="h-64 w-full object-cover"
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald2">
              Private At-Home Courier Protocol
            </p>
            <h3 className="mt-3 font-serif text-3xl leading-tight">Sealed phlebotomy, dispatched to your residence.</h3>
            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate2">
              A bonded courier delivers your sealed kit — vacuum-stoppered glass tubes, brushed titanium lancet,
              gold-foil instruction folio. Samples return under −20 °C chain of custody to our GCP/GLP certified
              laboratory, with full results within 48 hours of receipt.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate2">
              Operational in 26 Countries &middot; 48h Turnaround &middot; Door-to-Door Chain of Custody
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
