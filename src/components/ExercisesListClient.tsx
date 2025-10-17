"use client";

import type { Preloaded } from "convex/react";
import { usePreloadedQuery } from "convex/react";
import { Dumbbell } from "lucide-react";
import ExerciseDialog from "@/components/ExerciseDialog";
import ExerciseRow from "@/components/ExerciseRow";
import { EmptyState } from "@/components/emptyState";
import type { api } from "../../convex/_generated/api";

type Props = {
  date: string;
  preloadedExercises: Preloaded<typeof api.exercises.getExercisesByDate>;
};

export default function ExercisesListClient({
  date,
  preloadedExercises,
}: Props) {
  const exercises = usePreloadedQuery(preloadedExercises);
  type Exercise = {
    _id: string;
    name: string;
    calories?: number;
    time?: string;
    notes?: string;
    photos?: string[];
    parts?: string[];
  };

  return (
    <section className="grid gap-3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Exercises</h2>
        <ExerciseDialog date={date} />
      </div>
      {exercises.length === 0 ? (
        <EmptyState
          title="No exercises yet"
          description="You haven't added any exercises yet. Add one to get started."
          icon={<Dumbbell />}
          cta={<ExerciseDialog date={date} />}
        />
      ) : (
        exercises.map((ex: Exercise) => (
          <ExerciseRow key={ex._id} exercise={{ ...ex, date }} />
        ))
      )}
    </section>
  );
}
