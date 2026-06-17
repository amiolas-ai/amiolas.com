"use client";
// 라우트별 테마 셸 — /careers에서만 라이트 서피스(.surface-light)를 둘러 헤더·본문·푸터를 모두 화이트로 반전
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function RouteThemeShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const light = pathname?.startsWith("/careers") ?? false;

  return (
    <div
      className={`flex flex-1 flex-col ${
        light ? "surface-light bg-background text-foreground" : ""
      }`}
    >
      {children}
    </div>
  );
}
