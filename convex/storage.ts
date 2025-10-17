import { v } from "convex/values";
import { mutation } from "./_generated/server";

// 1) Generate a short-lived upload URL
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// 2) After POSTing the file, persist/return a public URL for the storage id
export const saveUploadedPhoto = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return { url };
  },
});
