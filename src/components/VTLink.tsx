"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { addTransitionType, startTransition } from "react";

type VTLinkProps = {
  href: string;
  children: React.ReactNode;
  direction?: "forward" | "back";
  className?: string;
};

export default function VTLink({
  href,
  children,
  direction = "forward",
  className,
}: VTLinkProps) {
  const router = useRouter();

  function handleClick() {
    startTransition(() => {
      addTransitionType(
        direction === "back" ? "navigation-back" : "navigation-forward",
      );
      router.push(href);
    });
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
