import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amiolas",
    short_name: "Amiolas",
    description:
      "단절된 곳에 의미의 연속성을 회복합니다. 자체 AI 제품과 엔터프라이즈 엔지니어링을 병행하는 AI Studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#6041e6",
    lang: "ko",
    dir: "ltr",
    orientation: "portrait",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
