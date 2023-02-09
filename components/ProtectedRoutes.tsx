import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated" && !data.user?.isAdmin) {
      router.push("/");
    }
  }, [router, status, data?.user?.isAdmin]);

  if (status === "unauthenticated") return null;

  return <>{children}</>;
};

export default ProtectedRoutes;
