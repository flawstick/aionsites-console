"use client";

import { ReactNode, useEffect } from "react";
import useAuth from "@/lib/hooks/useAuth";
import { SessionProvider } from "next-auth/react";
import Loading from "@/components/loading";
import { useParams } from "next/navigation";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useAuth();
  const router = useRouter();

  const { selectedCompany } = useCompanyStore();
  const { team } = useParams();

  useEffect(() => {
    if (!team && !!selectedCompany)
      router.replace(`/${selectedCompany?.tenantId}/`);
  }, [selectedCompany]);

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </SessionProvider>
  );
};

export default AuthProvider;
