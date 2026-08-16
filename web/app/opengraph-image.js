import { ImageResponse } from "next/og"
import config from "@/config"

export const alt = `${config.app.name} — productos personalizados pintados a mano`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const primary = config.brand.primary

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: `linear-gradient(145deg, ${primary} 0%, #4c1d95 100%)`,
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-20px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "40%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <div style={{ fontSize: 88, lineHeight: 1, marginBottom: 28 }}>🎨</div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          {config.app.name}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.45,
            opacity: 0.92,
            maxWidth: 820,
          }}
        >
          {config.app.description}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 24,
            opacity: 0.75,
          }}
        >
          {config.app.domain}
        </div>
      </div>
    ),
    { ...size }
  )
}
