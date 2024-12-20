"use client";

import React, { useContext } from "react";
import { SettingsContext } from "../settings-context";
import { OrderRegulation } from "@/components/settings/regulation";

export default function RegulationSettingsPage() {
  const {
    maxPerOrder,
    setMaxPerOrder,
    maxOrderShekels,
    setMaxOrderShekels,
    maxOrdersPerDay,
    setMaxOrdersPerDay,
    activeSection,
  } = useContext(SettingsContext);

  return (
    <OrderRegulation
      maxMealsPerOrder={maxPerOrder}
      setMaxMealsPerOrder={setMaxPerOrder}
      maxSpendingBudget={maxOrderShekels}
      setMaxSpendingBudget={setMaxOrderShekels}
      maxOrdersPerDay={maxOrdersPerDay}
      setMaxOrdersPerDay={setMaxOrdersPerDay}
      activeSection={activeSection}
    />
  );
}
