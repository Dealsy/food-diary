import { preloadQuery } from "convex/nextjs";
import MealsListClient from "@/components/MealsListClient";
import { api } from "../../../../convex/_generated/api";

export default async function MealsPanel({ date }: { date: string }) {
  const preloadedMeals = await preloadQuery(api.meals.getMealsByDate, { date });
  return <MealsListClient date={date} preloadedMeals={preloadedMeals} />;
}
