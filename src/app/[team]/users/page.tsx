"use client";

import AuthProvider from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/nav";
import { UserTable } from "@/components/user-table";

export default function Home() {
  const paths = [
    {
      name: "Users",
      href: "/",
      current: true,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <UserTable />
    </div>
  );
}
