"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

/*
 * Scroll reveals are decoration; the content is not. The server HTML carries
 * the hidden starting state inline, so every reveal is tagged `data-reveal`
 * and CSS overrides it in the two cases where it must not apply:
 *   - prefers-reduced-motion: reduce → shown in place (globals.css)
 *   - no JavaScript → shown in place (<noscript> rule in the root layout)
 * Both are pure CSS on purpose: branching the markup on a client-only media
 * query would make the server and client render differently and break
 * hydration.
 */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-15% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      data-reveal
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 1,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  return (
    // Screen readers get the sentence once, not word by word.
    <div ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            data-reveal
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
