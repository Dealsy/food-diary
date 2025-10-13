"use client";

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
  return (
    <form className="grid gap-4" action={action}>
      <input type="hidden" name="date" value={date} />

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Meal name</FieldLabel>
          <Input id="name" name="name" placeholder="e.g., Chicken salad" />
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
          <Input id="time" name="time" type="time" />
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
