import { format } from "date-fns";
export const MEAL_TYPES = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "other",
] as const;

export const MAX_PHOTOS_PER_MEAL = 6;
export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Formats to YYYY-MM-DD using AEST (UTC+10), without DST adjustments.
export function formatDateKey(date: Date): string {
  const utcMs = date.getTime() + date.getTimezoneOffset() * 60_000;
  const aestMs = utcMs + 10 * 60 * 60 * 1000; // UTC+10 hours
  return format(new Date(aestMs), "yyyy-MM-dd");
}

export function addDays(date: Date, delta: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}


