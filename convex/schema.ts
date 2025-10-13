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
  }).index("by_date", ["date"]),
});


