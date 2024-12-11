"use client";

import AuthProvider from "@/components/auth-provider";
import { CMSDashboard } from "@/components/cms-dashboard";

export default function Home() {
  const paths = [
    {
      name: "Dashboard",
      href: "/",
      current: true,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <CMSDashboard />
    </div>
  );
}
