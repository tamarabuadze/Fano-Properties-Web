"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";

// next/image that steps aside when its file cannot be loaded: instead of a broken
// icon and alt text, the parent's background shows with a quiet caption.
export function SafeImage({ caption = "Photograph coming soon", ...props }: ImageProps & { caption?: string | null }) {
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => setFailed(false), [props.src]);

  if (failed) {
    return caption ? (
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-current opacity-40"
      >
        {caption}
      </span>
    ) : null;
  }
  // eslint-disable-next-line jsx-a11y/alt-text -- alt comes through props
  return <Image {...props} onError={() => setFailed(true)} />;
}
