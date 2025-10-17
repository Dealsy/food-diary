import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getExercisesByDate = query({
  args: { date: v.string() },
  handler: async (ctx, { date }) => {
    const results = await ctx.db
      .query("exercises")
      .withIndex("by_date", (q) => q.eq("date", date))
      .collect();
    return results;
  },
});

export const addExercise = mutation({
  args: {
    date: v.string(),
    name: v.string(),
    calories: v.optional(v.number()),
    time: v.optional(v.string()),
    notes: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
    parts: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("exercises", args);
    return id;
  },
});

export const updateExercise = mutation({
  args: {
    id: v.id("exercises"),
    date: v.optional(v.string()),
    name: v.optional(v.string()),
    calories: v.optional(v.number()),
    time: v.optional(v.string()),
    notes: v.optional(v.string()),
    photos: v.optional(v.array(v.string())),
    parts: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { id, ...rest }) => {
    await ctx.db.patch(id, rest);
    return true;
  },
});

export const deleteExercise = mutation({
  args: { id: v.id("exercises") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return true;
  },
});


