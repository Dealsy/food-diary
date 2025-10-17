import { z } from "zod";
import {
  MAX_PHOTO_SIZE_BYTES,
  MAX_PHOTOS_PER_MEAL,
  MEAL_TYPES,
} from "@/lib/constants";

export const mealTypeSchema = z.enum(MEAL_TYPES);

export const photoUrlSchema = z.url();

export const createMealSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  name: z.string().min(1, "Meal name is required"),
  mealType: mealTypeSchema.optional(),
  calories: z
    .string()
    .transform((v) => (v === "" ? undefined : Number(v)))
    .pipe(z.number().int().nonnegative().max(5000).optional()),
  // Allow any string for time (or omit entirely)
  time: z.string().optional(),
  notes: z.string().max(2000).optional(),
  photos: z.array(photoUrlSchema).max(MAX_PHOTOS_PER_MEAL).optional(),
  parts: z.array(z.string().min(1)).max(20).optional(),
});

export type CreateMealInput = z.infer<typeof createMealSchema>;

export const updateMealSchema = createMealSchema
  .partial()
  .and(z.object({ id: z.string().min(1) }));

export type UpdateMealInput = z.infer<typeof updateMealSchema>;

// Client-side guard for file selection before upload
export const photoFileSchema = z
  .any()
  .refine(
    (f) => typeof File !== "undefined" && f instanceof File,
    "Invalid file",
  )
  .refine(
    (f) =>
      typeof File !== "undefined" && f instanceof File
        ? f.size <= MAX_PHOTO_SIZE_BYTES
        : false,
    "File too large",
  )
  .refine(
    (f) =>
      typeof File !== "undefined" && f instanceof File
        ? /^image\//.test(f.type)
        : false,
    "Invalid file type",
  );

// Exercises
export const createExerciseSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  name: z.string().min(1, "Exercise name is required"),
  calories: z
    .string()
    .transform((v) => (v === "" ? undefined : Number(v)))
    .pipe(z.number().int().nonnegative().max(5000).optional()),
  // Allow any string for time (or omit entirely)
  time: z.string().optional(),
  notes: z.string().max(2000).optional(),
  photos: z.array(photoUrlSchema).max(MAX_PHOTOS_PER_MEAL).optional(),
  parts: z.array(z.string().min(1)).max(20).optional(),
});

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;

export const updateExerciseSchema = createExerciseSchema
  .partial()
  .and(z.object({ id: z.string().min(1) }));

export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>;