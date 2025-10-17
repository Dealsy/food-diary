"use client";

import Image from "next/image";
import { useActionState } from "react";
import MealEditDialog from "@/components/MealEditDialog";
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
import { deleteMeal } from "@/server/meal-actions";

type Meal = {
  _id: string;
  name: string;
  calories?: number;
  mealType?: string;
  time?: string;
  notes?: string;
  photos?: string[];
  date: string;
  parts?: string[];
};

type Props = { meal: Meal };

export default function MealRow({ meal }: Props) {
  const [_, removeAction, isPending] = useActionState(deleteMeal, null);

  const hasParts = Boolean(meal.parts && meal.parts.length > 0);
  const hasPhotos = Boolean(meal.photos && meal.photos.length > 0);

  return (
    <Card className="bg-white">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">{meal.name}</CardTitle>
        <CardDescription className="flex gap-3 text-sm">
          {meal.mealType && <span className="capitalize">{meal.mealType}</span>}
          {meal.time && <span>{meal.time}</span>}
        </CardDescription>
        <CardAction>
          {typeof meal.calories === "number" ? (
            <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
              {meal.calories} kcal
            </span>
          ) : null}
        </CardAction>
      </CardHeader>

      <CardContent>
        {hasParts ? (
          <div className="mt-3">
            <div className="mb-1 text-lg font-bold text-muted-foreground">
              Ingredients
            </div>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {meal.parts?.map((part, index) => (
                <li key={`${meal._id}-part-${index}`}>{part}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasPhotos ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {meal.photos?.slice(0, 6).map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={160}
                height={160}
                className="h-20 w-full rounded-md object-cover"
              />
            ))}
          </div>
        ) : null}

        {meal.notes && (
          <>
            <div className="mb-1 text-lg font-bold text-muted-foreground mt-5">
              Notes
            </div>
            <div className="bg-gray-100 p-3 rounded-md border border-gray-300 inset-shadow-sm inset-shadow-gray-500">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {meal.notes}
              </p>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="border-t justify-end gap-2">
        <form action={removeAction}>
          <input type="hidden" name="id" value={meal._id} />
          <input type="hidden" name="date" value={meal.date} />
          <Button variant="destructive" size="sm" disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </form>
        <MealEditDialog meal={meal} />
      </CardFooter>
    </Card>
  );
}
