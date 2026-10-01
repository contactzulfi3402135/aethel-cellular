function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-bone/40">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a
              href="#top"
              onClick={(e) => e.preventDefault()}
              className="text-[13px] leading-relaxed text-bone/70 transition-colors hover:text-bone"
            >
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-pine text-bone">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl tracking-[0.06em]">AETHEL</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/40">
              Cellular Medicine &middot; Est. 2018
            </p>
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-bone/60">
              Private epigenetic diagnostics, biomarker sequencing and cellular longevity medicine for a restricted
              international cohort.
            </p>
          </div>
          <FooterCol
            title="Clinics"
            items={[
              'Gotthardstrasse 26, Enge — Zürich',
              '14 Queen Anne Street, Marylebone — London',
              'Rue du Rhône 54 — Geneva',
            ]}
          />
          <FooterCol
            title="Documents"
            items={[
              'Clinical Ethics Statement',
              'Biomarker Methodology Whitepaper',
              'Patient Confidentiality Charter',
              'Medical Governance',
            ]}
          />
          <FooterCol
            title="Admissions"
            items={['+41 44 210 68 40', 'admissions@aethel-cellular.ch', 'Mon – Fri · 08:00 – 18:00 CET']}
          />
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-bone/10 pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Aethel Longevity Institute AG &middot; Zürich</p>
          <p>Swissmedic Regulated &middot; GCP / GLP Certified &middot; Confidential for Accredited Patients</p>
        </div>
      </div>
    </footer>
  );
}
