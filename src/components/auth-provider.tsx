"use client";

import { ReactNode, useCallback, useEffect } from "react";
import useAuth from "@/lib/hooks/useAuth";
import { SessionProvider } from "next-auth/react";
import Loading from "@/components/loading";
import { useParams, usePathname } from "next/navigation";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllCompanies } from "@/lib/utils";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const changeTeam = useCallback(async (newTeamId: string) => {
    // Use regex to replace the dynamic [team] part of the path
    const updatedPath = pathname.replace(/^\/[^/]+/, `/${newTeamId}`);

    router.replace(updatedPath); // Navigate to the updated path
  }, []);

  const { selectedCompany, fetchCompanies, setSelectedCompany } =
    useCompanyStore();
  const { team } = useParams();

  useEffect(() => {
    (async () => {
      const companies = await fetchCompanies();
      companies?.map((company: any) => {
        if (company.tenantId === team) {
          setSelectedCompany(company as any);
          changeTeam(company.tenantId);
          return;
        }
      });
      if (!selectedCompany) {
        changeTeam(companies[0].tenantId);
      }
    })();
  }, []);

  useEffect(() => {
    if (
      !!selectedCompany &&
      !pathname.includes(selectedCompany?.tenantId as string)
    ) {
      changeTeam(selectedCompany?.tenantId as string);
    }
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
