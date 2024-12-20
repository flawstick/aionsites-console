"use client";

import React, { useContext } from "react";
import { SettingsContext } from "../settings-context";
import { MealContribution } from "@/components/settings/contribution";

export default function ContributionSettingsPage() {
  const {
    companyContributionPercentage,
    setCompanyContributionPercentage,
    activeSection,
  } = useContext(SettingsContext);

  return (
    <MealContribution
      mealContribution={companyContributionPercentage}
      setMealContribution={setCompanyContributionPercentage}
      activeSection={activeSection}
    />
  );
}
