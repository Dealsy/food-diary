"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

type Props = { children: React.ReactNode };

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
const convex = new ConvexReactClient(convexUrl);

export default function AppProviders({ children }: Props) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
