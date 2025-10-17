"use client";

import { useActionState } from "react";
import ExerciseEditDialog from "@/components/ExerciseEditDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteExercise } from "@/server/exercise-actions";

type Exercise = {
  _id: string;
  name: string;
  calories?: number;
  time?: string;
  notes?: string;
  date: string;
  parts?: string[];
};

export default function ExerciseRow({ exercise }: { exercise: Exercise }) {
  const [_, removeAction, isPending] = useActionState(deleteExercise, null);

  const hasParts = Boolean(exercise.parts && exercise.parts.length > 0);

  return (
    <Card className="bg-white">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">{exercise.name}</CardTitle>
        <CardDescription className="flex gap-3 text-sm">
          {exercise.time && <span>{exercise.time}</span>}
        </CardDescription>
        <CardAction>
          {typeof exercise.calories === "number" ? (
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {exercise.calories} kcal
            </span>
          ) : null}
        </CardAction>
      </CardHeader>

      <CardContent>
        {hasParts ? (
          <div className="mt-3">
            <div className="mb-1 text-lg font-bold text-muted-foreground">
              Workouts
            </div>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {exercise.parts?.map((part, index) => (
                <li key={`${exercise._id}-part-${index}`}>{part}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {exercise.notes && (
          <>
            <div className="mb-1 text-lg font-bold text-muted-foreground mt-5">
              Notes
            </div>
            <div className="bg-gray-100 p-3 rounded-md border border-gray-300 inset-shadow-sm inset-shadow-gray-500 ">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {exercise.notes}
              </p>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="border-t justify-end gap-2">
        <form action={removeAction}>
          <input type="hidden" name="id" value={exercise._id} />
          <input type="hidden" name="date" value={exercise.date} />
          <Button variant="destructive" size="sm" disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </form>
        <ExerciseEditDialog exercise={exercise} />
      </CardFooter>
    </Card>
  );
}
