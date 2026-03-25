import { toast } from "react-toastify";
import { extractApiErrorMessage } from "./extractApiErrorMessage";

type ErrorMeta = {
  silentError?: boolean;
};

type ErrorWithMeta = {
  meta?: ErrorMeta;
};

export function handleApiError(error: unknown) {
  const err = error as ErrorWithMeta;

  if (err?.meta?.silentError) return;

  const message = extractApiErrorMessage(error);
  toast.error(message);
}
