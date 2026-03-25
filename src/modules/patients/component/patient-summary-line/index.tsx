import React from "react";

interface PatientSummaryLineProps {
  name: string;
  age: number;
  totalAppointments: number;
  firstDate: string;
  lastDate: string;
}

export const PatientSummaryLine: React.FC<PatientSummaryLineProps> = ({
  name,
  age,
  totalAppointments,
  firstDate,
  lastDate,
}) => {
  return (
    <div className="w-full sm:w-1/2 bg-white border border-gray-200 shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-3 text-sm">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Nome</p>
          <p className="text-base font-semibold text-gray-800 truncate max-w-[160px]">
            {name}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Idade</p>
          <p className="text-base font-semibold text-gray-800">{age}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Atendimentos</p>
          <p className="text-base font-semibold text-gray-800">
            {totalAppointments}
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-600">Período</p>
          <div className="flex items-center gap-1 text-base font-semibold text-gray-800">
            {firstDate != "-" ? (
              <>
                <span>{firstDate}</span>
                <span className="text-gray-400">→</span>
                <span>{lastDate}</span>
              </>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
