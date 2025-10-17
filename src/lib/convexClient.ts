import { ConvexHttpClient } from "convex/browser";

let client: ConvexHttpClient | null = null;

export function getConvexClient(): ConvexHttpClient | null {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  client = new ConvexHttpClient(url);
  return client;
}

export type SafeConvexClient = {
  query: (name: string, args: unknown) => Promise<unknown>;
  mutation: (name: string, args: unknown) => Promise<unknown>;
  action: (name: string, args: unknown) => Promise<unknown>;
};

export function getConvex(): SafeConvexClient | null {
  const base = getConvexClient();
  if (!base) return null;
  return base as unknown as SafeConvexClient;
}
