export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-40 animate-pulse">
      {/* Top controls: Close | Prev | Date | Next */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-20 rounded-md bg-muted/60" />
        </div>
      </header>

      {/* Book spread skeleton */}
      <section
        aria-label="Day spread"
        className="relative [perspective:2400px] overflow-hidden"
      >
        {/* Side arrows */}
        <div className="absolute left-[-32px] top-1/2 h-9 w-9 -translate-y-1/2 rounded-md bg-muted/60" />
        <div className="absolute right-[-32px] top-1/2 h-9 w-9 -translate-y-1/2 rounded-md bg-muted/60" />

        {/* Spread container */}
        <div className="relative rounded-2xl border bg-white shadow-sm p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Meals page */}
            <div className="relative rounded-xl border bg-white/98 p-4 md:p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-7 w-24 rounded-md bg-muted/60" />
                <div className="h-9 w-28 rounded-md bg-muted/60" />
              </div>
              <div className="grid gap-3">
                {["m1", "m2"].map((k) => (
                  <div
                    key={k}
                    className="overflow-hidden rounded-2xl border bg-white"
                  >
                    <div className="h-16 w-full bg-muted/40" />
                    <div className="grid grid-cols-3 gap-2 p-4">
                      <div className="h-20 w-full rounded-md bg-muted/40" />
                      <div className="h-20 w-full rounded-md bg-muted/40" />
                      <div className="h-20 w-full rounded-md bg-muted/40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercises page */}
            <div className="relative rounded-xl border bg-white/98 p-4 md:p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.04)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-7 w-28 rounded-md bg-muted/60" />
                <div className="h-9 w-32 rounded-md bg-muted/60" />
              </div>
              <div className="grid gap-3">
                {["e1", "e2"].map((k) => (
                  <div
                    key={k}
                    className="overflow-hidden rounded-2xl border bg-white"
                  >
                    <div className="h-16 w-full bg-muted/40" />
                    <div className="grid grid-cols-3 gap-2 p-4">
                      <div className="h-20 w-full rounded-md bg-muted/40" />
                      <div className="h-20 w-full rounded-md bg-muted/40" />
                      <div className="h-20 w-full rounded-md bg-muted/40" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spine */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/10" />
        </div>

        {/* Outer vignette */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.08)]" />
      </section>
    </div>
  );
}
