import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMealsByDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    const meals = await ctx.db
      .query("meals")
      .withIndex("by_date", (q) => q.eq("date", date))
      .collect();
    return meals;
  },
});

export const addMeal = mutation({
  args: {
    date: v.string(),
    name: v.string(),
    mealType: v.optional(v.string()),
    calories: v.optional(v.number()),
    time: v.optional(v.string()),
    notes: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("meals", args);
    return id;
  },
});

export const updateMeal = mutation({
  args: {
    id: v.id("meals"),
    date: v.optional(v.string()),
    name: v.optional(v.string()),
    mealType: v.optional(v.string()),
    calories: v.optional(v.number()),
    time: v.optional(v.string()),
    notes: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { id, ...rest }) => {
    await ctx.db.patch(id, rest);
    return true;
  },
});

export const deleteMeal = mutation({
  args: { id: v.id("meals") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return true;
  },
});
