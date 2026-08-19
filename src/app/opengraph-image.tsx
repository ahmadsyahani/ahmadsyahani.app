import { ImageResponse } from "next/og";
import { personalInfo } from "@/lib/data";

export const alt = `${personalInfo.name} — ${personalInfo.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafaf9", // stone-50
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #e7e5e4", // stone-200
            borderRadius: "24px",
            width: "100%",
            height: "100%",
            backgroundColor: "#f5f5f4", // stone-100
          }}
        >
          <p
            style={{
              fontSize: 32,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#a8a29e", // stone-400
              marginBottom: 24,
            }}
          >
            {personalInfo.role}
          </p>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#1c1917", // stone-900
              marginBottom: 40,
              letterSpacing: "-0.04em",
              textAlign: "center",
            }}
          >
            {personalInfo.name}
          </h1>
          <p
            style={{
              fontSize: 40,
              color: "#57534e", // stone-600
              letterSpacing: "-0.02em",
            }}
          >
            {personalInfo.tagline}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
