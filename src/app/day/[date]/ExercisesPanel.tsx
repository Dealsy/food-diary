import { preloadQuery } from "convex/nextjs";
import ExercisesListClient from "@/components/ExercisesListClient";
import { api } from "../../../../convex/_generated/api";

export default async function ExercisesPanel({ date }: { date: string }) {
  const preloadedExercises = await preloadQuery(
    api.exercises.getExercisesByDate,
    { date },
  );
  return (
    <ExercisesListClient date={date} preloadedExercises={preloadedExercises} />
  );
}
