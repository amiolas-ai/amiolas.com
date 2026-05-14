import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackgroundFx } from "@/components/layout/background-fx";
import { ContactWidget } from "@/components/widget/contact-widget";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundFx />
      <Header />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
      <ContactWidget />
    </>
  );
}
