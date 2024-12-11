"use client";

import AuthProvider from "@/components/auth-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/nav";
import { RestaurantTable } from "@/components/restaurant-table";

export default function Home() {
  const paths = [
    {
      name: "Restaurants",
      href: "/",
      current: true,
    },
  ];

  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header paths={paths} />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <RestaurantTable />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
