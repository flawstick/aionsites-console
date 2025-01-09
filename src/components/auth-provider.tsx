"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const changeTeam = useCallback(async (newTeamId: string) => {
    // Use regex to replace the dynamic [team] part of the path
    const updatedPath =
      pathname === "/" || pathname === ""
        ? `/${newTeamId}`
        : pathname.replace(/^\/[^/]+/, `/${newTeamId}`);

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
          setSelectedCompany(company._id);
          changeTeam(company.tenantId);
          return;
        }
      });

      if (!selectedCompany && companies.length > 0) {
        setSelectedCompany(companies[0]._id);
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
