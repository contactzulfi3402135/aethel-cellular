export type SleepTier = 'lt1' | 'h15' | 'h2p';
export type RhrTier = 'r45' | 'r56' | 'r66';
export type Vo2Tier = 'fair' | 'excellent' | 'elite';
export type GlucoseTier = 'optimized' | 'borderline' | 'elevated';

export interface EngineInputs {
  age: number;
  sleep: SleepTier;
  rhr: RhrTier;
  vo2: Vo2Tier;
  glucose: GlucoseTier;
}

export interface EngineResult {
  phenoAge: number;
  delta: number;
  factor: number;
  reversal: number;
  optimized: boolean;
}

const SLEEP_OFFSET: Record<SleepTier, number> = { lt1: 1.8, h15: 0.5, h2p: -0.9 };
const RHR_OFFSET: Record<RhrTier, number> = { r45: -1.1, r56: 0.3, r66: 1.6 };
const VO2_OFFSET: Record<Vo2Tier, number> = { fair: 1.4, excellent: -0.5, elite: -1.8 };
const GLUCOSE_OFFSET: Record<GlucoseTier, number> = { optimized: -0.7, borderline: 0.9, elevated: 2.2 };

export function computeEngine(i: EngineInputs): EngineResult {
  const offset = SLEEP_OFFSET[i.sleep] + RHR_OFFSET[i.rhr] + VO2_OFFSET[i.vo2] + GLUCOSE_OFFSET[i.glucose];
  const phenoAge = Math.max(i.age - 6, i.age + offset);
  const delta = phenoAge - i.age;
  const factor = phenoAge / i.age;
  const target = i.age * 0.88;
  const raw = phenoAge - target;
  const cap = i.age * 0.13;
  const reversal = Math.max(0, Math.min(raw, cap));
  return { phenoAge, delta, factor, reversal, optimized: reversal < 0.5 };
}

export function generateAccession(prefix: string): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `AE-2026-${prefix}-${n}`;
}

export function generateDossier(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `AE-${n}-CL`;
}
