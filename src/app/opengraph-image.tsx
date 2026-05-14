import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Amiolas — 의미의 연속성을 회복합니다";

export default async function OG() {
  const [scDreamRegular, scDreamBold] = await Promise.all([
    fs.readFile(path.join(process.cwd(), "public/fonts/SCDream4.otf")),
    fs.readFile(path.join(process.cwd(), "public/fonts/SCDream8.otf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#faf8f5",
          color: "#1a1224",
          fontFamily: "SCDream",
          position: "relative",
        }}
      >
        {/* Brand glow (top-right) */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -220,
            width: 720,
            height: 720,
            borderRadius: 720,
            background: "#6041e6",
            opacity: 0.14,
            display: "flex",
          }}
        />
        {/* Brand glow (bottom-left, subtler) */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -260,
            width: 640,
            height: 640,
            borderRadius: 640,
            background: "#6041e6",
            opacity: 0.06,
            display: "flex",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "SCDream",
            fontSize: 22,
            letterSpacing: "0.22em",
            color: "#5a5468",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              background: "#6041e6",
              display: "flex",
            }}
          />
          AMIOLAS · AI STUDIO
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 880,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            의미의 연속성을
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            회복합니다.
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#3d3850",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              maxWidth: 720,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                lineHeight: 1.5,
                color: "#5a5468",
              }}
            >
              자체 AI 제품과 엔터프라이즈 엔지니어링을 병행하는 AI Studio.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.22em",
              color: "#5a5468",
            }}
          >
            AMIOLAS.COM
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "SCDream", data: scDreamRegular, weight: 400 },
        { name: "SCDream", data: scDreamBold, weight: 800 },
      ],
    },
  );
}
