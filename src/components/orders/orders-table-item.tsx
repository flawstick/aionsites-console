import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { IOrder as Order } from "@/lib/types";
import {
  ClockIcon,
  CircleCheckIcon,
  CheckIcon,
  CircleXIcon,
} from "lucide-react";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IconBxShekel, TruckIcon } from "@/components/icons";
import { formatDate } from "@/lib/utils";

interface OrderListItemProps {
  order: Order;
  onHover: (order: Order) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <ClockIcon className="w-3 h-3 mr-1" />;
    case "confirmed":
      return <CircleCheckIcon className="w-3 h-3 mr-1" />;
    case "done":
      return <CheckIcon className="w-3 h-3 mr-1" />;
    case "cancelled":
      return <CircleXIcon className="w-3 h-3 mr-1" />;
    case "delivered":
      return <TruckIcon className="w-3 h-3 mr-1" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "confirmed":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "done":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "delivered":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    default:
      return null;
  }
};

export function OrdersTableItem({ order, onHover }: OrderListItemProps) {
  return (
    <TableRow onMouseEnter={() => onHover(order)}>
      <TableCell>
        <OrderUserHoverCard order={order} />
        <div className="text-sm text-muted-foreground">{order.companyName}</div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="flex items-center gap-1">
          <Badge
            className={`flex flex-row items-center justify-center duration-300 ${getStatusColor(
              order.status,
            )}`}
          >
            {getStatusIcon(order.status)}
            <span className="text-xs">{order.status}</span>
          </Badge>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="text-sm ">{formatDate(order.createdAt)}</div>
      </TableCell>
      <TableCell className="flex flex-row justify-end items-center">
        <IconBxShekel className="w-4 h-4 " />
        {order.totalPrice - 2}
      </TableCell>
    </TableRow>
  );
}

interface OrderUserHoverCardProps {
  order: Order;
}

export function OrderUserHoverCard({ order }: OrderUserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="text-sm font-medium cursor-pointer hover:underline underline-offset-4">
          {order.customerName}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-70">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={order.customerProfile?.profilePicture} />
            <AvatarFallback>{order.customerName[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{order.customerName}</h4>
            <p className="text-sm">{order.customerProfile?.bio}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {formatDate(order.customerProfile?.joinedAt)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
