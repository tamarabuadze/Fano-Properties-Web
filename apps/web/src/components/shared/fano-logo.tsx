import React from "react";
import { cn } from "@fano/utils";

// Vector Fano Properties logo (house-with-keyhole mark and wordmark), the same drawing the
// Fano team app uses. Sharp at any size, coloured to suit the background.
const MARK_D = "M9 89.4V31L42 10L76.6 31V89.4H37V70H47V80H66.6V37L42 22L19 37V89.4Z";
const RING_D = "M42.6 33.9a13.5 13.5 0 1 1 0 27a13.5 13.5 0 1 1 0-27zM42.6 41a6.4 6.4 0 1 0 0 12.8a6.4 6.4 0 1 0 0-12.8z";

export const LOGO_COLORS = {
  bronze: "#8C6A47", // on light backgrounds
  sand: "#C4AD8E", // on espresso or over photos
  champagne: "#DFCFB9", // footer
} as const;

interface FanoLogoProps {
  color?: string;
  className?: string;
}

// The house mark on its own, for large faint watermarks behind a section.
// Decorative: hidden from assistive technology.
export function FanoMark({ color = "#E2A862", className }: FanoLogoProps) {
  return (
    <svg viewBox="4 4 80 90" aria-hidden="true" focusable="false" className={className} style={{ color }}>
      <g fill="currentColor">
        <path d={MARK_D} />
        <path fillRule="evenodd" d={RING_D} />
      </g>
    </svg>
  );
}

export function FanoLogo({ color = LOGO_COLORS.bronze, className }: FanoLogoProps) {
  return (
    <svg
      viewBox="0 0 300 92"
      role="img"
      aria-label="Fano Properties"
      className={cn("h-11 w-auto", className)}
      style={{ color }}
    >
      <g transform="translate(-6,-6) scale(1.07)" fill="currentColor">
        <path d={MARK_D} />
        <path fillRule="evenodd" d={RING_D} />
      </g>
      <text
        x="96"
        y="58"
        fill="currentColor"
        fontWeight="600"
        fontSize="52"
        letterSpacing="7"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, system-ui, sans-serif" }}
      >
        FANO
      </text>
      <text
        x="98"
        y="86"
        fill="currentColor"
        fontWeight="600"
        fontSize="19.5"
        letterSpacing="5.6"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, system-ui, sans-serif" }}
      >
        PROPERTIES
      </text>
    </svg>
  );
}
