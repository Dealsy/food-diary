import Image from "next/image";
import { ViewTransition } from "react";
import { EmptyState } from "@/components/emptyState";
import MealDialog from "@/components/MealDialog";
import MealRow from "@/components/MealRow";
import { Card } from "@/components/ui/card";
import VTLink from "@/components/VTLink";
import { addDays } from "@/lib/constants";
import { getConvex } from "@/lib/convexClient";

type PageProps = {
  params: Promise<{ date: string }>;
};

type Meal = {
  _id: string;
  name: string;
  calories?: number;
  mealType?: string;
  time?: string;
  notes?: string;
  photos?: string[];
};

export default async function DayPage({ params }: PageProps) {
  const { date } = await params;

  // Server-side fetch via Convex if configured

  let meals: Meal[] = [];
  const convex = getConvex();
  if (convex) {
    try {
      // Note: ConvexHttpClient queries run via HTTP; for production prefer server-side functions
      // and Next cache tags when we wire updateTag in actions.
      meals = (await convex.query("meals:getMealsByDate", {
        date,
      })) as unknown as Meal[];
    } catch {}
  }

  const currentDate = new Date(date);
  const prev = addDays(currentDate, -1);
  const next = addDays(currentDate, 1);

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;

  return (
    <ViewTransition>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VTLink
              href="/"
              direction="back"
              className="rounded-md border px-3 py-2"
            >
              Close
            </VTLink>
            <VTLink
              href={`/day/${format(prev)}`}
              direction="back"
              className="rounded-md border px-3 py-2"
            >
              Prev
            </VTLink>
          </div>
          <h1 className="text-2xl font-semibold">{date}</h1>
          <div>
            <VTLink
              href={`/day/${format(next)}`}
              direction="forward"
              className="rounded-md border px-3 py-2"
            >
              Next
            </VTLink>
          </div>
        </header>

        <section className="grid gap-3">
          {meals.length === 0 ? (
            <EmptyState cta={<MealDialog date={date} />} />
          ) : (
            meals.map((m: Meal, idx) => (
              <Card
                key={m._id}
                className={`overflow-hidden bg-white border ${
                  idx === meals.length - 1
                    ? "rounded-2xl"
                    : "rounded-t-2xl rounded-b-none"
                }`}
              >
                <MealRow meal={{ ...m, date }} />
                {m.photos?.length ? (
                  <div className="grid grid-cols-3 gap-2 p-4 pt-0">
                    {m.photos.slice(0, 6).map((src: string) => (
                      <Image
                        key={src}
                        src={src}
                        alt=""
                        className="h-20 w-full object-cover rounded-md"
                      />
                    ))}
                  </div>
                ) : null}
              </Card>
            ))
          )}
        </section>

        {meals.length > 0 && (
          <div className="mt-8">
            <MealDialog date={date} />
          </div>
        )}
      </div>
    </ViewTransition>
  );
}
