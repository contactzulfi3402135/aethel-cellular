export interface FacultyMember {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
  focus: string;
}

export const FACULTY: FacultyMember[] = [
  {
    name: 'Dr. Amelie Vontobel',
    title: 'Chief Medical Officer · Molecular Biologist',
    credentials: 'MD, PhD — ETH Zürich / University of Zurich',
    bio: 'Dr. Vontobel leads the Aethel epigenetic program and directs all reversal-protocol design. Formerly head of translational genomics at a Zürich university hospital, she has supervised 400+ DNAm intervention cohorts and chairs the internal dosing committee for all peptide regimens.',
    image: '/assets/images/physician-portrait-1.jpg',
    focus: 'DNAm Clocks · Telomere Biology · Peptide Pharmacology',
  },
  {
    name: 'Dr. Marcus Ellery',
    title: 'Director of Neuro-Longevity Medicine',
    credentials: 'MBBS, MRCP — Royal College of Physicians',
    bio: 'Dr. Ellery governs the neuro-immune and cognitive longevity workstreams across London and Geneva. His group maintains the NfL / GFAP surveillance protocol in use across all Aethel cohorts and reviews every cognitive-resilience intervention before cohort rollout.',
    image: '/assets/images/physician-portrait-2.jpg',
    focus: 'Neurofilament Surveillance · Cognitive Resilience · Immunometabolism',
  },
];

export const ACCREDITATIONS = [
  'Swissmedic Regulated',
  'GCP & GLP Certified Laboratories',
  'Royal College of Physicians Fellowship',
  'Independent Ethics Review Board Oversight',
];
