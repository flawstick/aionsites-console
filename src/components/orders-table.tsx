"use client";

import React, { useState, useEffect } from "react";
import useOrderStore, { Order } from "@/lib/store/useOrderStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Truck,
  MoreVertical,
  Copy,
  CalendarDays,
  FileText,
  ChevronDown,
  FileSpreadsheet,
} from "lucide-react";
import { RefreshIcon } from "@/components/icons";
import { OrderListItem } from "@/components/orders-list-item";
import { useCompanyStore } from "@/lib/store/useCompanyStore";
import { formatDate, exportAsDOCX, exportAsXLSX } from "@/lib/utils";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

export function OrdersTable() {
  const { orders, fetchOrders } = useOrderStore();
  const { companies } = useCompanyStore();
  const [hoveredOrder, setHoveredOrder] = useState<Order | null>(null);
  const [isSpinning, setSpinning] = useState(false); // Animatoin staet

  // Date Range Picker (last twenty days)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });

  const refreshOrders = async () => {
    setSpinning(true);
    fetchOrders();
    setTimeout(() => {
      setSpinning(false);
    }, 1000);
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, companies]);

  return (
    <main className="grid flex-1 mt-4 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="lg:col-span-2">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="done">Done</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <CalendarDateRangePicker setDate={setDate} date={date} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="h-7 gap-1 text-sm">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                    <ChevronDown className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      exportAsXLSX(orders, date?.from as Date, date?.to as Date)
                    }
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Excel Spreadsheet
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      exportAsDOCX(orders, date?.from as Date, date?.to as Date)
                    }
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Word Document
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <TabsContent value="live">
            <Card>
              <CardHeader className="px-7">
                <OrderTableHeader
                  onRefresh={refreshOrders}
                  isSpinning={isSpinning}
                />
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length > 0
                      ? orders
                          .filter(
                            (order: any) =>
                              order?.status === "confirmed" ||
                              order?.status === "pending",
                          )
                          .map((order: any) => (
                            <OrderListItem
                              key={order?._id}
                              order={order}
                              onHover={setHoveredOrder}
                            />
                          ))
                      : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="done">
            <Card>
              <CardHeader className="px-7">
                <OrderTableHeader
                  onRefresh={refreshOrders}
                  isSpinning={isSpinning}
                />
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length > 0
                      ? orders
                          .filter((order: any) => order?.status === "done")
                          .map((order: any) => (
                            <OrderListItem
                              key={order._id}
                              order={order}
                              onHover={setHoveredOrder}
                            />
                          ))
                      : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="all">
            <Card>
              <CardHeader className="px-7">
                <OrderTableHeader
                  onRefresh={refreshOrders}
                  isSpinning={isSpinning}
                />
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length > 0
                      ? orders.map((order: any) => (
                          <OrderListItem
                            key={order._id}
                            order={order}
                            onHover={setHoveredOrder}
                          />
                        ))
                      : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <OrderCard hoveredOrder={hoveredOrder} />
      </div>
    </main>
  );
}

interface OrderTableHeaderProps {
  onRefresh: () => void;
  isSpinning: boolean;
}

const OrderTableHeader: React.FC<OrderTableHeaderProps> = ({
  onRefresh,
  isSpinning,
}) => {
  return (
    <CardTitle className="flex flex-row items-center justify-between">
      <span className="text-xl">Orders</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="icon"
              variant="ghost"
              onClick={onRefresh}
              className={`${isSpinning ? "animate-spin" : ""}`}
            >
              <RefreshIcon className="w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Refresh</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardTitle>
  );
};

const OrderCard: React.FC<{ hoveredOrder: any }> = ({ hoveredOrder }) => {
  const { selectedCompany } = useCompanyStore();

  return (
    <Card className="fixed overflow-hidden mr-5 ">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            <span className="truncate w-[25vh]">Order {hoveredOrder?._id}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() =>
                      navigator.clipboard.writeText(hoveredOrder?._id)
                    }
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Order ID</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            {formatDate(hoveredOrder?.createdAt)}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {hoveredOrder?.items.map((item: any, index: number) => (
              <li key={index} className="flex items-center justify-between">
                <span className="flex flex-row items-center justify-center">
                  <img
                    src={item?.items[0]?.imageUrl}
                    alt={item.items[0].name}
                    className="w-12 h-12 rounded-sm mx-2"
                  />
                  {item.restaurant.name} - {item.items[0].name} x{" "}
                  {item.items[0].quantity}
                </span>
                <span>₪{item.items[0].price}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₪{hoveredOrder?.totalPrice}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>₪0.00</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>₪0.00</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>₪{hoveredOrder?.totalPrice}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{selectedCompany?.address}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <OrderUserHoverCard order={hoveredOrder} />
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Company</dt>
              <dd>{selectedCompany?.name}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          <time dateTime={formatDate(hoveredOrder?.updatedAt)}>
            {formatDate(hoveredOrder?.updatedAt)}
          </time>
        </div>
      </CardFooter>
      {!hoveredOrder && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 backdrop-blur-sm">
          <span className="text-muted-foreground text-lg">
            Hover over an order to render
          </span>
        </div>
      )}
    </Card>
  );
};

export function OrderUserHoverCard({ order }: any) {
  if (!order) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="text-sm font-medium cursor-pointer hover:underline underline-offset-4">
          {order.user.name}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-70">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={order.user?.profile?.profilePicture} />
            <AvatarFallback>{order.user?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{order.user.name}</h4>
            <p className="text-sm">{order.user?.profile?.bio}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {formatDate(order.user?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
