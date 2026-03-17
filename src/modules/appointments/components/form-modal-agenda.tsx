import { Label, Select, TextInput } from "flowbite-react";
import { UseFormReturn } from "react-hook-form";
import { AppointmentForm } from "../interfaces";
import { Patient } from "@/modules/patients/interfaces";

interface PropsFormModalAgenda {
  form: UseFormReturn<AppointmentForm>;
  patients: Patient[] | undefined;
  isModeUpdate: boolean;
}

export function FormModalAgenda(props: PropsFormModalAgenda) {
  const { form, patients, isModeUpdate = false } = props;

  const { register, watch } = form;
  const patientId = watch("patientId");

  return (
    <>
      <div className="w-full mb-4">
        <Select {...register("patientId")} id="patientId" required>
          <option value={""} selected={!isModeUpdate || !patientId}>
            Selecione um Paciente
          </option>
          {patients?.map((patient) => (
            <option
              key={patient.id}
              value={patient.id}
              selected={isModeUpdate && patientId === patient.id}
            >
              {patient.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="w-full mb-4">
        <Label htmlFor="date" value="Data " />
        <TextInput type="date" id="date" {...register("date")} />
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <Label htmlFor="initialTime" value="Horário Inicial" />
          <Select {...register("initialTime")}>
            <option value="">Início Atendimento</option>
            <option value="07:00">07:00</option>
            <option value="07:30">07:30</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23:00">23:00</option>
            <option value="23:30">23:30</option>
            <option value="00:00">00:00</option>
          </Select>
        </div>

        <div className="w-full">
          <Label htmlFor="endTime" value="Horário Final" />
          <Select {...register("endTime")}>
            <option value="">Início Atendimento</option>
            <option value="07:00">07:00</option>
            <option value="07:30">07:30</option>
            <option value="08:00">08:00</option>
            <option value="08:30">08:30</option>
            <option value="09:00">09:00</option>
            <option value="09:30">09:30</option>
            <option value="10:00">10:00</option>
            <option value="10:30">10:30</option>
            <option value="11:00">11:00</option>
            <option value="11:30">11:30</option>
            <option value="12:00">12:00</option>
            <option value="12:30">12:30</option>
            <option value="13:00">13:00</option>
            <option value="13:30">13:30</option>
            <option value="14:00">14:00</option>
            <option value="14:30">14:30</option>
            <option value="15:00">15:00</option>
            <option value="15:30">15:30</option>
            <option value="16:00">16:00</option>
            <option value="16:30">16:30</option>
            <option value="17:00">17:00</option>
            <option value="17:30">17:30</option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
            <option value="19:30">19:30</option>
            <option value="20:00">20:00</option>
            <option value="20:30">20:30</option>
            <option value="21:00">21:00</option>
            <option value="21:30">21:30</option>
            <option value="22:00">22:00</option>
            <option value="22:30">22:30</option>
            <option value="23:00">23:00</option>
            <option value="23:30">23:30</option>
            <option value="00:00">00:00</option>
          </Select>
        </div>
      </div>

      {isModeUpdate && (
        <div className="w-full">
          <Label htmlFor="status" value="Status" />
          <Select {...register("status")}>
            <option value="SCHEDULED">Agendado</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="RESCHEDULED">Reagendado</option>
            <option value="COMPLETED">Atendido</option>
            <option value="CANCELED">Cancelado </option>
          </Select>
        </div>
      )}
    </>
  );
}
