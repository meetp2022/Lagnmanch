import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LagnManch – A Kodi Patel Matrimonial Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(145deg, #800020 0%, #5c0018 60%, #3d000f 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative corner accents */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "200px", height: "200px", borderTop: "3px solid #CDA144", borderLeft: "3px solid #CDA144", borderTopLeftRadius: "4px" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", borderTop: "3px solid #CDA144", borderRight: "3px solid #CDA144", borderTopRightRadius: "4px" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "200px", height: "200px", borderBottom: "3px solid #CDA144", borderLeft: "3px solid #CDA144", borderBottomLeftRadius: "4px" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "200px", height: "200px", borderBottom: "3px solid #CDA144", borderRight: "3px solid #CDA144", borderBottomRightRadius: "4px" }} />

        {/* Top decorative line */}
        <div style={{ position: "absolute", top: "60px", left: "120px", right: "120px", height: "1px", background: "linear-gradient(to right, transparent, #CDA144, transparent)" }} />
        <div style={{ position: "absolute", bottom: "60px", left: "120px", right: "120px", height: "1px", background: "linear-gradient(to right, transparent, #CDA144, transparent)" }} />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

          {/* Icon box */}
          <div style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(145deg, #A21E31, #6C0E1A)",
            borderRadius: "20px",
            border: "2px solid #CDA144",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            fontWeight: "bold",
            color: "#CDA144",
            letterSpacing: "2px",
            boxShadow: "0 8px 32px rgba(205,161,68,0.3)",
          }}>
            LM
          </div>

          {/* Brand name */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            <span style={{ fontSize: "96px", fontWeight: "900", color: "#CDA144", lineHeight: 1 }}>Lagn</span>
            <span style={{ fontSize: "96px", fontWeight: "900", color: "#ffffff", lineHeight: 1 }}>Manch</span>
          </div>

          {/* Gold divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "60px", height: "1px", background: "#CDA144" }} />
            <div style={{ width: "8px", height: "8px", background: "#CDA144", borderRadius: "50%", transform: "rotate(45deg)" }} />
            <div style={{ width: "8px", height: "8px", background: "#CDA144", transform: "rotate(45deg)" }} />
            <div style={{ width: "8px", height: "8px", background: "#CDA144", borderRadius: "50%", transform: "rotate(45deg)" }} />
            <div style={{ width: "60px", height: "1px", background: "#CDA144" }} />
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: "32px",
            color: "#f5d78a",
            fontWeight: "400",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}>
            A Kodi Patel Matrimonial Platform
          </div>

          {/* Trust badge */}
          <div style={{
            background: "rgba(205,161,68,0.12)",
            border: "1px solid rgba(205,161,68,0.35)",
            borderRadius: "40px",
            padding: "10px 32px",
            fontSize: "20px",
            color: "#CDA144",
            letterSpacing: "1px",
          }}>
            ✦  Built by the community, for the community  ✦
          </div>
        </div>

        {/* URL watermark */}
        <div style={{
          position: "absolute",
          bottom: "28px",
          fontSize: "18px",
          color: "rgba(205,161,68,0.5)",
          letterSpacing: "2px",
        }}>
          lagnmanch.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
