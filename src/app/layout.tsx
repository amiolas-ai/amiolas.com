import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const scDream = localFont({
  variable: "--font-sc-dream",
  display: "swap",
  src: [
    { path: "../../public/fonts/SCDream1.otf", weight: "100", style: "normal" },
    { path: "../../public/fonts/SCDream2.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/SCDream3.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/SCDream4.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/SCDream5.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/SCDream6.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/SCDream7.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/SCDream8.otf", weight: "800", style: "normal" },
    { path: "../../public/fonts/SCDream9.otf", weight: "900", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Latin display/UI face — distinctive techy grotesk. Korean falls back to
// SCDream via the --font-sans stack in globals.css.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amiolas.com"),
  title: {
    default: "Amiolas",
    template: "%s — Amiolas",
  },
  description:
    "단절된 곳에 의미의 연속성을 회복합니다. 자체 AI 에이전트와 엔터프라이즈 엔지니어링을 병행하는 AI Studio.",
  applicationName: "Amiolas",
  authors: [{ name: "Amiolas" }],
  creator: "Amiolas",
  publisher: "Amiolas, Inc.",
  keywords: [
    "Amiolas",
    "아미올라스",
    "AI Studio",
    "온톨로지",
    "엔터프라이즈 AI",
    "지식 그래프",
    "Specify",
  ],
  alternates: {
    canonical: "/",
    languages: { "ko-KR": "/" },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://amiolas.com",
    siteName: "Amiolas",
    title: "Amiolas — 의미의 연속성을 회복합니다",
    description:
      "단절된 곳에 의미의 연속성을 회복합니다. 자체 AI 에이전트와 엔터프라이즈 엔지니어링을 병행하는 AI Studio.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amiolas — 의미의 연속성을 회복합니다",
    description:
      "단절된 곳에 의미의 연속성을 회복합니다.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0b0a10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${scDream.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
