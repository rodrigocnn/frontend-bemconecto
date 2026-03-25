export function formatDateBR(value: string | null | undefined): string {
  if (!value || value == "-") return "-";

  const datePart = String(value).split("T")[0];
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) return String(value);

  return `${day}/${month}/${year}`;
}
