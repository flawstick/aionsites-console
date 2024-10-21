import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { IconBxShekel } from "../icons";

interface OrderRegulationProps {
  maxMealsPerOrder: string;
  setMaxMealsPerOrder: (value: string) => void;
  maxSpendingBudget: string;
  setMaxSpendingBudget: (value: string) => void;
  maxOrdersPerDay: string;
  setMaxOrdersPerDay: (value: string) => void;
  activeSection: string;
}

export function OrderRegulation({
  maxMealsPerOrder,
  setMaxMealsPerOrder,
  maxSpendingBudget,
  setMaxSpendingBudget,
  maxOrdersPerDay,
  setMaxOrdersPerDay,
  activeSection,
}: OrderRegulationProps) {
  return (
    <Card
      id="order-regulation"
      className={activeSection !== "Order Regulation" ? "hidden" : ""}
    >
      <CardHeader>
        <CardTitle>Order Regulation</CardTitle>
        <CardDescription>
          Set restrictions on employee meal orders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="meals-per-order">Maximum Meals Per Order</Label>
          <Input
            id="meals-per-order"
            type="number"
            min="1"
            placeholder="e.g., 3"
            value={maxMealsPerOrder}
            onChange={(e) => setMaxMealsPerOrder(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="max-spending">
            Maximum Spending Budget (per day)
          </Label>
          <div className="flex items-center space-x-2">
            <IconBxShekel className="w-5 h-5 text-foreground/80" />
            <Input
              id="max-spending"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g., 50.00"
              value={maxSpendingBudget}
              onChange={(e) => setMaxSpendingBudget(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="orders-per-day">Maximum Orders Per Day</Label>
          <Input
            id="orders-per-day"
            type="number"
            min="1"
            placeholder="e.g., 2"
            value={maxOrdersPerDay}
            onChange={(e) => setMaxOrdersPerDay(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
