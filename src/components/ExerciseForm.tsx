"use client";

import { useId, useRef, useState } from "react";
import TimeSelect from "@/components/TimeSelect";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";

type Props = {
  date: string;
  action: (formData: FormData) => void;
  isPending?: boolean;
  onCancel?: () => void;
  id?: string;
  hideActions?: boolean;
};

export default function ExerciseForm({
  date,
  action,
  isPending,
  onCancel,
  id,
  hideActions,
}: Props) {
  const baseId = useId();
  const counter = useRef(0);
  const genKey = () => `${baseId}-${counter.current++}`;

  type Part = { id: string; value: string };
  const [parts, setParts] = useState<Part[]>([{ id: genKey(), value: "" }]);

  const addPart = () =>
    setParts((p) => (p.length >= 20 ? p : [...p, { id: genKey(), value: "" }]));

  const updatePart = (id: string, v: string) =>
    setParts((p) => p.map((x) => (x.id === id ? { ...x, value: v } : x)));

  const removePart = (id: string) =>
    setParts((p) => p.filter((x) => x.id !== id));

  return (
    <form id={id} className="grid gap-2" action={action}>
      <input type="hidden" name="date" value={date} />

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Exercise name</FieldLabel>
          <Input id="name" name="name" placeholder="e.g., Running" />
        </Field>
        <Field>
          <FieldLabel>Parts</FieldLabel>
          <div className="grid gap-2">
            {parts.map((part) => (
              <div key={part.id} className="flex items-center gap-2">
                <Input
                  name="parts"
                  value={part.value}
                  onChange={(e) => updatePart(part.id, e.target.value)}
                  placeholder={"e.g., Warm-up"}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removePart(part.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addPart}
            >
              Add part
            </Button>
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="calories">Calories burned</FieldLabel>
          <Input id="calories" name="calories" type="number" min={0} />
        </Field>
        <Field>
          <FieldLabel htmlFor="time">Time</FieldLabel>
          <TimeSelect id="time" name="time" />
        </Field>
        <Field>
          <FieldLabel htmlFor="notes">Notes</FieldLabel>
          <Textarea id="notes" name="notes" rows={3} />
        </Field>
      </FieldGroup>

      {hideActions ? null : (
        <div className="sticky bottom-0 left-0 right-0 -mx-6 -mb-6 flex items-center gap-2 border-t bg-white px-6 py-4">
          <Button
            type="submit"
            className="rounded-md border px-3 py-2"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Add exercise"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      )}
    </form>
  );
}
