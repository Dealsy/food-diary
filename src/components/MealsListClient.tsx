"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { Grape } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import MealDialog from "@/components/MealDialog";
import MealRow from "@/components/MealRow";
import type { api } from "../../convex/_generated/api";

type Props = {
  date: string;
  preloadedMeals: Preloaded<typeof api.meals.getMealsByDate>;
};

export default function MealsListClient({ date, preloadedMeals }: Props) {
  const meals = usePreloadedQuery(preloadedMeals);
  type Meal = {
    _id: string;
    name: string;
    calories?: number;
    mealType?: string;
    time?: string;
    notes?: string;
    photos?: string[];
    parts?: string[];
  };

  return (
    <section className="grid gap-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Meals</h2>
        <MealDialog date={date} />
      </div>
      {meals.length === 0 ? (
        <EmptyState
          title="No meals yet"
          description="You haven't added any meals yet. Add one to get started."
          icon={<Grape />}
          cta={<MealDialog date={date} />}
        />
      ) : (
        meals.map((meal: Meal) => (
          <MealRow key={meal._id} meal={{ ...meal, date }} />
        ))
      )}
    </section>
  );
}
