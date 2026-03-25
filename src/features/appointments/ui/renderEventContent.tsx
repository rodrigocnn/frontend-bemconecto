import { EventContentArg } from "@fullcalendar/core/index.js";

export const renderEventContent = (eventInfo: EventContentArg) => {
  const start = new Date(eventInfo.event.start!);
  const end = new Date(eventInfo.event.end!);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col p-1 text-white">
      <span className="font-bold">
        {formatTime(start)} - {formatTime(end)}
      </span>
      <span>{eventInfo.event.title}</span>
    </div>
  );
};
