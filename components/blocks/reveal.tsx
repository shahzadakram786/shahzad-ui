"use client"

import { motion, type HTMLMotionProps } from "framer-motion"

type Direction = "up" | "down" | "left" | "right" | "none"

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
}

export interface RevealProps extends HTMLMotionProps<"div"> {
  direction?: Direction
  delay?: number
  duration?: number
  /** Animate only the first time it scrolls into view (default true) */
  once?: boolean
}

/**
 * Fade + slide in when scrolled into view.
 * Wrap any section/card: <Reveal delay={0.1}>...</Reveal>
 */
export function Reveal({
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
