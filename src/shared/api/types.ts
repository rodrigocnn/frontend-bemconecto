export type ApiResponse<T> = {
  success: boolean;
  data: T;
  notifications: unknown[];
};
