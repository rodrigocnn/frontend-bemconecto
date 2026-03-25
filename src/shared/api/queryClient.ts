import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

import { handleApiError } from "./errors/apiErrorHandler";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleApiError(error);
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      handleApiError(error);
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});
