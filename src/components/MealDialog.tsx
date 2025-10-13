"use client";

import { useActionState, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createMeal } from "@/server/meal-actions";
import MealForm from "./MealForm";
import { Button } from "./ui/button";

type Props = {
  date: string;
};

export default function MealDialog({ date }: Props) {
  const [open, setOpen] = useState(false);
  const [result, formAction, isPending] = useActionState(createMeal, null);

  const computedOpen = open && !(result as any)?.ok;

  return (
    <Dialog open={computedOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="rounded-md border px-3 py-2">
          Add Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
        </DialogHeader>
        <MealForm date={date} action={formAction} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
