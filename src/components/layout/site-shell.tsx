import type { ReactNode } from "react";
import { BackgroundFx } from "@/components/layout/background-fx";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RouteThemeShell } from "@/components/layout/route-theme-shell";
import { ContactWidget } from "@/components/widget/contact-widget";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <RouteThemeShell>
      <BackgroundFx />
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
      <ContactWidget />
    </RouteThemeShell>
  );
}
