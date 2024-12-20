"use client";

import * as React from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DateRange } from "react-day-picker";
import { usePayrollData } from "@/lib/hooks/usePayrollData";
import { useParams } from "next/navigation";

// Interfaces matching the expected payroll data structure
interface WorkerData {
  id: string;
  name: string;
  workerId: string;
  orders: {
    id: string | number;
    date: string;
    total: number;
    discountedTotal: number;
  }[];
}

interface UserOrdersTableProps {
  dateRange: DateRange | undefined;
}

export function UserOrdersTable({ dateRange }: UserOrdersTableProps) {
  const [expandedWorkers, setExpandedWorkers] = useState<string[]>([]);

  const toggleWorkerExpansion = (workerId: string) => {
    setExpandedWorkers((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId],
    );
  };

  const { team } = useParams();
  const { data: payrollData, totalPayroll } = usePayrollData(
    team as string,
    dateRange,
  );

  // Transform the hashmap (payrollData) into the workers array
  const workers: WorkerData[] = React.useMemo(() => payrollData, [payrollData]);

  // Filter workers by the selected date range
  const filteredWorkers = workers
    .map((worker) => ({
      ...worker,
      orders: worker.orders.filter((order) => {
        const orderDate = new Date(order.date);
        return (
          (!dateRange?.from || orderDate >= dateRange.from) &&
          (!dateRange?.to || orderDate <= dateRange.to)
        );
      }),
    }))
    .filter((worker) => worker.orders.length > 0);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Worker ID</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Discounted Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWorkers.map((worker) => (
            <React.Fragment key={worker.id}>
              <TableRow>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWorkerExpansion(worker.id)}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandedWorkers.includes(worker.id)
                          ? "transform rotate-180"
                          : ""
                      }`}
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>{worker.workerId}</TableCell>
                <TableCell>{worker.orders.length}</TableCell>
                <TableCell>
                  ₪
                  {worker.orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </TableCell>
                <TableCell>
                  ₪
                  {worker.orders
                    .reduce((sum, order) => sum + order.discountedTotal, 0)
                    .toFixed(2)}
                </TableCell>
              </TableRow>
              {expandedWorkers.includes(worker.id) && (
                <TableRow key={`${worker.id}-orders`}>
                  <TableCell colSpan={6}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Discounted Total</TableHead>
                          <TableHead className="w-[100px]">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {worker.orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>
                              {new Date(order.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>₪{order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              ₪{order.discountedTotal.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        window.open(
                                          `/orders/${order.id}`,
                                          "_blank",
                                        )
                                      }
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">
                                        Go to order {order.id}
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Go to order</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
          {/* Total Payroll Row */}
          <TableRow>
            <TableCell colSpan={6} className="text-right font-bold">
              Total Payroll: ₪{totalPayroll.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
