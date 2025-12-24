export const sessionsQueryKeys = {
  findAllInfoPatients: ["find-all-sessions"] as const,
  showSession: (id: string) => ["query-session-show", id] as const,
};
