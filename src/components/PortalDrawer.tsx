import { useState } from 'react';
import { useEscape, useLockBody } from '../lib/hooks';

function StatRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-1 py-3.5">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate2">{k}</p>
      <p className="text-right font-mono text-[12px] tabular-nums leading-relaxed text-pine">{v}</p>
    </div>
  );
}

export default function PortalDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [authed, setAuthed] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState('');

  useLockBody(open);
  useEscape(open, onClose);

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  const enter = () => {
    if (memberId.trim().length < 4) {
      setError('Enter your Aethel member number as issued at registration.');
      return;
    }
    setError('');
    setAuthed(true);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-pine/50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-hairline bg-canvas transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between bg-pine px-6 py-5">
          <div>
            <p className="font-serif text-xl text-canvas">Patient Portal</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-bone/50">
              Secure Access &middot; TLS 1.3
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close portal"
            className="p-1 text-bone/60 transition-colors hover:text-bone"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.2">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {authed ? (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-emerald2">
                Session Established &middot; {today}
              </p>
              <p className="mt-3 font-serif text-3xl leading-tight">Welcome back, M. Aldana-Voss</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate2">
                Tier III Member &middot; Since 2022 &middot; Zürich / London
              </p>

              <div className="mt-7 divide-y divide-hairline border border-hairline">
                <StatRow k="Next Consultation" v="Dr. Vontobel · 12 Oct 2026, 09:30 · Enge Wing" />
                <StatRow k="DNAm PhenoAge" v="41.2 yrs (−3.8 vs 2024)" />
                <StatRow k="Q4 Biomarker Panel" v="Completed 18 Sep 2026 · 142 analytes" />
                <StatRow k="Peptide Regimen" v="Cycle 6 of 12 · Next draw 09 Oct" />
                <StatRow k="Courier Kit #417-2" v="Delivered 16 Sep 2026 · Custody verified" />
              </div>

              <div className="mt-7 space-y-2.5">
                <button
                  type="button"
                  className="w-full bg-pine py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-emerald2"
                >
                  View Full Dossier
                </button>
                <button
                  type="button"
                  className="w-full border border-hairline py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-pine transition-colors hover:border-pine"
                >
                  Schedule Consultation
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAuthed(false);
                  setMemberId('');
                }}
                className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate2 transition-colors hover:text-pine"
              >
                End Secure Session
              </button>
            </div>
          ) : (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-slate2">Restricted Access</p>
              <p className="mt-3 font-serif text-2xl leading-snug">Establish a secure session.</p>
              <p className="mt-3 text-[13px] leading-relaxed text-slate2">
                The portal is limited to accredited patients. Your dossier, regimen schedule and courier history are
                visible only under an authenticated session.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="portal-member" className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">
                    Member Number
                  </label>
                  <input
                    id="portal-member"
                    type="text"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    placeholder="AE-M-0417"
                    className="mt-2 w-full border border-hairline bg-canvas px-3.5 py-2.5 font-mono text-sm text-pine placeholder:text-slate2/50 focus:border-emerald2 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="portal-key" className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">
                    Access Key
                  </label>
                  <input
                    id="portal-key"
                    type="password"
                    placeholder="••••••••"
                    className="mt-2 w-full border border-hairline bg-canvas px-3.5 py-2.5 font-mono text-sm text-pine placeholder:text-slate2/50 focus:border-emerald2 focus:outline-none"
                  />
                </div>
                {error && <p className="font-mono text-[10px] tracking-[0.06em] text-suede">{error}</p>}
                <button
                  type="button"
                  onClick={enter}
                  className="w-full bg-pine py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition-colors hover:bg-emerald2"
                >
                  Establish Secure Session
                </button>
              </div>

              <p className="mt-8 border-t border-hairline pt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-slate2/70">
                Access is restricted to accredited patients. All sessions are logged under the Patient
                Confidentiality Charter.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-hairline px-6 py-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate2/60">
            Zürich Data Vault &middot; GCP / GLP &middot; Swissmedic Regulated
          </p>
        </div>
      </aside>
    </>
  );
}
