import type { Metadata } from "next";
import "@/styles/globals.css";

import { LayoutSidebar } from "@/components/layout/sidebar";
import AuthProvider from "@/components/auth-provider";

export const metadata: Metadata = {
  description: "A console for companies to manage their grub experience.",
  title: "Grub - Company Console",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <LayoutSidebar>{children}</LayoutSidebar>;
}
