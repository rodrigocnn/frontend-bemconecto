import { Label, TextInput, Spinner, Radio, Textarea } from "flowbite-react";

import { usePatientFormController } from "../model/usePatientFormController";
import { useEffect } from "react";
import { Patient } from "@/entities/patient/types";
import { ButtonApp } from "@/shared/ui/button";

interface FormPatientProps {
  edit?: boolean;
  initialData?: Patient;
}

export function FormPatient(props: FormPatientProps) {
  const initialData = props.initialData;

  const {
    form,
    handleChange,
    handleSubmit,
    setForm,
    createPatient,
    handleChangeCPF,
    handleChangePhone,
  } = usePatientFormController(initialData, props.edit);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm(initialData);
    }
  }, [initialData]);

  return (
    <div className="bg-white p-4 rounded">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="w-full  mb-4">
            <h2 className="font-semibold text-sky-600/100 ">Geral</h2>
          </div>

          <div className="flex gap-4">
            <div className="w-full mb-4">
              <Label htmlFor="name" value="Nome" />
              <TextInput
                onChange={handleChange}
                name="name"
                id="name"
                value={form.name}
              />
            </div>

            <div className="w-full mb-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                onChange={handleChange}
                name="email"
                id="email"
                value={form.email}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full mb-4">
              <Label htmlFor="birthDate" value="Data de Nascimento" />
              <TextInput
                type="date"
                onChange={handleChange}
                name="birthDate"
                id="dbirthDate"
                defaultValue={form.birthDate.split("T")[0]}
              />
            </div>

            <div className="w-full mb-4">
              <Label htmlFor="cpf" value="CPF" />
              <TextInput
                onChange={handleChangeCPF}
                name="cpf"
                id="cpf"
                value={form.cpf}
              />
            </div>

            <div className="w-full mb-4">
              <Label htmlFor="rg" value={"RG"} />
              <TextInput
                onChange={handleChange}
                value={form.rg}
                name="rg"
                id="rg"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full mb-4">
              <Label htmlFor="phone" value="Telefone" />
              <TextInput
                onChange={handleChangePhone}
                name="phone"
                id="phone"
                value={form.phone}
              />
            </div>

            <div className="w-full mb-4">
              <Label value="Sexo" />
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Radio
                    id="masculino"
                    name="gender"
                    value="MASCULINO"
                    checked={form.gender === "MASCULINO"}
                    onChange={handleChange}
                  />
                  <Label htmlFor="masculino">Masculino</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="feminino"
                    name="gender"
                    value="FEMININO"
                    checked={form.gender === "FEMININO"}
                    onChange={handleChange}
                  />
                  <Label htmlFor="feminino">Feminino</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mb-6">
            <Label htmlFor="notes" value="Observações" />
            <Textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Escreva aqui informações adicionais sobre o paciente..."
              onChange={handleChange}
              value={form.notes}
            />
          </div>

          <div className="col-span-2">
            <ButtonApp type="submit">
              {createPatient.isPending ||
                (createPatient.isPending && <Spinner color="info" />)}
              {props.edit ? "Atualizar" : "Cadastrar"} Paciente
            </ButtonApp>
          </div>
        </form>
      </div>
    </div>
  );
}
