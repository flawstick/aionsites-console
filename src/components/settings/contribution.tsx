import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MealContributionProps {
  mealContribution: number;
  setMealContribution: (value: number) => void;
  activeSection: string;
}

export function MealContribution({
  mealContribution,
  setMealContribution,
  activeSection,
}: MealContributionProps) {
  return (
    <Card
      id="meal-contribution"
      className={activeSection !== "Meal Contribution" ? "hidden" : ""}
    >
      <CardHeader>
        <CardTitle>Meal Contribution Program</CardTitle>
        <CardDescription>
          Set the percentage your company contributes to employee meals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Company Contribution Percentage</Label>
          <div className="flex items-center space-x-4">
            <Slider
              value={[mealContribution]}
              onValueChange={(value: any) => setMealContribution(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="font-semibold text-lg w-12 text-right">
              {mealContribution}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
