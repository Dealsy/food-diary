import { Suspense, ViewTransition } from "react";
import DayClient from "@/components/DayClient";
import VTLink from "@/components/VTLink";
import { addDays } from "@/lib/constants";
import ExercisesPanel from "./ExercisesPanel";
import MealsPanel from "./MealsPanel";

type PageProps = {
  params: Promise<{ date: string }>;
};

export default async function DayPage({ params }: PageProps) {
  const { date } = await params;

  const currentDate = new Date(date);
  const prev = addDays(currentDate, -1);
  const next = addDays(currentDate, 1);

  const format = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;

  return (
    <ViewTransition>
      <div className="mx-auto max-w-5xl px-4 pt-40">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <VTLink
              href="/"
              direction="back"
              className="rounded-md border px-3 py-2"
            >
              Close
            </VTLink>
          </div>
          <h1 className="text-2xl font-semibold">{date}</h1>
        </header>

        <DayClient date={date} prevDate={format(prev)} nextDate={format(next)}>
          <Suspense
            fallback={
              <div className="relative rounded-xl border bg-white/98 p-4 md:p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.04)] h-[400px]" />
            }
          >
            <ViewTransition>
              <MealsPanel date={date} />
            </ViewTransition>
          </Suspense>
          <Suspense
            fallback={
              <div className="relative rounded-xl border bg-white/98 p-4 md:p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.04)] h-[400px]" />
            }
          >
            <ViewTransition>
              <ExercisesPanel date={date} />
            </ViewTransition>
          </Suspense>
        </DayClient>
      </div>
    </ViewTransition>
  );
}
