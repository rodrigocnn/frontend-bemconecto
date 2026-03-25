// src/modules/sessions/components/SessionForm.tsx
import React from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";

import { useSessionFormController } from "../../hooks/useSessionFormController";
import { FormSession } from "../../interfaces";

interface SessionFormProps {
  mode: string;
}

export function SessionForm(props: SessionFormProps) {
  const router = useRouter();
  const { form, saveSession, handleChange } = useSessionFormController(
    router.query.id as string,
    props.mode,
  );

  const fields: { name: keyof FormSession; label: string }[] = [
    { name: "summary", label: "Resumo da sessão" },
    { name: "behavioralObservations", label: "Observações comportamentais" },
    { name: "patientReactions", label: "Reações" },
    { name: "interventions", label: "Intervenções" },
    { name: "referrals", label: "Encaminhamentos" },
    { name: "therapeuticPlans", label: "Planos terapêuticos" },
    { name: "diagnosticHypotheses", label: "Hipóteses diagnósticas" },
    { name: "techniqueUsed", label: "Técnica utilizada" },
  ];

  return (
    <>
      {fields.map(({ name, label }) => (
        <div key={name} className="block">
          <label className="block text-gray-700 mb-2 font-medium">
            {label}
          </label>
          <textarea
            className="textarea-base"
            value={form[name] ?? ""}
            onChange={(e) => handleChange(e, name as keyof typeof form)}
          />
        </div>
      ))}

      <Button
        onClick={saveSession}
        className="text-white bg-sky-500 rounded mb-4 hover:!bg-sky-500/75"
      >
        Salvar
      </Button>
    </>
  );
}
