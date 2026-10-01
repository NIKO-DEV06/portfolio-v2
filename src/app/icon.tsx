import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
          color: "#f4f3ef",
          borderRadius: 16,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: -1.5,
        }}
      >
        EA
      </div>
    ),
    size,
  );
}
