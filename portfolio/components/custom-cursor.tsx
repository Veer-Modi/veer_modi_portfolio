"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const { theme } = useTheme()

  // Spring animations for smoother cursor movement
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handlePointerElements = () => {
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const isClickable =
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains("cursor-interact")

        setIsPointer(isClickable)
      }

      window.addEventListener("mouseover", handleMouseOver)
      return () => window.removeEventListener("mouseover", handleMouseOver)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)

    const cleanup = handlePointerElements()

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cleanup()
    }
  }, [cursorX, cursorY])

  // Don't render on mobile devices
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null
  }

  const getCursorColor = () => {
    if (theme?.includes("purple")) {
      return "rgba(168, 85, 247, 0.8)"
    } else if (theme?.includes("blue")) {
      return "rgba(59, 130, 246, 0.8)"
    } else if (theme?.includes("red")) {
      return "rgba(239, 68, 68, 0.8)"
    } else {
      return "rgba(255, 255, 255, 0.8)"
    }
  }

  return (
    <>
      {/* Outer blur effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "transparent",
          boxShadow: `0 0 20px 5px ${getCursorColor()}`,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
      />

      {/* Inner cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "white",
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0.5 : 1,
        }}
      />
    </>
  )
}
