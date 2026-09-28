import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#0e0c0a",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            background:
              "linear-gradient(135deg, #8a6a2c, #e8c97a 50%, #c9a24b)",
            transform: "rotate(45deg)",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    size
  );
}
