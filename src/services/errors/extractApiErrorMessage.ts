import { AxiosError } from "axios";

export type ApiErrorPayload = {
  message?: string;
  error?: string | string[];
  notifications?: string[] | { mensagem?: string }[];
};

export function extractApiErrorMessage(error: unknown): string {
  if (!(error instanceof AxiosError)) {
    return "Erro inesperado";
  }

  const data = error.response?.data as ApiErrorPayload | undefined;

  if (!data) {
    return "Erro de comunicação com o servidor";
  }

  if (Array.isArray(data.notifications)) {
    const items = data.notifications;
    if (items.length && typeof items[0] === "string") {
      return (items as string[]).join(", ");
    }
    return (items as { mensagem?: string }[])
      .map((n) => n.mensagem)
      .filter(Boolean)
      .join(", ");
  }

  if (Array.isArray(data.error)) {
    return data.error.join(", ");
  }

  if (typeof data.error === "string") {
    return data.error;
  }

  if (data.message) {
    return data.message;
  }

  return "Erro inesperado";
}
