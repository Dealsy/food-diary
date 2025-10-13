import { v } from "convex/values";
import { action } from "./_generated/server";

// Placeholder: Wire Convex file storage once configured; return URL string
export const uploadPhoto = action({
  args: { file: v.bytes() },
  handler: async (_ctx, _args) => {
    // Implement via Convex storage when available
    return "";
  },
});
