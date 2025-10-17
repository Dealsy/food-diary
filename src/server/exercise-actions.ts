"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getConvex } from "@/lib/convexClient";
import {
  createExerciseSchema,
  updateExerciseSchema,
} from "@/lib/validators";

export async function createExercise(_prev: unknown, formData: FormData) {
  const input = Object.fromEntries(formData) as Record<string, string>;
  const parts = formData.getAll("parts").map((v) => String(v)).filter(Boolean);
  const parsed = createExerciseSchema.safeParse({
    date: input.date,
    name: input.name,
    calories: input.calories ?? "",
    time: input.time || undefined,
    notes: input.notes || undefined,
    photos: input.photos ? input.photos.split(",") : undefined,
    parts: parts.length ? parts : undefined,
  });
  if (!parsed.success) return { ok: false, error: parsed.error.message };

  const convex = getConvex();
  if (!convex) return { ok: false, error: "Convex URL not configured" };
  await convex.mutation("exercises:addExercise", parsed.data);
  revalidatePath(`/day/${parsed.data.date}`);
  updateTag(`day-${parsed.data.date}`);
  return { ok: true };
}

export async function editExercise(_prev: unknown, formData: FormData) {
  const input = Object.fromEntries(formData) as Record<string, string>;
  const parts = formData.getAll("parts").map((v) => String(v)).filter(Boolean);
  const parsed = updateExerciseSchema.safeParse({
    id: input.id,
    date: input.date || undefined,
    name: input.name || undefined,
    calories: input.calories ?? undefined,
    time: input.time || undefined,
    notes: input.notes || undefined,
    photos: input.photos ? input.photos.split(",") : undefined,
    parts: parts.length ? parts : undefined,
  });
  if (!parsed.success) return { ok: false, error: parsed.error.message };

  const convex = getConvex();
  if (!convex) return { ok: false, error: "Convex URL not configured" };
  await convex.mutation("exercises:updateExercise", parsed.data);
  if (parsed.data.date) {
    revalidatePath(`/day/${parsed.data.date}`);
    updateTag(`day-${parsed.data.date}`);
  }
  return { ok: true };
}

export async function removeExercise(id: string, date: string) {
  const convex = getConvex();
  if (!convex) return { ok: false, error: "Convex URL not configured" };
  await convex.mutation("exercises:deleteExercise", { id });
  revalidatePath(`/day/${date}`);
  updateTag(`day-${date}`);
  return { ok: true };
}

export async function deleteExercise(_prev: unknown, formData: FormData) {
  const id = String(formData.get("id") || "");
  const date = String(formData.get("date") || "");
  if (!id || !date) return { ok: false, error: "Missing id or date" };
  return await removeExercise(id, date);
}


