"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createExercise } from "@/server/exercise-actions";
import ExerciseForm from "./ExerciseForm";

type Props = { date: string };

export default function ExerciseDialog({ date }: Props) {
  const [_, formAction, isPending] = useActionState(createExercise, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="rounded-md border px-3 py-2">
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>
        <div className="-mx-6">
          <div className="max-h-[60vh] overflow-y-auto px-6">
            <ExerciseForm
              id="exercise-create-form"
              date={date}
              action={formAction}
              isPending={isPending}
              hideActions
            />
          </div>
        </div>
        <DialogFooter className="-mx-6 -mb-6 flex items-center gap-2 border-t bg-white px-6 py-4">
          <Button
            type="submit"
            form="exercise-create-form"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Add exercise"}
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
