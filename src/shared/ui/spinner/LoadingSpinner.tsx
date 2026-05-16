import { Spinner } from "flowbite-react";

export function LoadingSpinner() {
  return (
    <div className="text-center">
      <Spinner aria-label="Carregando" size="lg" className="h-12 w-12" />
      <p className="mt-2 text-sm text-gray-600">Carregando...</p>
    </div>
  );
}
