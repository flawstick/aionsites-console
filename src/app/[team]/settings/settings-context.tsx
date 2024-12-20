"use client";

import React from "react";
import { Header } from "@/components/settings/header";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useSettings } from "@/lib/hooks/useSettings";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { useParams, usePathname, useRouter } from "next/navigation";

// Create a context to share state and handlers with child pages
export const SettingsContext = React.createContext<any>(null);

export default function SettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { updateSettings, loading } = useSettings();
  const { selectedCompany } = useCompanyStore();
  const router = useRouter();
  const pathname = usePathname();

  const [logo, setLogo] = React.useState("/placeholder-logo.jpg");
  const [companyName, setCompanyName] = React.useState("");
  const [companyUrl, setCompanyUrl] = React.useState("");
  const [maxPerOrder, setMaxPerOrder] = React.useState("");
  const [maxOrderShekels, setMaxOrderShekels] = React.useState("");
  const [maxOrdersPerDay, setMaxOrdersPerDay] = React.useState("");
  const [maxOrdersPerMonth, setMaxOrdersPerMonth] = React.useState("");
  const [companyContributionPercentage, setCompanyContributionPercentage] =
    React.useState(50);
  const [hasChanges, setHasChanges] = React.useState(false);

  const activeSection = React.useMemo(() => {
    if (pathname === "/settings" || pathname === "/settings/") return "General";
    if (pathname.includes("/regulation")) return "Order Regulation";
    if (pathname.includes("/contribution")) return "Meal Contribution";
    if (pathname.includes("/timeline")) return "Timeline Scheduler";
    return "General";
  }, [pathname]);

  React.useEffect(() => {
    if (selectedCompany) {
      setLogo(selectedCompany?.profile?.logo || "/placeholder-logo.jpg");
      setCompanyName(selectedCompany?.name || "");
      setCompanyUrl(selectedCompany?.profile?.url || "");
      setMaxPerOrder(selectedCompany?.maxPerOrder?.toString() || "");
      setMaxOrderShekels(selectedCompany?.maxOrderShekels?.toString() || "");
      setMaxOrdersPerDay(selectedCompany?.maxOrdersPerDay?.toString() || "");
      setMaxOrdersPerMonth(
        selectedCompany?.maxOrdersPerMonth?.toString() || "",
      );
      setCompanyContributionPercentage(
        selectedCompany?.companyContributionPercentage || 50,
      );
      setHasChanges(false);
    }
  }, [selectedCompany]);

  React.useEffect(() => {
    // When any of these values change, mark changes as pending
    setHasChanges(true);
  }, [
    logo,
    companyName,
    companyUrl,
    maxPerOrder,
    maxOrderShekels,
    maxOrdersPerDay,
    maxOrdersPerMonth,
    companyContributionPercentage,
  ]);

  const handleSave = () => {
    if (!selectedCompany?._id) return;
    const dataToSend = {
      name: companyName,
      companyUrl: companyUrl,
      companyLogo: logo,
      profile: {
        url: companyUrl,
        logo: logo,
      },
      maxPerOrder,
      maxOrderShekels,
      maxOrdersPerDay,
      maxOrdersPerMonth,
      companyContributionPercentage,
    };
    updateSettings(selectedCompany._id, dataToSend as any);
    setHasChanges(false);
  };

  const contextValue = {
    logo,
    setLogo,
    companyName,
    setCompanyName,
    companyUrl,
    setCompanyUrl,
    maxPerOrder,
    setMaxPerOrder,
    maxOrderShekels,
    setMaxOrderShekels,
    maxOrdersPerDay,
    setMaxOrdersPerDay,
    maxOrdersPerMonth,
    setMaxOrdersPerMonth,
    companyContributionPercentage,
    setCompanyContributionPercentage,
    hasChanges,
    loading,
    handleSave,
    activeSection,
  };

  const { team } = useParams();
  const setSection = (path: string) => {
    router.push(`/${team}/settings/${path}`);
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      <div className="flex bg-gradient-to-br from-primary-100 via-white to-primary-100">
        <Header activeSection={activeSection} setActiveSection={setSection} />
        <main className="flex-1 p-6 overflow-auto mt-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold">{activeSection}</h1>
            </div>
            {children}
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={!hasChanges || loading}>
                <Settings className="w-4 h-4 mr-2" />
                {loading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SettingsContext.Provider>
  );
}
