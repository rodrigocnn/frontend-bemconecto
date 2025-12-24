import { AxiosError } from "axios";

export type ApiErrorPayload = {
  message?: string;
  error?: string | string[];
  notificacoes?: { mensagem: string }[];
};

export function extractApiErrorMessage(error: unknown): string {
  if (!(error instanceof AxiosError)) {
    return "Erro inesperado";
  }

  const data = error.response?.data as ApiErrorPayload | undefined;

  if (!data) {
    return "Erro de comunicação com o servidor";
  }

  if (data.notificacoes?.length) {
    return data.notificacoes.map((n) => n.mensagem).join(", ");
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
