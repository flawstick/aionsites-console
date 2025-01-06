"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { department: "Engineering", lunch: 2500, dinner: 1800 },
  { department: "Marketing", lunch: 1800, dinner: 1200 },
  { department: "Sales", lunch: 2200, dinner: 1600 },
  { department: "HR", lunch: 1200, dinner: 800 },
  { department: "Finance", lunch: 1500, dinner: 1000 },
  { department: "Operations", lunch: 2000, dinner: 1400 },
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

export function ChartBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Department</CardTitle>
        <CardDescription>Current month's meal spending ($)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="department"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="lunch"
              stackId="a"
              fill="var(--color-lunch)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="dinner"
              stackId="a"
              fill="var(--color-dinner)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Engineering department has the highest spending
        </div>
        <div className="leading-none text-muted-foreground">
          Breakdown of lunch and dinner spending per department
        </div>
      </CardFooter>
    </Card>
  );
}
