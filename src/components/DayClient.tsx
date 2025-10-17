"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  date: string;
  prevDate: string;
  nextDate: string;
  children?: React.ReactNode;
};

export default function DayClient({
  date,
  prevDate,
  nextDate,
  children,
}: Props) {
  const router = useRouter();
  const [turn, setTurn] = React.useState<null | "left" | "right">(null);
  const originClass = "origin-center";

  return (
    <section
      aria-label="Day spread"
      className="relative [perspective:2400px] overflow-hidden min-h-[90vh]"
      onKeyDown={(e) => {
        if (turn) return;
        if (e.key === "ArrowLeft") setTurn("left");
        if (e.key === "ArrowRight") setTurn("right");
      }}
    >
      <motion.div
        className={`relative rounded-xl border bg-white dark:bg-black shadow-sm ${originClass} [backface-visibility:hidden] min-h-[75vh]`}
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={
          turn === "left"
            ? { rotateY: 180 }
            : turn === "right"
              ? { rotateY: -180 }
              : { rotateY: 0 }
        }
        transition={{ duration: 0.3, ease: [0.5, 0.5, 0.5, 0.5] }}
        onAnimationComplete={() => {
          if (!turn) return;
          const target = turn === "left" ? prevDate : nextDate;
          setTurn(null);
          router.push(`/day/${target}`);
        }}
      >
        {/* Day navigation arrows with animation */}
        <Button
          type="button"
          aria-label="Previous day"
          className="absolute left-[-32px] top-1/2 -translate-y-1/2 text-muted-foreground"
          onMouseEnter={() => router.prefetch(`/day/${prevDate}`)}
          onFocus={() => router.prefetch(`/day/${prevDate}`)}
          onClick={() => setTurn("left")}
          disabled={turn !== null}
        >
          ←
        </Button>
        <Button
          type="button"
          aria-label="Next day"
          className="absolute right-[-32px] top-1/2 -translate-y-1/2 text-muted-foreground"
          onMouseEnter={() => router.prefetch(`/day/${nextDate}`)}
          onFocus={() => router.prefetch(`/day/${nextDate}`)}
          onClick={() => setTurn("right")}
          disabled={turn !== null}
        >
          →
        </Button>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-6">
          <section className="relative rounded-xl border bg-white/98 dark:bg-black/50 p-4 shadow-[inset_0_0_40px_rgba(0,0,0,0.04)] max-h-[70vh] overflow-auto">
            {children && Array.isArray(children) ? children[0] : children}
          </section>
          <section className="relative rounded-xl border bg-white/98 dark:bg-black/50 p-4 shadow-[inset_0_0_40px_rgba(0,0,0,0.04)] max-h-[70vh] overflow-auto">
            {children && Array.isArray(children) ? children[1] : null}
          </section>
        </div>

        {/* Spine shadow for depth */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/10" />

        {/* Vignette for page depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(252,252,230,2.08)]" />
        {turn && (
          <div
            className={`pointer-events-none absolute inset-0 rounded-2xl ${
              turn === "left"
                ? "bg-gradient-to-r from-black/10 via-transparent to-transparent"
                : "bg-gradient-to-l from-black/10 via-transparent to-transparent"
            }`}
          />
        )}
      </motion.div>
    </section>
  );
}
