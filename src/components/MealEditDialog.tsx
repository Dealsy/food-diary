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
import { editMeal } from "@/server/meal-actions";

type Props = {
  meal: {
    _id: string;
    date: string;
    name: string;
    calories?: number;
    mealType?: string;
    time?: string;
    notes?: string;
  };
};

export default function MealEditDialog({ meal }: Props) {
  const [open, setOpen] = useState(false);
  const [_, action, isPending] = useActionState(editMeal, null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Edit Meal</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4" action={action}>
          <input type="hidden" name="id" value={meal._id} />
          <input type="hidden" name="date" value={meal.date} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="edit-name">Meal name</FieldLabel>
              <Input id="edit-name" name="name" defaultValue={meal.name} />
            </Field>
            <Field>
              <FieldLabel htmlFor="edit-mealType">Meal type</FieldLabel>
              <Select name="mealType" defaultValue={meal.mealType ?? ""}>
                <SelectTrigger id="edit-mealType">
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
              <FieldLabel htmlFor="edit-calories">Calories</FieldLabel>
              <Input
                id="edit-calories"
                name="calories"
                type="number"
                min={0}
                defaultValue={meal.calories}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="edit-time">Time</FieldLabel>
              <Input
                id="edit-time"
                name="time"
                type="time"
                defaultValue={meal.time}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="edit-notes">Notes</FieldLabel>
              <Textarea
                id="edit-notes"
                name="notes"
                rows={3}
                defaultValue={meal.notes}
              />
            </Field>
          </FieldGroup>
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isPending}>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
