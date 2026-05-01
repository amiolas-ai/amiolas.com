import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/layout/theme-provider";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://amiolas.com"),
  title: {
    default: "Amiolas — Restore the continuity of meaning",
    template: "%s — Amiolas",
  },
  description:
    "Ontology-driven AI agents that restore the continuity of meaning across your fragmented enterprise data.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amiolas.com",
    siteName: "Amiolas",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${scDream.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
