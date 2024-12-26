"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import { api } from "@/lib/utils/api";
import { useParams } from "next/navigation";

const chartData = [
  { mealType: "Standard", orders: 450, fill: "var(--color-standard)" },
  { mealType: "Vegetarian", orders: 200, fill: "var(--color-vegetarian)" },
  { mealType: "Vegan", orders: 150, fill: "var(--color-vegan)" },
  { mealType: "Gluten-Free", orders: 100, fill: "var(--color-gluten-free)" },
  { mealType: "Keto", orders: 75, fill: "var(--color-keto)" },
];

const chartConfig = {
  orders: {
    label: "Orders",
  },
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  vegetarian: {
    label: "Vegetarian",
    color: "hsl(var(--chart-2))",
  },
  vegan: {
    label: "Vegan",
    color: "hsl(var(--chart-3))",
  },
  "gluten-free": {
    label: "Gluten-Free",
    color: "hsl(var(--chart-4))",
  },
  keto: {
    label: "Keto",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartPie() {
  const { team } = useParams();
  const [chartData, setChartData] = React.useState<{
    data?: any;
    topTwo?: any;
    totalCount?: number;
  }>({});
  React.useLayoutEffect(() => {
    (async () => {
      let response = await api(
        "GET",
        `/companies/analytics/meal-type-distribution/${team}`,
      );
      setChartData(response);
    })();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Meal Type Distribution</CardTitle>
        <CardDescription>Current month's meal preferences</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.data}
              dataKey="orders"
              nameKey="mealType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData?.totalCount?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Orders
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {chartData?.topTwo?.length > 0 && (
          <div className="flex items-center gap-2 font-medium leading-none">
            {chartData?.topTwo[0]} and {chartData?.topTwo[1]} options up
            <TrendingUp className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Standard meals still most popular choice
        </div>
      </CardFooter>
    </Card>
  );
}
