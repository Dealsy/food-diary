"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDateKey } from "@/lib/constants";

export default function Home() {
  const today = formatDateKey(new Date());
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
  };
  return (
    <div className="min-h-dvh grid place-items-center [perspective:1600px]">
      <motion.button
        type="button"
        aria-label="Open Food Diary"
        className="relative w-200 aspect-[3/4] rounded-xl border shadow-xl overflow-hidden origin-left cursor-pointer select-none [backface-visibility:hidden] will-change-transform"
        initial={false}
        animate={isOpening ? "open" : "closed"}
        variants={{
          closed: {
            rotateY: 0,
            scale: 1,
            x: 0,
          },
          open: {
            rotateY: -180,
            scale: 1.02,
            x: 1,
            transition: { duration: 0.5, ease: [0.5, 0.5, 0.5, 0.5] },
          },
        }}
        onClick={handleOpen}
        onAnimationComplete={() => {
          if (isOpening) router.push(`/day/${today}`);
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-[url('/cover.png')] bg-cover bg-center" />
        <div className="absolute left-0 top-0 h-full w-2 bg-[oklch(0.21_0.006_285.885)]/10" />
        {/* subtle vignette for depth */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 [mask-image:radial-gradient(80%_80%_at_50%_40%,black_40%,transparent_100%)]" />
      </motion.button>
    </div>
  );
}
