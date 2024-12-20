"use client";

import React, { useContext } from "react";
import { SettingsContext } from "./settings-context";
import { GeneralSettings } from "@/components/settings/general";

export default function GeneralSettingsPage() {
  const {
    logo,
    setLogo,
    companyName,
    setCompanyName,
    companyUrl,
    setCompanyUrl,
    activeSection,
  } = useContext(SettingsContext);

  return (
    <GeneralSettings
      logo={logo}
      setLogo={setLogo}
      companyName={companyName}
      setCompanyName={setCompanyName}
      companyUrl={companyUrl}
      setCompanyUrl={setCompanyUrl}
      activeSection={activeSection}
    />
  );
}
