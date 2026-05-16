import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import LayoutAdmin from "@/widgets/admin-layout";
import { FormModalAgenda } from "@/features/appointments/ui/FormModalAgenda";
import { useAppointmentUseCase } from "@/features/appointments/model/use-case/useAppointmentUseCase";
import { useFindAllPatients } from "@/features/patients/model/find-all/useFindAllPatients";
import { useFindAllAppointments } from "@/features/appointments/model/find-all/useFindAllAppointments";
import { useAppointmentCreate } from "@/features/appointments/model/create/useAppointmentCreate";
import { useAppointmentFormState } from "@/features/appointments/model/form/useAppointmentFormState";
import { useAppointmentModalState } from "@/features/appointments/model/modal/useAppointmentModalState";
import { useAppointmentUpdate } from "@/features/appointments/model/update/useAppointmentUpdate";
import { renderEventContent } from "@/features/appointments/ui/renderEventContent";
import { CustomModal } from "@/shared/ui/modal";
import { LoadingSpinner } from "@/shared/ui/spinner/LoadingSpinner";

export default function Appointment() {
  const formState = useAppointmentFormState();
  const modalState = useAppointmentModalState();
  const appointmentCreate = useAppointmentCreate();
  const appointmentUpdate = useAppointmentUpdate();
  const { data: events, isLoading: isLoadingAppointments } =
    useFindAllAppointments();

  const {
    handleEventClick,
    isModalOpen,
    openModal,
    closeModal,
    bookAppointment,
    form,
    isModeUpdate,
  } = useAppointmentUseCase({
    appointments: events ?? [],
    formState,
    modalState,
    appointmentCreate,
    appointmentUpdate,
  });

  const { data: patients, isLoading } = useFindAllPatients();

  if (isLoadingAppointments) {
    return (
      <LayoutAdmin>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </LayoutAdmin>
    );
  }

  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold  mb-4">Agenda</h2>

      <CustomModal
        primaryAction={{
          label: "Agendar",
          onClick: () => form.handleSubmit(bookAppointment)(),
        }}
        title="Agendar Paciente"
        show={isModalOpen}
        onClose={closeModal}
      >
        <FormModalAgenda
          patients={patients}
          form={form}
          isModeUpdate={isModeUpdate}
        />
      </CustomModal>

      <div className="bg-white p-4 rounded h-screen ">
        <div className="overflow-x-auto">
          <FullCalendar
            events={events}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView={"dayGridMonth"}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            displayEventTime={false}
            locale={"pt-br"}
            noEventsText="Sem Eventos"
            buttonText={{
              today: "Hoje",
              month: "Mês",
              day: "Dia",
            }}
            headerToolbar={{
              left: "cadastrar",
              center: "prev title next",
              right: "dayGridMonth,timeGridDay",
            }}
            customButtons={{
              cadastrar: {
                text: "Cadastrar",
                click: () => openModal(),
              },
            }}
            views={{
              listWeek: { buttonText: "Lista" },
            }}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
