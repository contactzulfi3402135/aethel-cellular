import { useState } from 'react';
import { CURRENCIES, CURRENCY_ORDER, useCurrency } from '../lib/currency';

const LINKS = [
  { href: '#tiers', label: 'Diagnostic Tiers' },
  { href: '#engine', label: 'Epigenetic Engine' },
  { href: '#locations', label: 'Clinical Locations' },
  { href: '#protocol', label: 'The Protocol' },
  { href: '#faculty', label: 'Physician Faculty' },
];

interface Props {
  onAdmission: () => void;
  onPortal: () => void;
}

export default function Nav({ onAdmission, onPortal }: Props) {
  const { code, setCode } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <p className="bg-pine px-4 py-2 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-bone/55 sm:text-[10px]">
        Swiss Med Regulated&nbsp;&bull;&nbsp;Privately Accredited Geneva &amp; Harley Street Clinics&nbsp;&bull;&nbsp;Confidential Executive Protocols
      </p>
      <div className="border-b border-hairline bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="shrink-0 leading-none">
            <span className="block font-serif text-[25px] font-medium tracking-[0.06em] text-pine">AETHEL</span>
            <span className="mt-1.5 block font-mono text-[8.5px] uppercase tracking-[0.32em] text-slate2">
              Cellular Medicine &middot; Est. 2018
            </span>
          </a>

          <nav className="hidden items-center gap-7 xl:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate2 transition-colors hover:text-emerald2"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden items-stretch border border-hairline lg:flex" role="group" aria-label="Currency">
              {CURRENCY_ORDER.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCode(c)}
                  title={CURRENCIES[c].name}
                  aria-pressed={code === c}
                  className={`px-2.5 py-2 font-mono text-[10px] tracking-[0.08em] transition-colors ${
                    code === c ? 'bg-pine text-bone' : 'text-slate2 hover:text-pine'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onPortal}
              className="hidden border border-hairline px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-pine transition-colors hover:border-pine md:block"
            >
              Patient Portal
            </button>
            <button
              type="button"
              onClick={onAdmission}
              className="hidden bg-pine px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors hover:bg-emerald2 sm:block"
            >
              Request Clinical Admission
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center border border-hairline text-pine xl:hidden"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                {open ? <path d="M1 1l14 10M15 1L1 11" /> : <path d="M0 1h16M0 6h16M0 11h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-hairline bg-canvas xl:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate2 transition-colors last:border-b-0 hover:text-emerald2"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex flex-wrap items-center gap-2 py-4">
                <div className="flex border border-hairline">
                  {CURRENCY_ORDER.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCode(c)}
                      className={`px-3 py-2 font-mono text-[10px] ${code === c ? 'bg-pine text-bone' : 'text-slate2'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onPortal();
                  }}
                  className="border border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-pine"
                >
                  Patient Portal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onAdmission();
                  }}
                  className="bg-pine px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-bone"
                >
                  Request Admission
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
