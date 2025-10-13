"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getConvex } from "@/lib/convexClient";
import { createMealSchema, updateMealSchema } from "@/lib/validators";

export async function createMeal(_prev: unknown, formData: FormData) {
  const input = Object.fromEntries(formData) as Record<string, string>;
  const parts = formData.getAll("parts").map((v) => String(v)).filter(Boolean);
  const parsed = createMealSchema.safeParse({
    date: input.date,
    name: input.name,
    mealType: input.mealType || undefined,
    calories: input.calories ?? "",
    time: input.time || undefined,
    notes: input.notes || undefined,
    photos: input.photos ? input.photos.split(",") : undefined,
    parts: parts.length ? parts : undefined,
  });
  if (!parsed.success) return { ok: false, error: parsed.error.message };

  const convex = getConvex();
  if (!convex) return { ok: false, error: "Convex URL not configured" };
  await convex.mutation("meals:addMeal", parsed.data);
  revalidatePath(`/day/${parsed.data.date}`);
  updateTag(`day-${parsed.data.date}`);
  return { ok: true };
}

export async function editMeal(_prev: unknown, formData: FormData) {
  const input = Object.fromEntries(formData) as Record<string, string>;
  const parts = formData.getAll("parts").map((v) => String(v)).filter(Boolean);
  const parsed = updateMealSchema.safeParse({
    id: input.id,
    date: input.date || undefined,
    name: input.name || undefined,
    mealType: input.mealType || undefined,
    calories: input.calories ?? undefined,
    time: input.time || undefined,
    notes: input.notes || undefined,
    photos: input.photos ? input.photos.split(",") : undefined,
    parts: parts.length ? parts : undefined,
  });
  if (!parsed.success) return { ok: false, error: parsed.error.message };

  const convex = getConvex();
  if (!convex) return { ok: false, error: "Convex URL not configured" };
  await convex.mutation("meals:updateMeal", parsed.data);
  if (parsed.data.date) {
    revalidatePath(`/day/${parsed.data.date}`);
    updateTag(`day-${parsed.data.date}`);
  }
  return { ok: true };
}

export async function removeMeal(id: string, date: string) {
  const convex = getConvex();
  if (!convex) return { ok: false, error: "Convex URL not configured" };
  await convex.mutation("meals:deleteMeal", { id });
  revalidatePath(`/day/${date}`);
  updateTag(`day-${date}`);
  return { ok: true };
}

export async function deleteMeal(_prev: unknown, formData: FormData) {
  const id = String(formData.get("id") || "");
  const date = String(formData.get("date") || "");
  if (!id || !date) return { ok: false, error: "Missing id or date" };
  return await removeMeal(id, date);
}
