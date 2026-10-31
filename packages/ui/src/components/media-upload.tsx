"use client";

import * as React from "react";
import { Loader2, Play, Upload, X } from "lucide-react";
import { cn, isVideoUrl } from "@fano/utils";

export interface MediaUploadProps {
  uploadUrl: string;
  value: string[];
  onChange: (urls: string[]) => void;
  /** One file only (selecting another replaces it) */
  single?: boolean;
  allowVideo?: boolean;
  hint?: string;
  className?: string;
}

function MediaUpload({ uploadUrl, value, onChange, single, allowVideo, hint, className }: MediaUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(0);
  const [errors, setErrors] = React.useState<string[]>([]);
  const accept = allowVideo ? "image/jpeg,image/png,image/webp,video/mp4" : "image/jpeg,image/png,image/webp";

  async function handleFiles(files: File[]) {
    if (files.length === 0) return;
    setErrors([]);
    setUploading(files.length);
    let urls = value;
    const failed: string[] = [];

    for (const file of files) {
      if (!accept.split(",").includes(file.type)) {
        failed.push(`${file.name}: use ${allowVideo ? "JPG, PNG, WEBP or MP4" : "JPG, PNG or WEBP"}.`);
      } else {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch(uploadUrl, { method: "POST", body }).catch(() => null);
        const data = res ? await res.json().catch(() => null) : null;
        if (res?.ok && data?.url) {
          urls = single ? [data.url] : [...urls, data.url];
          onChange(urls);
        } else {
          failed.push(`${file.name}: ${data?.error ?? "upload failed."}`);
        }
      }
      setUploading((n) => n - 1);
    }
    setErrors(failed);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={className}>
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          {value.map((url) => (
            <div key={url} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-zinc-100">
              {isVideoUrl(url) ? (
                <>
                  <video src={url} muted playsInline preload="metadata" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="h-9 w-9 rounded-full bg-black/60 flex items-center justify-center text-white">
                      <Play className="h-4 w-4" />
                    </span>
                  </span>
                </>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" className="h-full w-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => onChange(value.filter((u) => u !== url))}
                aria-label="Remove file"
                className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void handleFiles(Array.from(e.dataTransfer.files).slice(0, single ? 1 : undefined));
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-1.5 px-4 py-6 rounded-xl border border-dashed border-border text-center cursor-pointer transition-colors hover:bg-secondary/40",
          uploading > 0 && "pointer-events-none opacity-60"
        )}
      >
        {uploading > 0 ? (
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <Upload className="h-5 w-5 text-muted-foreground" />
        )}
        <span className="text-sm font-medium text-foreground">
          {uploading > 0
            ? `Uploading ${uploading} file${uploading > 1 ? "s" : ""}…`
            : single && value.length > 0
              ? "Replace file"
              : "Click to choose files, or drag them here"}
        </span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={!single}
          className="sr-only"
          onChange={(e) => void handleFiles(Array.from(e.target.files ?? []))}
        />
      </label>

      {errors.map((err) => (
        <p key={err} className="text-xs text-red-500 mt-1.5">
          {err}
        </p>
      ))}
    </div>
  );
}

export { MediaUpload };
