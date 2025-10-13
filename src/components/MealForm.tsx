"use client";

import { useId, useRef, useState } from "react";
import TimeSelect from "@/components/TimeSelect";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MEAL_TYPES } from "@/lib/constants";
import { Button } from "./ui/button";

type Props = {
  date: string;
  action: (formData: FormData) => void;
  isPending?: boolean;
};

export default function MealForm({ date, action, isPending }: Props) {
  const baseId = useId();
  const counter = useRef(0);
  const makeKey = `${baseId}-${counter.current++}`;

  type Part = { id: string; value: string };
  const [parts, setParts] = useState<Part[]>([{ id: makeKey, value: "" }]);

  const addPart = () =>
    setParts((p) => (p.length >= 20 ? p : [...p, { id: makeKey, value: "" }]));

  const updatePart = (id: string, v: string) =>
    setParts((p) => p.map((x) => (x.id === id ? { ...x, value: v } : x)));

  const removePart = (id: string) =>
    setParts((p) => p.filter((x) => x.id !== id));

  return (
    <form className="grid gap-2" action={action}>
      <input type="hidden" name="date" value={date} />

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Meal name</FieldLabel>
          <Input id="name" name="name" placeholder="e.g., Chicken salad" />
        </Field>
        <Field>
          <FieldLabel>Meal parts</FieldLabel>
          <div className="grid gap-2">
            {parts.map((part) => (
              <div key={part.id} className="flex items-center gap-2">
                <Input
                  name="parts"
                  value={part.value}
                  onChange={(e) => updatePart(part.id, e.target.value)}
                  placeholder={"e.g., Salad"}
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
          <FieldLabel htmlFor="mealType">Meal type</FieldLabel>
          <Select name="mealType">
            <SelectTrigger id="mealType">
              <SelectValue placeholder="Select type (optional)" />
            </SelectTrigger>
            <SelectContent>
              {MEAL_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="calories">Calories</FieldLabel>
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

      <div className="flex items-center gap-2">
        <Button
          type="submit"
          className="rounded-md border px-3 py-2"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Add meal"}
        </Button>
      </div>
    </form>
  );
}
