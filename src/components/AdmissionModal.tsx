import { useMemo, useState } from 'react';
import { useCurrency } from '../lib/currency';
import { useEscape, useLockBody } from '../lib/hooks';
import { generateDossier } from '../lib/age';
import { TIERS, type TierId } from '../data/tiers';

type ObjectiveId = 'metabolic' | 'cognitive' | 'cardio' | 'epigenetic';
type LocationId = 'zurich' | 'london' | 'courier';

const OBJECTIVES: { id: ObjectiveId; label: string; detail: string }[] = [
  { id: 'metabolic', label: 'Metabolic Longevity', detail: 'Glycemic, lipid and mitochondrial optimization.' },
  { id: 'cognitive', label: 'Cognitive Longevity', detail: 'Neurofilament surveillance and cognitive resilience.' },
  { id: 'cardio', label: 'Cardiovascular Optimization', detail: 'Endothelial function and atherogenic particle control.' },
  { id: 'epigenetic', label: 'Epigenetic Age Reversal', detail: 'DNAm clock reduction under CMO supervision.' },
];

const LOCATIONS: { id: LocationId; city: string; line: string; note: string }[] = [
  {
    id: 'zurich',
    city: 'Zürich — Enge',
    line: 'Gotthardstrasse 26, 8004 Zürich',
    note: 'Primary clinical house · Full imaging & sequencing',
  },
  {
    id: 'london',
    city: 'London — Mayfair',
    line: '14 Queen Anne Street, W1G 0HQ',
    note: 'Recovery hall · CMO consultations',
  },
  {
    id: 'courier',
    city: 'Private At-Home Courier',
    line: 'International — 26 countries',
    note: 'Sealed phlebotomy kit · −20 °C chain of custody',
  },
];

const JURISDICTIONS = [
  'Switzerland (CH)',
  'United Kingdom (GB)',
  'France (FR)',
  'Germany (DE)',
  'Liechtenstein (LI)',
  'United States (US)',
  'United Arab Emirates (AE)',
  'Singapore (SG)',
  'Other',
];

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 bg-canvas px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate2">{k}</span>
      <span className="font-mono text-[12px] leading-relaxed text-pine">{v}</span>
    </div>
  );
}

const inputCls =
  'w-full border border-hairline bg-canvas px-3.5 py-2.5 text-sm text-pine placeholder:text-slate2/50 focus:border-emerald2 focus:outline-none';

interface Props {
  open: boolean;
  tierId?: TierId;
  onClose: () => void;
}

