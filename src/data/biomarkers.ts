export interface Marker {
  id: string;
  name: string;
  standard: string;
  target: string;
  mechanism: string;
}

export interface BiomarkerCategory {
  id: string;
  label: string;
  blurb: string;
  markers: Marker[];
}

export const BIOMARKER_CATEGORIES: BiomarkerCategory[] = [
  {
    id: 'epigenetic',
    label: 'Epigenetic Clocks',
    blurb:
      'Methylation-site clocks and telomere architecture define the anchor of your physiological age — and the measurable target of every Aethel intervention.',
    markers: [
      {
        id: 'grimage',
        name: 'GrimAge DNAm',
        standard: 'Cohort-calibrated · 100k CpG',
        target: '< 5.2 yrs above chronological',
        mechanism: 'Mortality-calibrated multi-tissue methylation clock; anchors the primary reversal KPI reported at each cohort boundary.',
      },
      {
        id: 'phenoage',
        name: 'PhenoAge DNAm',
        standard: 'Hannum + clinical features',
        target: 'Δ ≤ +1.5 yrs',
        mechanism: 'Composite clock integrating plasma protein panels; tracks intervention response quarter over quarter.',
      },
      {
        id: 'dunedin',
        name: 'DunedinPACE',
        standard: '0.90 – 1.10 pace',
        target: '< 0.92 pace',
        mechanism: 'Real-time rate-of-aging index; re-measured at every supervised draw to verify protocol effect size.',
      },
      {
        id: 'telomere',
        name: 'Telomere Length (LUC)',
        standard: '≥ 6.5 kb (age-matched)',
        target: '≥ 7.2 kb',
        mechanism: 'Quantitative LUC assay; attrition velocity is reviewed with methylation drift at each quarterly panel.',
      },
      {
        id: 'gfh2ax',
        name: 'γH2AX Foci Index',
        standard: '0 – 4 foci / nucleus',
        target: '≤ 1.5 foci / nucleus',
        mechanism: 'Double-strand break burden; the oxidative-stress readout that gates peptide dose escalation.',
      },
      {
        id: 'drift',
        name: 'Methylation Drift Index',
        standard: 'Assay baseline',
        target: '< 0.08 SD / 12 mo',
        mechanism: 'Site-level CpG stability; flags replicative stress before clock-level movement is visible.',
      },
    ],
  },
  {
    id: 'metabolic',
    label: 'Metabolic & Mitochondrial',
    blurb:
      'Glycemic, lipid and mitochondrial axes are sequenced on a monthly cycle in Tier II and above, with intervention thresholds set per patient.',
    markers: [
      {
        id: 'hba1c',
        name: 'HbA1c',
        standard: '< 5.7 % (40–47 mmol/mol)',
        target: '< 5.3 %',
        mechanism: 'Glycemic memory; primary metabolic KPI. Sustained targets unlock continuous-glucose downgrade supervision.',
      },
      {
        id: 'fplg',
        name: 'Fasting Plasma Glucose',
        standard: '70 – 99 mg/dL',
        target: '< 85 mg/dL',
        mechanism: '12-hour fasted draw, paired with 14-day continuous glucose mapping during protocol initiation.',
      },
      {
        id: 'homa',
        name: 'HOMA-IR',
        standard: '< 2.0',
        target: '< 1.2',
        mechanism: 'Insulin resistance index; determines metformin and GLP-1 thresholding under CMO supervision.',
      },
      {
        id: 'apob',
        name: 'ApoB / ApoA1 Ratio',
        standard: '< 0.8',
        target: '< 0.55',
        mechanism: 'Atherogenic particle balance; the core lipid axis of the cardiovascular workstream.',
      },
      {
        id: 'fgf21',
        name: 'FGF-21',
        standard: '60 – 250 pg/mL',
        target: '≥ 150 pg/mL',
        mechanism: 'Metabolic flexibility signal; a direct readout of peptide-regimen response in the metabolic axis.',
      },
      {
        id: 'lactate',
        name: 'Peak Plasma Lactate',
        standard: '2.0 – 4.5 mmol/L (HRV)',
        target: '≥ 4.5 mmol/L',
        mechanism: 'Mitochondrial oxidative capacity from supervised VO2 Max testing, repeated quarterly.',
      },
    ],
  },
  {
    id: 'cardiovascular',
    label: 'Cardiovascular Endothelium',
    blurb:
      'Endothelial function, arterial stiffness and plaque vulnerability are tracked as a unified axis — from plasma markers to annual 3T imaging.',
    markers: [
      {
        id: 'lplpla2',
        name: 'Lp-PLA2',
        standard: '< 130 ng/mL',
        target: '< 100 ng/mL',
        mechanism: 'Endothelial inflammation; the primary plaque-vulnerability readout in the cardiovascular axis.',
      },
      {
        id: 'hscr',
        name: 'High-sensitivity CRP',
        standard: '< 1.0 mg/L',
        target: '< 0.4 mg/L',
        mechanism: 'Systemic inflammatory tone; re-assayed quarterly and reviewed against the IL-6 trajectory.',
      },
      {
        id: 'apob2',
        name: 'Apolipoprotein B',
        standard: '< 80 mg/dL',
        target: '< 65 mg/dL',
        mechanism: 'Total atherogenic particle count; combined with the ApoB/ApoA1 ratio for particle-quality context.',
      },
      {
        id: 'cac',
        name: 'Coronary Artery Calcium',
        standard: '0 – 100 (age-matched)',
        target: 'CAC 0',
        mechanism: 'Annual 3T cardiac MRI with CCTA cross-reference; the anchor of the Tier III imaging sequence.',
      },
      {
        id: 'pwv',
        name: 'Pulse Wave Velocity',
        standard: '< 8.0 m/s',
        target: '< 7.0 m/s',
        mechanism: 'Arterial stiffness index; the compliance readout paired with endothelin / NO bioavailability.',
      },
      {
        id: 'et1',
        name: 'Endothelin-1',
        standard: '0.8 – 1.4 pg/mL',
        target: '< 1.0 pg/mL',
        mechanism: 'Vasoconstrictor tone; balanced against nitric-oxide bioavailability in the endothelial panel.',
      },
    ],
  },
  {
    id: 'neuroimmune',
    label: 'Neuro-Immune Signaling',
    blurb:
      'Neuronal integrity and low-grade inflammatory signaling are monitored to protect cognitive reserve across the full protocol horizon.',
    markers: [
      {
        id: 'nfl',
        name: 'Neurofilament Light (NfL)',
        standard: '60 – 120 pg/mL (plasma)',
        target: '< 75 pg/mL',
        mechanism: 'Neuronal integrity marker; the surveillance anchor of the cognitive longevity workstream.',
      },
      {
        id: 'gfap',
        name: 'GFAP',
        standard: '< 160 pg/mL',
        target: '< 120 pg/mL',
        mechanism: 'Astrocyte activation index; read jointly with NfL to separate neurodegeneration from neuroinflammation.',
      },
      {
        id: 'igf1',
        name: 'IGF-1 · Somatotropic Axis',
        standard: '90 – 250 ng/mL (age-matched)',
        target: 'Lower quartile, DEXA-locked',
        mechanism: 'Growth-axis calibration against lean mass; monitored with the quarterly DEXA sequence.',
      },
      {
        id: 'glyca',
        name: 'GlycA Inflammation',
        standard: '< 0.8 μmol/L',
        target: '< 0.7 μmol/L',
        mechanism: 'Glycosylated albumin; a chronic low-grade inflammation index with strong long-horizon event association.',
      },
      {
        id: 'il6',
        name: 'Interleukin-6',
        standard: '< 2.0 pg/mL',
        target: '< 1.0 pg/mL',
        mechanism: 'Pro-inflammatory cytokine; the immunosenescence marker tracked across all four axes.',
      },
      {
        id: 'vitd',
        name: '25-OH Vitamin D',
        standard: '30 – 60 ng/mL',
        target: '45 – 55 ng/mL',
        mechanism: 'Immune modulation with seasonal dosing, supervised and re-assayed at every winter panel.',
      },
    ],
  },
];
