import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  meals: defineTable({
    date: v.string(),
    name: v.string(),
    mealType: v.optional(v.string()),
    calories: v.optional(v.number()),
    time: v.optional(v.string()),
    notes: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
    parts: v.optional(v.array(v.string())),
  }).index("by_date", ["date"]),
  exercises: defineTable({
    date: v.string(),
    name: v.string(),
    calories: v.optional(v.number()), // calories burned
    time: v.optional(v.string()), // when or duration (e.g., 00:30)
    notes: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
    parts: v.optional(v.array(v.string())),
  }).index("by_date", ["date"]),
});


