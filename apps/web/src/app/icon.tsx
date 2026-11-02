import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1a1410",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        {/* Roof left */}
        <div
          style={{
            position: "absolute",
            top: 5,
            left: 4,
            width: 12,
            height: 3,
            background: "#c9a96e",
            borderRadius: 2,
            transform: "rotate(37deg)",
            transformOrigin: "right center",
          }}
        />
        {/* Roof right */}
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 4,
            width: 12,
            height: 3,
            background: "#c9a96e",
            borderRadius: 2,
            transform: "rotate(-37deg)",
            transformOrigin: "left center",
          }}
        />
        {/* House body */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 7,
            width: 18,
            height: 14,
            border: "2.5px solid #c9a96e",
            borderRadius: 1,
          }}
        />
        {/* Circle pin */}
        <div
          style={{
            position: "absolute",
            top: 17,
            left: 12,
            width: 8,
            height: 8,
            border: "2px solid #c9a96e",
            borderRadius: 9999,
          }}
        />
        {/* Door notch */}
        <div
          style={{
            position: "absolute",
            bottom: 3,
            left: 12,
            width: 8,
            height: 6,
            background: "#1a1410",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
