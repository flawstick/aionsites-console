import { ReactNode } from "react";
import SettingsProvider from "./settings-context";
import { LayoutSidebar } from "@/components/layout/sidebar";

export const metadata = {
  title: "Settings",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SettingsProvider>{children}</SettingsProvider>
    </div>
  );
}
