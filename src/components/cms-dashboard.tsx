import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export function CMSDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="grid flex-1 items-start gap-5 p-2 sm:px-3 sm:py-0 md:gap-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="sm:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Orders per Day</CardTitle>
              <CardDescription className="text-xs">
                Track the daily order volume for your food ordering app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Desktop" stroke="#2563eb" />
                  <Line type="monotone" dataKey="Mobile" stroke="#e11d48" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="sm:col-span-1">
            <CardHeader className="sticky top-0 bg-background z-10">
              <CardTitle className="text-sm">Today's Orders</CardTitle>
              <CardDescription className="text-xs">
                The total number of orders placed today.
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-64 overflow-auto">
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <div className="text-2xl font-bold">142</div>
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    width={32}
                    height={32}
                    alt="Burger"
                    className="rounded-lg"
                  />
                  <div>
                    <div className="font-medium text-sm">Gourmet Burger</div>
                    <div className="text-xs text-muted-foreground">
                      Beef patty, cheese, lettuce, tomato
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    width={32}
                    height={32}
                    alt="Pizza"
                    className="rounded-lg"
                  />
                  <div>
                    <div className="font-medium text-sm">Pepperoni Pizza</div>
                    <div className="text-xs text-muted-foreground">
                      Tomato sauce, mozzarella, pepperoni
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    width={32}
                    height={32}
                    alt="Salad"
                    className="rounded-lg"
                  />
                  <div>
                    <div className="font-medium text-sm">Caesar Salad</div>
                    <div className="text-xs text-muted-foreground">
                      Romaine, croutons, parmesan, caesar dressing
                    </div>
                  </div>
                </div>
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
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="Burger"
                      className="rounded-lg"
                    />
                    <div>
                      <div className="font-medium text-sm">Gourmet Burger</div>
                      <div className="text-xs text-muted-foreground">
                        Beef patty, cheese, lettuce, tomato
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-sm">142 orders</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="Pizza"
                      className="rounded-lg"
                    />
                    <div>
                      <div className="font-medium text-sm">Pepperoni Pizza</div>
                      <div className="text-xs text-muted-foreground">
                        Tomato sauce, mozzarella, pepperoni
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-sm">118 orders</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="Salad"
                      className="rounded-lg"
                    />
                    <div>
                      <div className="font-medium text-sm">Caesar Salad</div>
                      <div className="text-xs text-muted-foreground">
                        Romaine, croutons, parmesan, caesar dressing
                      </div>
                    </div>
                  </div>
                  <div className="font-medium text-sm">92 orders</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Customer Feedback</CardTitle>
              <CardDescription className="text-xs">
                What your customers are saying about your food ordering app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-start gap-2">
                  <Avatar className="border w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium text-sm">Sarah</div>
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <div className="flex items-center gap-px">
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <div className="text-xs">
                      The food ordering app is so easy to use and the delivery
                      is always fast. I love the wide selection of menu items.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Avatar className="border w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium text-sm">Michael</div>
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <div className="flex items-center gap-px">
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5 fill-primary" />
                        <StarIcon className="w-2.5 h-2.5" />
                      </div>
                    </div>
                    <div className="text-xs">
                      I've been using this food ordering app for months and it's
                      been a game-changer for my business. The customer support
                      is also top-notch.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Order Trends</CardTitle>
              <CardDescription className="text-xs">
                Analyze the order trends for your food ordering app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const barChartData = [
  { name: "Jan", count: 111 },
  { name: "Feb", count: 157 },
  { name: "Mar", count: 129 },
  { name: "Apr", count: 150 },
  { name: "May", count: 119 },
  { name: "Jun", count: 72 },
];

const lineChartData = [
  { name: "Jan", Desktop: 43, Mobile: 60 },
  { name: "Feb", Desktop: 137, Mobile: 48 },
  { name: "Mar", Desktop: 61, Mobile: 177 },
  { name: "Apr", Desktop: 145, Mobile: 78 },
  { name: "May", Desktop: 26, Mobile: 96 },
  { name: "Jun", Desktop: 154, Mobile: 204 },
];

function StarIcon(props: any) {
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
