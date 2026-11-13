import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const MARK_D = "M9 89.4V31L42 10L76.6 31V89.4H37V70H47V80H66.6V37L42 22L19 37V89.4Z";
const RING_D = "M42.6 33.9a13.5 13.5 0 1 1 0 27a13.5 13.5 0 1 1 0-27zM42.6 41a6.4 6.4 0 1 0 0 12.8a6.4 6.4 0 1 0 0-12.8z";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#2B2520",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="4 4 80 90"
          width="22"
          height="22"
        >
          <path d={MARK_D} fill="#D4A843" />
          <path d={RING_D} fill="#D4A843" fillRule="evenodd" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
