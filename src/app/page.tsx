import VTLink from "@/components/VTLink";
import { formatDateKey } from "@/lib/constants";

export default function Home() {
  const today = formatDateKey(new Date());
  return (
    <div className="min-h-dvh grid place-items-center bg-background">
      <div className="relative w-[320px] sm:w-[380px] aspect-[3/4] rounded-xl border bg-white dark:bg-black shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-linear-45 from-[color:var(--color-blue-200,#bfdbfe)]/40 to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center gap-4 p-6">
          <h1 className="text-2xl font-semibold">Food Diary</h1>
          <p className="text-sm text-muted-foreground">Click to open today</p>
          <VTLink
            href={`/day/${today}`}
            className="rounded-md border px-4 py-2"
            direction="forward"
          >
            Open Book
          </VTLink>
        </div>
        <div className="absolute left-0 top-0 h-full w-2 bg-[oklch(0.21_0.006_285.885)]/10" />
      </div>
    </div>
  );
}
