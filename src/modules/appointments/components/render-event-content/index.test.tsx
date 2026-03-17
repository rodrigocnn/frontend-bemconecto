import React from "react";
import { render } from "@testing-library/react";
import { RenderEventContent } from ".";
import { EventImpl } from "@fullcalendar/core/internal";

describe("RenderEventContent", () => {
  it("Should render correctly", () => {
    const mockEvent = {
      title: "Sessão com paciente X",
      extendedProps: {},
    } as unknown as EventImpl;

    const mockProps = {
      event: mockEvent,
      timeText: "14:00",
      backgroundColor: "#fff",
      borderColor: "#000",
      textColor: "#333",
      isDraggable: false,
      isStartResizable: false,
      isEndResizable: false,
      isMirror: false,
      isStart: true,
      isEnd: true,
      isPast: false,
      isFuture: false,
      isToday: true,
      isSelected: false,
      isDragging: false,
      isResizing: false,
      view: {} as any,
    };

    const { getByText } = render(<RenderEventContent {...mockProps} />);

    expect(getByText("Sessão com paciente X")).toBeInTheDocument();
  });
});
