import { ButtonApp } from "@/shared/ui/button";
import { useState } from "react";

export function StopWatch() {
  const [time, setTime] = useState("00:00:00");
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const start = () => {
    if (intervalId) return;

    const startTime = Date.now() - elapsedTime * 1000;

    const id = setInterval(() => {
      const now = Date.now();
      const totalSeconds = Math.floor((now - startTime) / 1000);

      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(totalSeconds % 60).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}`);
      setElapsedTime(totalSeconds);
    }, 1000);

    setIntervalId(id);
  };

  const pause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const reset = () => {
    if (intervalId) clearInterval(intervalId);
    setTime("00:00:00");
    setElapsedTime(0);
    setIntervalId(null);
  };

  return (
    <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 w-fit shadow-sm">
      {/* Botão Iniciar */}
      <ButtonApp className="relative top-2" onClick={start}>
        Iniciar
      </ButtonApp>

      {/* Display do cronômetro */}
      <div className="text-3xl font-mono text-gray-700 min-w-[100px] text-center">
        {time}
      </div>

      {/* Botões Pausar e Resetar */}
      <div className="flex gap-2">
        <button
          onClick={pause}
          className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Pausar
        </button>
        <button
          onClick={reset}
          className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
