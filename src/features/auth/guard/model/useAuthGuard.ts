"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const redirectTo = "/login";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push(redirectTo);
    } else {
      setIsChecking(false);
    }
  }, [router, redirectTo]);

  return { isChecking };
}
