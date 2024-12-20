import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "../ui/sidebar";

interface AnalyticsProps {
  analytics: {
    thisMonthTotal: number;
    monthChangePercentage: number;
    thisWeekTotal: number;
    weekChangePercentage: number;
  } | null;
}

const OrderAnalytics: React.FC<AnalyticsProps> = ({ analytics }) => {
  const { open } = useSidebar();
  if (!analytics) {
    return (
      <>
        <Skeleton className="rounded-xl" />
        <Skeleton className="rounded-xl" />
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">
            ₪{analytics.thisWeekTotal.toFixed(open ? 0 : 2)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {analytics.weekChangePercentage > 0
              ? `+${analytics.weekChangePercentage.toFixed(2)}%`
              : `${analytics.weekChangePercentage.toFixed(2)}%`}{" "}
            from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={analytics.weekChangePercentage}
            aria-label={`${analytics.weekChangePercentage.toFixed(
              2,
            )}% increase`}
          />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">
            ₪{analytics.thisMonthTotal.toFixed(open ? 0 : 2)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {analytics.monthChangePercentage > 0
              ? `+${analytics.monthChangePercentage.toFixed(2)}%`
              : `${analytics.monthChangePercentage.toFixed(2)}%`}{" "}
            from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            value={analytics.monthChangePercentage}
            aria-label={`${analytics.monthChangePercentage.toFixed(
              2,
            )}% increase`}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default OrderAnalytics;
