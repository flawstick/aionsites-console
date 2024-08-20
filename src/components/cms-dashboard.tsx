"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Text,
  Label,
  LabelList,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useOrderStore from "@/lib/store/useOrderStore";

const orderData = [
  { date: "2024-04-01", orders: 111 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
  { date: "2024-04-01", orders: 111 },
  { date: "2024-04-02", orders: 157 },
  { date: "2024-04-03", orders: 129 },
  { date: "2024-04-04", orders: 150 },
  { date: "2024-04-05", orders: 119 },
  { date: "2024-04-06", orders: 72 },
  { date: "2024-04-07", orders: 97 },
  { date: "2024-04-08", orders: 187 },
  { date: "2024-04-09", orders: 211 },
  { date: "2024-04-10", orders: 142 },
];

const spendingData = [
  { date: "2024-04-01", spendings: 372 },
  { date: "2024-04-02", spendings: 277 },
  { date: "2024-04-03", spendings: 287 },
  { date: "2024-04-04", spendings: 502 },
  { date: "2024-04-05", spendings: 663 },
  { date: "2024-04-06", spendings: 641 },
  { date: "2024-04-07", spendings: 425 },
  { date: "2024-04-08", spendings: 729 },
  { date: "2024-04-09", spendings: 169 },
  { date: "2024-04-10", spendings: 451 },
];

const topMealsData = [
  { name: "Gourmet Burger", orders: 142 },
  { name: "Pepperoni Pizza", orders: 118 },
  { name: "Caesar Salad", orders: 92 },
  { name: "Spaghetti Carbonara", orders: 88 },
  { name: "Chicken Tacos", orders: 75 },
  { name: "Steak", orders: 65 },
];

const PRIMARY_COLOR = "24.6 95%";
const COLORS = Array.from({ length: 6 }, (_, i) => {
  const brightness = 40 + i * 8; // Brightness levels from 40% to 94%
  return `hsl(${PRIMARY_COLOR} ${brightness}%)`;
});

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
  spendings: {
    label: "Spendings",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function OrderItem({
  imgSrc,
  imgAlt,
  title,
  description,
}: {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={imgSrc}
        width={32}
        height={32}
        alt={imgAlt}
        className="rounded-lg"
      />
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
}

function CustomerFeedback({
  avatarSrc,
  avatarFallback,
  name,
  rating,
  feedback,
}: {
  avatarSrc: string;
  avatarFallback: string;
  name: string;
  rating: number;
  feedback: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="border w-8 h-8">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <div className="font-medium text-sm">{name}</div>
        <div className="flex items-center gap-1 text-xs font-semibold">
          <div className="flex items-center gap-px">
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={i} className="w-2.5 h-2.5 fill-primary" />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <StarIcon key={i} className="w-2.5 h-2.5" />
            ))}
          </div>
        </div>
        <div className="text-xs">{feedback}</div>
      </div>
    </div>
  );
}

export function CMSDashboard() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("orders");

  const total = React.useMemo(
    () => ({
      orders: orderData.reduce((acc, curr) => acc + curr.orders, 0),
      spendings: spendingData.reduce((acc, curr) => acc + curr.spendings, 0),
    }),
    [],
  );

  const { orders } = useOrderStore();
  const [topMealsData, setTopMealsData] = React.useState<any>([]);

  React.useEffect(() => {
    const itemCounts: Record<string, { name: string; orders: number }> = {};

    orders.forEach((order) => {
      order.items.forEach((item: any) => {
        item.items.forEach((item: any) => {
          if (itemCounts[item.name]) {
            itemCounts[item.name].orders += item.quantity;
          } else {
            itemCounts[item.name] = { name: item.name, orders: item.quantity };
          }
        });
      });
    });

    const curatedData = Object.values(itemCounts);
    curatedData.sort((a, b) => b.orders - a.orders);
    setTopMealsData(curatedData);
  }, [orders]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid flex-1 items-start gap-5 p-2 sm:px-3 sm:py-0 md:gap-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Spendings per Day</CardTitle>
              <CardDescription className="text-xs">
                Track the daily spending for your food ordering app in shekels.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <ChartContainer config={chartConfig}>
                  <LineChart data={spendingData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelKey="date"
                          nameKey="spendings"
                          indicator="dashed"
                        />
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="spendings"
                      stroke="hsl(var(--primary))"
                    />
                  </LineChart>
                </ChartContainer>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="sm:col-span-1">
            <CardHeader className="top-0">
              <CardTitle className="text-sm">Latest's Orders</CardTitle>
              <CardDescription className="text-xs">
                Check out the latest orders from your customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-64 overflow-auto">
              <div
                className="flex flex-col items-center justify-center gap-2 py-2"
                dir="rtl"
              >
                {orders.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {orders.map((order) =>
                      order.items.map((restaurantItem: any) =>
                        restaurantItem.items.map((item: any, index: number) => (
                          <OrderItem
                            key={index}
                            imgSrc={item.imageUrl || "/placeholder.svg"}
                            imgAlt={item.name}
                            title={`${item.name} - ${order.user.name}`}
                            description={
                              item.description || "No description available"
                            }
                          />
                        )),
                      ),
                    )}
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    No orders placed today.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Top Selling Items</CardTitle>
              <CardDescription className="text-xs">
                The most popular menu items ordered by your customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={topMealsData}
                      dataKey="orders"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={140}
                      innerRadius={120}
                      label
                    >
                      <Label position="center" className="text-xl">
                        {`${orders.length} Orders`}
                      </Label>
                      {topMealsData.map((entry: any, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="flex flex-row items-center justify-between bg-background rounded-lg p-2 border-[1px] gap-1">
                              <div
                                className="h-3 w-3 rounded"
                                style={{ background: payload[0].payload.fill }}
                              />
                              <p className="-mt-[2px]">{`${payload[0].name}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ChartContainer>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Order Trends</CardTitle>
              <CardDescription className="text-xs">
                Analyze the order trends for your food ordering app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ChartContainer config={chartConfig}>
                  <BarChart data={orderData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      padding={{ left: 4 }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          labelKey="date"
                          nameKey="orders"
                          indicator="line"
                        />
                      }
                    />
                    <Bar
                      dataKey="orders"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