export default function AdmissionModal({ open, tierId, onClose }: Props) {
  const { fmt } = useCurrency();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: '',
    dob: '',
    jurisdiction: '',
    phone: '',
    objective: null as ObjectiveId | null,
    location: 'zurich' as LocationId,
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dossier, setDossier] = useState<string | null>(null);

  useLockBody(open);
  useEscape(open, onClose);

  const tier = useMemo(() => TIERS.find((t) => t.id === tierId), [tierId]);

  const reset = () => {
    setStep(1);
    setForm({ name: '', dob: '', jurisdiction: '', phone: '', objective: null, location: 'zurich', consent: false });
    setErrors({});
    setDossier(null);
  };

  if (!open) return null;

  const close = () => {
    reset();
    onClose();
  };

  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (form.name.trim().length < 3) e.name = 'Full legal name is required.';
      if (!form.dob) e.dob = 'Date of birth is required.';
      if (!form.jurisdiction) e.jurisdiction = 'Select your primary residence jurisdiction.';
      if (form.phone.trim().length < 6) e.phone = 'A direct contact number is required.';
    }
    if (step === 2 && !form.objective) e.objective = 'Select a primary clinical objective.';
    if (step === 3 && !form.consent) e.consent = 'Confirmation is required before transmission.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(3, s + 1) as 1 | 2 | 3);
  };
  const back = () => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3);
  const submit = () => {
    if (validateStep()) setDossier(generateDossier());
  };

  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const courierDispatch = form.location === 'courier' || tierId === 'tier-2' || tierId === 'tier-3';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-pine/70 backdrop-blur-[3px]" onClick={close} />
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-hairline bg-canvas">
        <div className="flex items-center justify-between border-b border-hairline bg-pine px-6 py-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-bone/50">
              Confidential Transmission Channel
            </p>
            <p className="mt-1 font-serif text-lg text-canvas">Clinical Admission — Cohort 2026/2027</p>
          </div>
          <button type="button" onClick={close} aria-label="Close" className="p-1 text-bone/60 transition-colors hover:text-bone">
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.2">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {dossier ? (
          <div className="overflow-y-auto px-6 py-10 sm:px-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald2">Dossier Received</p>
            <h3 className="mt-4 font-serif text-4xl leading-tight">Clinical intake confirmed.</h3>
            <p className="mt-4 font-mono text-[12px] tracking-[0.04em] text-slate2">
              CLINICAL INTAKE DOSSIER <span className="text-pine">#{dossier}</span> — RECEIVED {today.toUpperCase()}
            </p>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-slate2">
              Clinical Dossier #{dossier} transmitted to the Office of the Chief Medical Officer. A clinical
              registrar will coordinate your confidential intake consultation.
            </p>

            <div className="mt-8 divide-y divide-hairline border border-hairline bg-canvas">
              <Line k="Assignment" v="Chief Medical Officer — Zürich Private Clinic" />
              <Line
                k="Primary Objective"
                v={OBJECTIVES.find((o) => o.id === form.objective)?.label ?? '—'}
              />
              <Line k="Receiving Site" v={LOCATIONS.find((l) => l.id === form.location)?.city ?? '—'} />
              {tier && (
                <Line k="Allocation Request" v={`Tier ${tier.numeral} — ${tier.name} · ${fmt(tier.priceChf)} / yr`} />
              )}
              {courierDispatch && <Line k="Courier Status" v="Expedited phlebotomy courier kit dispatched" />}
            </div>

            <ol className="mt-8 space-y-3">
              {[
                'A clinical registrar contacts you within 24 hours on your direct number.',
                'CMO review and provisional consultation slot issued within 5 working days.',
                'First supervised phlebotomy session per your allocated protocol.',
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-[13px] leading-relaxed text-slate2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-pine font-mono text-[9px] text-bone">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={close}
              className="mt-10 w-full bg-pine py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-emerald2"
            >
              Close & Return to Site
            </button>
          </div>
        ) : (
          <>
            <div className="flex border-b border-hairline">
              {[
                { n: 1, l: 'Patient Details' },
                { n: 2, l: 'Clinical Objectives' },
                { n: 3, l: 'Clinic Location' },
              ].map((s) => (
                <div
                  key={s.n}
                  className={`flex-1 border-r border-hairline px-4 py-3.5 last:border-r-0 ${step >= s.n ? 'bg-mist' : 'bg-canvas'}`}
                >
                  <p
                    className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                      step === s.n ? 'text-emerald2' : 'text-slate2/60'
                    }`}
                  >
                    0{s.n} — {s.l}
                  </p>
                </div>
              ))}
            </div>

            {tier && (
              <div className="border-b border-hairline bg-mist/60 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate2">
                Allocation Request &middot; Tier {tier.numeral} — {tier.name} &middot;{' '}
                <span className="text-pine">{fmt(tier.priceChf)} / yr</span>
              </div>
            )}

            <div className="overflow-y-auto px-6 py-8 sm:px-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="adm-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">
                      Full Legal Name
                    </label>
                    <input
                      id="adm-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="As registered in your jurisdiction"
                      className={`${inputCls} mt-2`}
                    />
                    {errors.name && <p className="mt-1.5 font-mono text-[10px] tracking-[0.06em] text-suede">{errors.name}</p>}
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="adm-dob" className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">
                        Date of Birth
                      </label>
                      <input
                        id="adm-dob"
                        type="date"
                        value={form.dob}
                        onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
                        className={`${inputCls} mt-2`}
                      />
                      {errors.dob && <p className="mt-1.5 font-mono text-[10px] tracking-[0.06em] text-suede">{errors.dob}</p>}
                    </div>
                    <div>
                      <label htmlFor="adm-jur" className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">
                        Primary Residence Jurisdiction
                      </label>
                      <select
                        id="adm-jur"
                        value={form.jurisdiction}
                        onChange={(e) => setForm((f) => ({ ...f, jurisdiction: e.target.value }))}
                        className={`${inputCls} mt-2 ${form.jurisdiction ? '' : 'text-slate2/60'}`}
                      >
                        <option value="" disabled>
                          Select jurisdiction
                        </option>
                        {JURISDICTIONS.map((j) => (
                          <option key={j} value={j}>
                            {j}
                          </option>
                        ))}
                      </select>
                      {errors.jurisdiction && (
                        <p className="mt-1.5 font-mono text-[10px] tracking-[0.06em] text-suede">{errors.jurisdiction}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="adm-phone" className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate2">
                      Contact Phone
                    </label>
                    <input
                      id="adm-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+41 — direct line, monitored 24h by registrar desk"
                      className={`${inputCls} mt-2`}
                    />
                    {errors.phone && <p className="mt-1.5 font-mono text-[10px] tracking-[0.06em] text-suede">{errors.phone}</p>}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {OBJECTIVES.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, objective: o.id }))}
                        aria-pressed={form.objective === o.id}
                        className={`border p-4 text-left transition-colors ${
                          form.objective === o.id ? 'border-pine bg-mist' : 'border-hairline hover:border-slate2/60'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-serif text-lg leading-snug">{o.label}</span>
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                              form.objective === o.id ? 'border-pine bg-pine' : 'border-slate2/40'
                            }`}
                          />
                        </span>
                        <span className="mt-1.5 block text-[12px] leading-relaxed text-slate2">{o.detail}</span>
                      </button>
                    ))}
                  </div>
                  {errors.objective && (
                    <p className="mt-3 font-mono text-[10px] tracking-[0.06em] text-suede">{errors.objective}</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  {LOCATIONS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, location: l.id }))}
                      aria-pressed={form.location === l.id}
                      className={`w-full border p-4 text-left transition-colors ${
                        form.location === l.id ? 'border-pine bg-mist' : 'border-hairline hover:border-slate2/60'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-serif text-lg">{l.city}</span>
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                            form.location === l.id ? 'border-pine bg-pine' : 'border-slate2/40'
                          }`}
                        />
                      </span>
                      <span className="mt-1.5 block font-mono text-[11px] tracking-[0.04em] text-slate2">
                        {l.line} &middot; {l.note}
                      </span>
                    </button>
                  ))}
                  <label className="mt-4 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 accent-[#2D6A4F]"
                    />
                    <span className="text-[12px] leading-relaxed text-slate2">
                      I confirm the information provided is accurate and consent to confidential processing in
                      accordance with the Aethel Patient Confidentiality Charter.
                    </span>
                  </label>
                  {errors.consent && <p className="font-mono text-[10px] tracking-[0.06em] text-suede">{errors.consent}</p>}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-hairline px-6 py-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className={`font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                  step === 1 ? 'cursor-default text-slate2/40' : 'text-slate2 hover:text-pine'
                }`}
              >
                &larr; Back
              </button>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-slate2/50 sm:block">
                Encrypted &middot; TLS 1.3 &middot; Zürich Data Vault
              </span>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="bg-pine px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone transition-colors hover:bg-emerald2"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  className="bg-emerald2 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone transition-colors hover:bg-pine"
                >
                  Transmit Dossier
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
