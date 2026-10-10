"use client"

import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    // reducedMotion="user": framer drops transform animations for visitors
    // who ask for less motion, everywhere, without each component checking.
    <MotionConfig reducedMotion="user">
      {/* initial={false}: the first page is server-rendered visible. Without
          it the whole document shipped at opacity 0 and stayed blank until
          JavaScript ran — or forever, if it never did. Route changes still
          fade. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
