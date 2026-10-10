"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small dot tracking the pointer 1:1 + a softly-lerping ring
 * that grows when over interactive elements. Uses mix-blend-difference so it
 * reads on any background. Disabled on coarse pointers (touch).
 *
 * Implementation note — refs must exist when the effect attaches listeners.
 * We keep the DOM mounted always and toggle visibility via opacity + body
 * `cursor: none`, so refs are stable across enable/disable transitions.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // 1) Detect pointer kind once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: coarse)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // 2) Hide the OS cursor while ours is enabled.
  useEffect(() => {
    if (!enabled) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = prev;
    };
  }, [enabled]);

  // 3) Bind mouse listeners + RAF only when enabled and refs exist.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

    // The ring eases toward the pointer and the loop stops once it arrives,
    // so a still mouse costs nothing; the next move starts it again.
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = !!t.closest(
        "a, button, [role='button'], [data-magnetic], [data-cursor='hover'], input, textarea, select, label",
      );
      setHovering(isInteractive);
    };
    const onLeaveDoc = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterDoc = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-[6px] w-[6px] rounded-full bg-[var(--accent)] mix-blend-difference"
        style={{
          willChange: "transform",
          opacity: enabled ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-[var(--foreground)] mix-blend-difference transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          opacity: enabled ? (hovering ? 0.9 : 0.45) : 0,
          willChange: "transform, width, height",
        }}
      />
    </>
  );
}
