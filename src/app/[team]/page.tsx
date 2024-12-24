"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartArea } from "@/components/dashboard/chart-area";
import { ChartBar } from "@/components/dashboard/chart-bar";
import { ChartLine } from "@/components/dashboard/chart-line";
import { ChartPie } from "@/components/dashboard/chart-pie";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const { open } = useSidebar();

  // Simulate loading state for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="text-primary-foreground p-6">
        <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
        <p className="text-xl">Here's your Grub dashboard overview</p>
      </div>
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {loading ? (
                  <Skeleton className="h-4 w-1/2" />
                ) : (
                  <CardTitle className="text-sm font-medium">
                    {item === 1
                      ? "Active Restaurants"
                      : item === 2
                      ? "Total Orders Today"
                      : item === 3
                      ? "Total Spending Today"
                      : "Most Popular Meal"}
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {item === 1
                        ? "42"
                        : item === 2
                        ? "1,234"
                        : item === 3
                        ? "$15,678"
                        : "Chicken Salad"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item === 1
                        ? "+2 new this week"
                        : item === 2
                        ? "+15% from yesterday"
                        : item === 3
                        ? "+8% from yesterday"
                        : "Ordered 156 times today"}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            <>
              <Skeleton
                className={`${open ? "h-64" : "h-80"} xl:col-span-2 w-full`}
              />
              <Skeleton
                className={`${open ? "h-64" : "h-80"} xl:col-span-1 w-full`}
              />
              <Skeleton
                className={`${open ? "h-64" : "h-80"} xl:col-span-1 w-full`}
              />
              <Skeleton
                className={`${open ? "h-64" : "h-80"} xl:col-span-2 w-full`}
              />
            </>
          ) : (
            <>
              <ChartLine />
              <ChartBar />
              <ChartPie />
              <ChartArea />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
