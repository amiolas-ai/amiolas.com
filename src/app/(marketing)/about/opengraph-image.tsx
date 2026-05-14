import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Amiolas — 소개";

export default async function AboutOG() {
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
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
          AMIOLAS · ABOUT
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.035em",
            }}
          >
            Amiolas
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#3d3850",
            }}
          >
            얼굴을 감싸는 마법 투구.
            <br />
            이종 언어의 통합을 위한 형이상학적 통찰.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "#5a5468",
            letterSpacing: "0.22em",
          }}
        >
          <div style={{ display: "flex" }}>AMIOLAS.COM/ABOUT</div>
          <div style={{ display: "flex" }}>EST. 2025</div>
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
