"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useLayoutEffect, useState } from "react";
import { api } from "@/lib/utils/api";
import { useParams } from "next/navigation";

/**
 * Example data for monthly order cost vs. company monthly order cost.
 * You’d ultimately pull these values from MongoDB—likely by aggregating
 * your `getPayrollByDate` or a similar function—for each month.
 */
const chartData = [
  { month: "January", monthlyOrderCost: 5500, companyMonthlyOrderCost: 2200 },
  { month: "February", monthlyOrderCost: 5200, companyMonthlyOrderCost: 2000 },
  { month: "March", monthlyOrderCost: 5800, companyMonthlyOrderCost: 2500 },
  { month: "April", monthlyOrderCost: 5100, companyMonthlyOrderCost: 2100 },
  { month: "May", monthlyOrderCost: 5900, companyMonthlyOrderCost: 2700 },
  { month: "June", monthlyOrderCost: 6200, companyMonthlyOrderCost: 3000 },
];

/**
 * Updated chart config with new keys.
 */
const chartConfig = {
  monthlyOrderCost: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
  companyMonthlyOrderCost: {
    label: "Company",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartArea() {
  const { team } = useParams();
  const [data, setData] = useState(chartData);
  useLayoutEffect(() => {
    (async () => {
      let response = await api("GET", `/companies/analytics/area-cost/${team}`);
      setData(response?.data);
    })();
  }, []);

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Costs Over Time</CardTitle>
        <CardDescription>
          Tracking total monthly order cost vs. company’s share
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className="w-48" />}
            />
            <Area
              dataKey="companyMonthlyOrderCost"
              type="monotoneX"
              fill="var(--color-companyMonthlyOrderCost)"
              fillOpacity={0.4}
              stroke="var(--color-companyMonthlyOrderCost)"
              stackId="a"
            />
            <Area
              dataKey="monthlyOrderCost"
              type="monotoneX"
              fill="var(--color-monthlyOrderCost)"
              fillOpacity={0.4}
              stroke="var(--color-monthlyOrderCost)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 8.7% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
