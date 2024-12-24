"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  { month: "January", avgLunch: 12.5, avgDinner: 18.2 },
  { month: "February", avgLunch: 13.1, avgDinner: 19.0 },
  { month: "March", avgLunch: 12.8, avgDinner: 18.5 },
  { month: "April", avgLunch: 13.4, avgDinner: 19.2 },
  { month: "May", avgLunch: 13.7, avgDinner: 19.8 },
  { month: "June", avgLunch: 14.2, avgDinner: 20.1 },
];

const chartConfig = {
  avgLunch: {
    label: "Avg. Lunch",
    color: "hsl(var(--chart-1))",
  },
  avgDinner: {
    label: "Avg. Dinner",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartLine() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Average Spending per Employee</CardTitle>
        <CardDescription>January - June 2024 ($)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <LineChart
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="avgLunch"
              type="monotone"
              stroke="var(--color-avgLunch)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="avgDinner"
              type="monotone"
              stroke="var(--color-avgDinner)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 3.7% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Slight increase in average meal costs
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
