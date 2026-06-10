"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed ambient hero backdrop — a looping ontology-field mp4 pushed back
 * with blur + tint so it reads as atmosphere, not foreground. Purely
 * decorative → aria-hidden. Always plays (autoplay + a JS nudge in case the
 * browser blocks the declarative autoplay).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause(); // 정지 프레임이 배경 역할을 대신한다
      return;
    }
    void video.play().catch(() => {
      /* autoplay may be blocked — overlays still carry the mood */
    });
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        /* LCP는 비디오 첫 프레임이 아니라 이 poster로 잡힌다 (62KB · blur 처리라 저화질 무방) */
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter:
            "saturate(1.1) contrast(1.05) brightness(0.82) hue-rotate(-6deg) blur(4px)",
          transform: "scale(1.03)",
        }}
      />
      {/* violet glow + dark gradient — readability + cyberpunk tone */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, oklch(0.55 0.22 295 / 0.18) 0%, transparent 55%)," +
            "linear-gradient(180deg, oklch(0.13 0.012 290 / 0.55) 0%, oklch(0.13 0.012 290 / 0.3) 35%, oklch(0.13 0.012 290 / 0.94) 100%)",
        }}
      />
      {/* 40px grid */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.92 0.012 290 / 0.04) 0 1px, transparent 1px 40px)," +
            "repeating-linear-gradient(90deg, oklch(0.92 0.012 290 / 0.04) 0 1px, transparent 1px 40px)",
        }}
      />
      {/* faint scanlines */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.92 0.012 290 / 0.025) 0 1px, transparent 1px 3px)",
        }}
      />
    </div>
  );
}
