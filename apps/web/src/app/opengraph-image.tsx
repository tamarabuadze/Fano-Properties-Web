import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const heroImageUrl =
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop";

  let imageData: string | undefined;
  try {
    const res = await fetch(heroImageUrl);
    const buf = await res.arrayBuffer();
    // btoa works in both Edge Runtime and Node.js (Buffer is Node-only)
    const bytes = new Uint8Array(buf);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    imageData = `data:image/jpeg;base64,${btoa(binary)}`;
  } catch {
    // fall through — show gradient-only background
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#1a1410",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background photo */}
        {imageData && (
          <img
            src={imageData}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "64px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              color: "#c9a96e",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Premium Real Estate
          </div>

          {/* Headline */}
          <div
            style={{
              color: "#ffffff",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              marginBottom: 28,
            }}
          >
            Fano Properties
          </div>

          {/* Sub-headline */}
          <div
            style={{
              color: "rgba(255,255,255,0.70)",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.45,
              maxWidth: 620,
              marginBottom: 48,
            }}
          >
            Luxury homes, villas & investment properties in Dubai and beyond.
          </div>

          {/* Domain pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                background: "#c9a96e",
                color: "#ffffff",
                padding: "14px 36px",
                borderRadius: 50,
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              fanoproperties.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
