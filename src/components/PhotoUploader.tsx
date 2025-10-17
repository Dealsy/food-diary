"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MAX_PHOTOS_PER_MEAL } from "@/lib/constants";
import { getConvex } from "@/lib/convexClient";
import { photoFileSchema } from "@/lib/validators";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function PhotoUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onFiles = useCallback(
    async (files: FileList | null) => {
      if (!files) return;
      const convex = getConvex();
      if (!convex) return;
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const parsed = photoFileSchema.safeParse(file);
        if (!parsed.success) continue;
        // Step 1: get an upload URL
        const postUrl = (await convex.mutation(
          "storage:generateUploadUrl",
          {},
        )) as string;
        // Step 2: upload the file
        const response = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = (await response.json()) as {
          storageId: string;
        };
        // Step 3: exchange id for a public URL (or store id instead)
        const { url } = (await convex.mutation("storage:saveUploadedPhoto", {
          storageId,
        })) as { url: string };
        if (url) urls.push(url);
        if (value.length + urls.length >= MAX_PHOTOS_PER_MEAL) break;
      }
      if (urls.length)
        onChange([...(value ?? []), ...urls].slice(0, MAX_PHOTOS_PER_MEAL));
    },
    [onChange, value],
  );

  const removeAt = useCallback(
    (idx: number) => {
      const next = [...value];
      next.splice(idx, 1);
      onChange(next);
    },
    [value, onChange],
  );

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3 gap-2">
        {value.map((url, idx) => (
          <div key={url} className="relative">
            <Image
              src={url}
              alt=""
              width={160}
              height={160}
              className="h-20 w-full rounded-md object-cover"
            />
            <button
              type="button"
              className="absolute right-1 top-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white"
              onClick={() => removeAt(idx)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
        <Button type="button" variant="outline" size="sm" onClick={handlePick}>
          {value.length ? "Add more photos" : "Upload photos"}
        </Button>
      </div>
    </div>
  );
}
