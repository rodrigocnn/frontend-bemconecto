export interface Session {
  id?: string;
  summary?: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
  patientId?: string;
}

export interface FormSession {
  summary?: string;
  patientId?: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
  sessionDate?: string;
}

export interface PatientSummary {
  name: string;
  age: number;
  qtdServices: number;
  initialDate: string;
}
