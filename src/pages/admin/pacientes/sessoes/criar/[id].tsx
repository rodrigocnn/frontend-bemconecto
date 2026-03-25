import LayoutAdmin from "@/widgets/admin-layout";

import { StopWatch } from "@/features/sessions/ui/StopWatch";
import { SessionForm } from "@/features/sessions/ui/SessionForm";

export default function CriarSessaoPaciente() {
  return (
    <LayoutAdmin>
      <h2 className="text-2xl font-semibold mb-4">Sessão</h2>
      <div className="bg-white p-4 rounded h-screen space-y-4 overflow-y-auto">
        <StopWatch />
        <SessionForm mode="create" />
      </div>
    </LayoutAdmin>
  );
}
