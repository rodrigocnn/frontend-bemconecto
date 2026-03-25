// Tailwind global
import "@/app/styles/globals.css";

// CSS do DataGrid (global)

import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import { queryClient } from "@/shared/api/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </QueryClientProvider>
  );
}
