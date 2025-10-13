import { createMealSchema } from "@/lib/validators";

export type ValidateResult =
  | { ok: true; data: FormData }
  | { ok: false; error: string };

export function formDataFromRecord(record: Record<string, unknown>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(record)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      fd.append(key, value.join(","));
      continue;
    }
    fd.append(key, String(value));
  }
  return fd;
}

export function validateAndBuildMealFormData(
  fd: FormData,
  date: string
): ValidateResult {
  const raw = Object.fromEntries(fd) as Record<string, string>;
  const parsed = createMealSchema.safeParse({
    date,
    name: raw.name,
    mealType: raw.mealType || undefined,
    calories: raw.calories ?? "",
    time: raw.time || undefined,
    notes: raw.notes || undefined,
    photos: undefined,
  });
  if (!parsed.success) {
    return { ok: false, error: "Please check your inputs." };
  }
  return { ok: true, data: formDataFromRecord(parsed.data) };
}
