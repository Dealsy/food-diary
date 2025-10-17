"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createExercise } from "@/server/exercise-actions";
import ExerciseForm from "./ExerciseForm";

type Props = { date: string };

export default function ExerciseDialog({ date }: Props) {
  const [open, setOpen] = useState(false);
  const [result, formAction, isPending] = useActionState(createExercise, null);
  const computedOpen = open && !(result as any)?.ok;

  return (
    <Dialog open={computedOpen} onOpenChange={setOpen}>
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
              onCancel={() => setOpen(false)}
              hideActions
            />
          </div>
        </div>
        <div className="-mx-6 -mb-6 flex items-center gap-2 border-t bg-white px-6 py-4">
          <Button
            type="submit"
            form="exercise-create-form"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Add exercise"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
