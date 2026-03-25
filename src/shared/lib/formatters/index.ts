export function formatCPF(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11); // limita a 11 dígitos

  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11); // limita a 11 dígitos (DDD + número)

  return digits
    .replace(/(\d{2})(\d)/, "($1) $2") // DDD
    .replace(/(\d{5})(\d{4})$/, "$1-$2") // celular com 9 dígitos
    .replace(/(\d{4})(\d{4})$/, "$1-$2"); // telefone fixo com 8 dígitos
}

export function formatDateToPtBR(dateString?: string): string {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("pt-BR").format(new Date(dateString));
}

export function formatarToCurrencyBR(
  valor: number | string | undefined | null
): string {
  if (valor === undefined || valor === null || valor === "") {
    return "R$ 0,00";
  }

  const numero =
    typeof valor === "string" ? parseFloat(valor.replace(",", ".")) : valor;

  if (isNaN(numero)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numero);
}

const splitDateTime = (value: string) => {
  const normalized = value.replace(" ", "T");
  const [datePart, timePartRaw] = normalized.split("T");
  const timePart = timePartRaw ? timePartRaw.slice(0, 5) : "";
  return { datePart, timePart };
};

export const getTimeFromISO = (isoString: string): string => {
  const { timePart } = splitDateTime(isoString);
  if (timePart) return timePart;

  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getDateFromISO = (isoString: string): string => {
  const { datePart } = splitDateTime(isoString);
  if (datePart) return datePart;

  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
