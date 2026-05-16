import React from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";

import { useSessionFormUseCase } from "../model/use-case/useSessionFormUseCase";
import { FormSession } from "../model/shared/types";
import { useFindSession } from "../model/find-one/useFindSession";
import { useSessionFormState } from "../model/form/useSessionFormState";
import { useCreateSession } from "../model/create/useCreateSession";
import { useEditSession } from "../model/update/useEditSession";

interface SessionFormProps {
  mode: "create" | "edit";
}

export function SessionForm(props: SessionFormProps) {
  const router = useRouter();
  const sessionId = router.query.id as string;
  const shouldFetch = props.mode === "edit";
  const findOne = useFindSession(shouldFetch ? sessionId : "");
  const formState = useSessionFormState({
    initialData: shouldFetch ? findOne.data?.data : undefined,
  });
  const createSession = useCreateSession();
  const editSession = useEditSession();
  const { form, saveSession, handleChange } = useSessionFormUseCase({
    formState,
    createSession,
    editSession,
    patientId: sessionId,
    mode: props.mode,
  });

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
