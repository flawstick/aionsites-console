"use client";

import { Sidebar } from "@/components/settings/sidebar";
import { GeneralSettings } from "@/components/settings/general";
import { OrderRegulation } from "@/components/settings/regulation";
import { MealContribution } from "@/components/settings/contribution";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import React from "react";
import { Header } from "@/components/header";
import AuthProvider from "@/components/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { useSettings } from "@/lib/hooks/useSettings";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { profile } from "console";

export default function WrappedPage() {
  return (
    <AuthProvider>
      <CompanySettingsPage />
    </AuthProvider>
  );
}

export function CompanySettingsPage() {
  const { updateSettings, loading, error } = useSettings();
  const { selectedCompany } = useCompanyStore();

  const [activeSection, setActiveSection] = React.useState("General");
  const [logo, setLogo] = React.useState("/placeholder-logo.jpg");
  const [companyName, setCompanyName] = React.useState("");
  const [companyUrl, setCompanyUrl] = React.useState("");
  const [maxPerOrder, setMaxPerOrder] = React.useState(""); // was maxMealsPerOrder
  const [maxOrderShekels, setMaxOrderShekels] = React.useState(""); // was maxSpendingBudget
  const [maxOrdersPerDay, setMaxOrdersPerDay] = React.useState("");
  const [maxOrdersPerMonth, setMaxOrdersPerMonth] = React.useState(""); // new field
  const [companyContributionPercentage, setCompanyContributionPercentage] =
    React.useState(50); // was mealContribution
  const [hasChanges, setHasChanges] = React.useState(false);

  const router = useRouter();
  const path = usePathname();

  React.useEffect(() => {
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

  React.useEffect(() => {
    setLogo(selectedCompany?.profile?.logo || "/placeholder-logo.jpg");
    setCompanyName(selectedCompany?.name || "");
    setCompanyUrl(selectedCompany?.profile?.url || "");
    setMaxPerOrder(selectedCompany?.maxPerOrder?.toString() || "");
    setMaxOrderShekels(selectedCompany?.maxOrderShekels?.toString() || "");
    setMaxOrdersPerDay(selectedCompany?.maxOrdersPerDay?.toString() || "");
    setMaxOrdersPerMonth(selectedCompany?.maxOrdersPerMonth?.toString() || "");
    setCompanyContributionPercentage(
      selectedCompany?.companyContributionPercentage || 50,
    );
  }, [selectedCompany]);

  React.useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSection(
        hash.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase()),
      );
    }
  }, [path]);

  React.useEffect(() => {
    switch (activeSection) {
      case "General":
        router.push("/settings#general", undefined);
        break;
      case "Order Regulation":
        router.push("/settings#order-regulation", undefined);
        break;
      case "Meal Contribution":
        router.push("/settings#meal-contribution", undefined);
        break;
    }
  }, [activeSection]);

  const handleSave = () => {
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
    } satisfies any;
    updateSettings(selectedCompany?._id as string, dataToSend as any);
    setHasChanges(false);
  };

  const paths = [
    {
      name: "Settings",
      href: "/",
      current: true,
    },
  ];

  return (
    <>
      <Header paths={paths} fullWidth />
      <div className="flex bg-gradient-to-br from-primary-100 via-white to-primary-100">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex flex-col p-6 overflow-auto items-center w-full">
          <div className="space-y-6 w-full 2xl:w-2/3">
            <div className="flex flex-row items-center gap-4">
              <Button
                variant="ghost"
                className="flex text-foreground "
                size="icon"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>

              <h1 className="text-3xl font-bold self-start mb-1">
                {activeSection}
              </h1>
            </div>
            <GeneralSettings
              logo={logo}
              setLogo={setLogo}
              companyName={companyName}
              setCompanyName={setCompanyName}
              companyUrl={companyUrl}
              setCompanyUrl={setCompanyUrl}
              activeSection={activeSection}
            />
            <OrderRegulation
              maxMealsPerOrder={maxPerOrder} // renamed from maxMealsPerOrder
              setMaxMealsPerOrder={setMaxPerOrder} // renamed from maxMealsPerOrder
              maxSpendingBudget={maxOrderShekels} // renamed from maxSpendingBudget
              setMaxSpendingBudget={setMaxOrderShekels} // renamed from maxSpendingBudget
              maxOrdersPerDay={maxOrdersPerDay}
              setMaxOrdersPerDay={setMaxOrdersPerDay}
              activeSection={activeSection}
            />
            <MealContribution
              mealContribution={companyContributionPercentage} // renamed from mealContribution
              setMealContribution={setCompanyContributionPercentage} // renamed from mealContribution
              activeSection={activeSection}
            />
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={!hasChanges || loading}>
                <Settings className="w-4 h-4 mr-2" />
                {loading ? "Loading..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
