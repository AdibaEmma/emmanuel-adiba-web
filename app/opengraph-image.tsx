import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

// The share card for every page: the site's own palette and type hierarchy,
// rendered at build time — no hand-maintained PNG to drift out of date.
export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0b0a",
          color: "#f5f1e6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, letterSpacing: 4, color: "#8a8e81", fontFamily: "monospace" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#c7f65e" }} />
          ENGINEER · BUILDER · THINKER · FOUNDER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, lineHeight: 0.9, letterSpacing: -4 }}>Emmanuel</div>
          <div style={{ fontSize: 132, lineHeight: 0.9, letterSpacing: -4, fontStyle: "italic", color: "#c7f65e" }}>Adiba</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a8ab9f", fontFamily: "monospace" }}>
          <span>Software engineer · Bolgatanga, Ghana</span>
          <span>Founder, Portforge Technologies</span>
        </div>
      </div>
    ),
    size,
  );
}
