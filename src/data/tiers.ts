export type TierId = 'tier-1' | 'tier-2' | 'tier-3';

export interface Tier {
  id: TierId;
  numeral: string;
  name: string;
  priceChf: number;
  tagline: string;
  features: string[];
  flagship?: boolean;
}

export const TIERS: Tier[] = [
  {
    id: 'tier-1',
    numeral: 'I',
    name: 'Epigenetic Genome Baseline',
    priceChf: 6500,
    tagline: 'Foundational epigenetic and genomic architecture for a defined reference point.',
    features: [
      'Full DNA methylation array (850k CpG)',
      'Telomere length audit (LUC assay)',
      'Baseline metabolomic panel — 140+ analytes',
      'Quarterly physician review and dossier update',
    ],
  },
  {
    id: 'tier-2',
    numeral: 'II',
    name: 'Cellular Optimization Protocol',
    priceChf: 18200,
    tagline: 'Active reversal engineering on a monthly monitoring cadence.',
    features: [
      'Complete Tier I epigenetic baseline',
      'Monthly microfluidic blood draws',
      'Personalized peptide regimens (CMO-supervised)',
      'Continuous glucose and lactate monitoring',
      'Quarterly DEXA and visceral fat MRI',
    ],
  },
  {
    id: 'tier-3',
    numeral: 'III',
    name: 'Comprehensive Longevity Concierge',
    priceChf: 42000,
    tagline: 'Full-spectrum governance of physiological age, internationally.',
    flagship: true,
    features: [
      'Full-body preventative 3T MRI sequencing',
      'Private direct line to Chief Medical Officer',
      'Dedicated private suite — Zürich & London',
      'International phlebotomy courier service',
      'Complete Tier I and Tier II protocols',
    ],
  },
];
