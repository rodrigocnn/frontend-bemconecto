import {
  richEditorPlugins,
  richEditorStyle,
  richEditorToolbar,
} from "@/features/patients/model/constants";

export const configEditor = {
  height: 300,
  menubar: false,
  plugins: richEditorPlugins,
  toolbar: richEditorToolbar,
  content_style: richEditorStyle,
};

export const apiKeyEditor = "uhwhamgmp0xooy3e66d6qoi27ciyi0tcr12t0wxe2kmqwtnb";

export const INITIALSTATESESSION = {
  summary: "",
  behavioralObservations: "",
  interventions: "",
  patientReactions: "",
  referrals: "",
  therapeuticPlans: "",
  diagnosticHypotheses: "",
  techniqueUsed: "",
};
