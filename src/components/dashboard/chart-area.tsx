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

const chartData = [
  { month: "January", lunch: 3200, dinner: 2100 },
  { month: "February", lunch: 3500, dinner: 2300 },
  { month: "March", lunch: 3800, dinner: 2500 },
  { month: "April", lunch: 3600, dinner: 2400 },
  { month: "May", lunch: 4000, dinner: 2700 },
  { month: "June", lunch: 4200, dinner: 2900 },
];

const chartConfig = {
  lunch: {
    label: "Lunch",
    color: "hsl(var(--chart-1))",
  },
  dinner: {
    label: "Dinner",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartArea() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Meal Orders Over Time</CardTitle>
        <CardDescription>
          Showing total meal orders for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
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
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="dinner"
              type="natural"
              fill="var(--color-dinner)"
              fillOpacity={0.4}
              stroke="var(--color-dinner)"
              stackId="a"
            />
            <Area
              dataKey="lunch"
              type="natural"
              fill="var(--color-lunch)"
              fillOpacity={0.4}
              stroke="var(--color-lunch)"
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
