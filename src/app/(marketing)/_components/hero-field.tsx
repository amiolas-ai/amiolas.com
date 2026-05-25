"use client";

import { useEffect, useRef } from "react";

/**
 * Living hero backdrop = two restrained layers behind the static blueprint:
 *   1. a slow violet aura that breathes (CSS, survives no-JS / reduced-motion)
 *   2. a particle network that drifts and links/unlinks as nodes pass —
 *      the brand metaphor: severed points reconnecting (continuity of meaning).
 *
 * Canvas 2D only. Node counts are deliberately small, the loop pauses when
 * offscreen, and `prefers-reduced-motion` freezes motion to a single static
 * frame (aura stays, particles hold still). Purely decorative → aria-hidden.
 */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

// Brand violet (hue 295) read straight from the design canon. Kept as plain
// strings because canvas can't resolve oklch() in older Safari reliably; these
// mirror --color-brand at low alpha.
const NODE_FILL = "oklch(0.55 0.22 295 / 0.55)";
const LINK_STROKE = "oklch(0.55 0.22 295)";

const DESKTOP_NODES = 40;
const MOBILE_NODES = 18;
const MOBILE_MAX_WIDTH = 640;

// Link fades in below this center-to-center distance (CSS px).
const LINK_DISTANCE = 132;
const MAX_DPR = 2;
const DRIFT_SPEED = 0.12; // px per frame at 60fps — barely perceptible

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let rafId: number | null = null;
    let visible = true;

    const nodeCount = () =>
      window.innerWidth <= MOBILE_MAX_WIDTH ? MOBILE_NODES : DESKTOP_NODES;

    const seedNodes = () => {
      const count = nodeCount();
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * DRIFT_SPEED * 2,
        vy: (Math.random() - 0.5) * DRIFT_SPEED * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links first, so nodes sit on top.
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= LINK_DISTANCE) continue;
          // Closer = stronger; the fade is the reconnection metaphor.
          const strength = 1 - dist / LINK_DISTANCE;
          ctx.globalAlpha = strength * 0.32;
          ctx.strokeStyle = LINK_STROKE;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = NODE_FILL;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        // Soft wrap with a small margin so links don't pop at the edges.
        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;
      }
      draw();
      rafId = window.requestAnimationFrame(step);
    };

    const start = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (rafId === null) return;
      window.cancelAnimationFrame(rafId);
      rafId = null;
    };

    const applyMotionPreference = () => {
      stop();
      if (reduceMotionQuery.matches) {
        // Hold a single static frame — aura (CSS) still breathes faintly.
        draw();
        return;
      }
      if (visible) start();
    };

    resize();
    applyMotionPreference();

    // Pause when the hero scrolls out of view to spare INP/CPU.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (reduceMotionQuery.matches) return;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onResize = () => {
      resize();
      // Re-paint after reseed even if currently paused.
      if (rafId === null) draw();
    };
    window.addEventListener("resize", onResize);
    reduceMotionQuery.addEventListener("change", applyMotionPreference);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      reduceMotionQuery.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Violet aura — restrained, hero-only per AGENTS.md §3 */}
      <div
        className="absolute left-1/2 top-[42%] aspect-square w-[min(760px,80%)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[40px] animate-aura-pulse max-lg:opacity-50 max-sm:opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-brand-glow), var(--color-brand-glow-soft) 55%, transparent 75%)",
        }}
      />
      {/* Particle network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-60 max-lg:opacity-45 max-sm:opacity-25"
      />
    </div>
  );
}
