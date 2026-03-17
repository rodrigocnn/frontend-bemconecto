import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import LayoutAdmin from "@/components/admin/LayoutAdmin";
import { FormModalAgenda } from "@/modules/appointments/components/form-modal-agenda";
import { useAppointmentController } from "@/modules/appointments/hooks/useAppointmentController";
import { useFindAllPatients } from "@/modules/patients/hooks/useFindAllPatients";
import { useFindAllAppointments } from "@/modules/appointments/hooks/useFindAllAppointments";
import { renderEventContent } from "@/modules/appointments/components/render-event-content";
import { CustomModal } from "@/components/admin/Modal";

export default function Appointment() {
  const {
    handleEventClick,
    isModalOpen,
    openModal,
    closeModal,
    bookAppointment,
    form,
    isModeUpdate,
  } = useAppointmentController();

  const { data: patients, isLoading } = useFindAllPatients();
  const { data: events } = useFindAllAppointments();

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
            datesSet={(arg) => {
              console.log(
                "Mudou de período:",
                arg.startStr,
                arg.endStr,
                arg.view.type
              );
            }}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
}
