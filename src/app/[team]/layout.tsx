import type { Metadata } from "next";
import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutSidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  description: "A console for companies to manage their grub experience.",
  title: "Aionsites - Console",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <body
      className={cn("min-h-screen font-sans antialiased ", fontSans.variable)}
    >
      <LayoutSidebar>{children}</LayoutSidebar>
    </body>
  );
}
