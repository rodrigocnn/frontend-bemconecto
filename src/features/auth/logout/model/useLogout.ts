import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);

    try {
      localStorage.removeItem("token");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
}
