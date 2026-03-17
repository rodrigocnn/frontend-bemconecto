"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.login("/api/Auth/login", {
        email,
        password,
      });
      const { data } = response.data;

      localStorage.setItem("token", data.token);
      router.push("/admin/home");
    } catch (err: any) {
      setError(err.response?.data || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
