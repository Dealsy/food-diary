"use client";

import { useActionState } from "react";
import MealEditDialog from "@/components/MealEditDialog";
import { Button } from "@/components/ui/button";
import { deleteMeal } from "@/server/meal-actions";

type Meal = {
  _id: string;
  name: string;
  calories?: number;
  mealType?: string;
  time?: string;
  notes?: string;
  photos?: string[];
  date: string;
};

type Props = { meal: Meal };

export default function MealRow({ meal }: Props) {
  const [_, removeAction, isPending] = useActionState(deleteMeal, null);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">{meal.name}</h3>
        {typeof meal.calories === "number" && (
          <span className="text-sm text-muted-foreground">
            {meal.calories} kcal
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <form action={removeAction}>
          <input type="hidden" name="id" value={meal._id} />
          <input type="hidden" name="date" value={meal.date} />
          <Button variant="destructive" size="sm" disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </form>
        <MealEditDialog meal={meal} />
      </div>
    </div>
  );
}
