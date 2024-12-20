"use client";

import { useState } from "react";
import { UserOrdersTable } from "@/components/payments/user-orders-table";
import { ExportButton } from "@/components/payments/export-button";
import { DateRangePicker } from "@/components/payments/date-range-picker";
import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersOrdersPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)),
    to: new Date(),
  });

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 w-2/3">
        <h1 className="text-4xl font-bold mb-2">Company Payroll</h1>
        <span className="text-muted-foreground text-pretty">
          The payroll data based on the data range selected on the calendar in
          the tables card below. Please set the date range you need, and click
          export if you want to download and edit the payroll data. Note that it
          won't be updated on our system.
        </span>
      </div>
      <Card>
        <CardContent>
          <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-2xl font-semibold">All Workers and Orders</h2>
            <div className="flex items-center space-x-4">
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              <ExportButton dateRange={dateRange} />
            </div>
          </div>
          <UserOrdersTable dateRange={dateRange} />
        </CardContent>
      </Card>
    </div>
  );
}
