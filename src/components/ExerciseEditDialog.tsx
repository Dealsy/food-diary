"use client";

import { useActionState, useId, useRef, useState } from "react";
import PhotoUploader from "@/components/PhotoUploader";
import TimeSelect from "@/components/TimeSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editExercise } from "@/server/exercise-actions";

type Props = {
  exercise: {
    _id: string;
    date: string;
    name: string;
    calories?: number;
    time?: string;
    notes?: string;
    parts?: string[];
    photos?: string[];
  };
};

export default function ExerciseEditDialog({ exercise }: Props) {
  const [open, setOpen] = useState(false);
  const [_, action, isPending] = useActionState(editExercise, null);
  const baseId = useId();
  const counter = useRef(0);
  const genKey = () => `${baseId}-${counter.current++}`;

  type Part = { id: string; value: string };
  const [parts, setParts] = useState<Part[]>(
    (exercise.parts ?? [""]).map((v) => ({ id: genKey(), value: v })),
  );
  const [photoUrls, setPhotoUrls] = useState<string[]>(exercise.photos ?? []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Edit Exercise</DialogTitle>
        </DialogHeader>
        <div className="-mx-6">
          <div className="max-h-[60vh] overflow-y-auto px-6">
            <form
              id="exercise-edit-form"
              className="grid gap-4"
              action={action}
            >
              <input type="hidden" name="id" value={exercise._id} />
              <input type="hidden" name="date" value={exercise.date} />
              <input type="hidden" name="photos" value={photoUrls.join(",")} />
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="edit-ex-name">Exercise name</FieldLabel>
                  <Input
                    id="edit-ex-name"
                    name="name"
                    defaultValue={exercise.name}
                  />
                </Field>
                <Field>
                  <FieldLabel>Parts</FieldLabel>
                  <div className="grid gap-2">
                    {parts.map((part) => (
                      <div key={part.id} className="flex items-center gap-2">
                        <Input
                          name="parts"
                          defaultValue={part.value}
                          onChange={(e) =>
                            setParts((p) =>
                              p.map((x) =>
                                x.id === part.id
                                  ? { ...x, value: e.target.value }
                                  : x,
                              ),
                            )
                          }
                          placeholder={"e.g., Warm-up"}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setParts((p) => p.filter((x) => x.id !== part.id))
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setParts((p) =>
                          p.length >= 20
                            ? p
                            : [...p, { id: genKey(), value: "" }],
                        )
                      }
                    >
                      Add part
                    </Button>
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-ex-calories">
                    Calories burned
                  </FieldLabel>
                  <Input
                    id="edit-ex-calories"
                    name="calories"
                    type="number"
                    min={0}
                    defaultValue={exercise.calories}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-ex-time">Time</FieldLabel>
                  <TimeSelect
                    id="edit-ex-time"
                    name="time"
                    defaultValue={exercise.time}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="edit-ex-notes">Notes</FieldLabel>
                  <Textarea
                    id="edit-ex-notes"
                    name="notes"
                    rows={3}
                    defaultValue={exercise.notes}
                  />
                </Field>
                <Field>
                  <FieldLabel>Photos</FieldLabel>
                  <PhotoUploader onChange={setPhotoUrls} value={photoUrls} />
                </Field>
              </FieldGroup>
            </form>
          </div>
        </div>
        <div className="-mx-6 -mb-6 flex items-center gap-2 border-t bg-white px-6 py-4">
          <Button type="submit" form="exercise-edit-form" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
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
