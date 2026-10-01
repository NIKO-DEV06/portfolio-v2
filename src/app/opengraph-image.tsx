import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = site.title;
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
          padding: 72,
          background: "#f4f3ef",
          color: "#141414",
        }}
      >
        <div style={{ display: "flex", fontSize: 28 }}>© {site.name}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          <span>Full-Stack & AI</span>
          <span>Product Engineer</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#5c5b55",
          }}
        >
          <span>Founder of {site.founderOf.name} · Based in the UK</span>
          <span>emmanuelayeniko.com</span>
        </div>
      </div>
    ),
    size,
  );
}
