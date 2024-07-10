"use client";

import AuthProvider from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/nav";
import { OrdersTable } from "@/components/orders-table";

export default function Home() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <OrdersTable />
        </div>
      </div>
    </AuthProvider>
  );
}
