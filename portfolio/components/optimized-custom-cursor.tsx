"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"

export default function OptimizedCustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  const handlePointerEnter = useCallback(() => setIsPointer(true), [])
  const handlePointerLeave = useCallback(() => setIsPointer(false), [])

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia("(hover: hover)").matches
    if (!hasHover) return

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    // Add pointer detection to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-interact')

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handlePointerEnter, { passive: true })
      el.addEventListener("mouseleave", handlePointerLeave, { passive: true })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handlePointerEnter)
        el.removeEventListener("mouseleave", handlePointerLeave)
      })
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handlePointerEnter, handlePointerLeave])

  if (!isVisible) return null

  const getThemeColors = () => {
    switch (theme) {
      case "purple-dark":
        return { primary: "rgb(196, 181, 253)", secondary: "rgb(139, 92, 246)" }
      case "red-dark":
        return { primary: "rgb(248, 113, 113)", secondary: "rgb(239, 68, 68)" }
      default: // blue-dark
        return { primary: "rgb(147, 197, 253)", secondary: "rgb(59, 130, 246)" }
    }
  }

  const colors = getThemeColors()

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden lg:block">
      {/* Outer cursor */}
      <div
        className="absolute rounded-full transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: isPointer ? 60 : 40,
          height: isPointer ? 60 : 40,
          background: `radial-gradient(circle, ${colors.primary}20, transparent 70%)`,
          backdropFilter: "blur(4px)",
          border: `1px solid ${colors.primary}40`,
          transform: isPointer ? "scale(1.2)" : "scale(1)",
        }}
      />

      {/* Inner cursor */}
      <div
        className="absolute rounded-full transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          backgroundColor: colors.secondary,
          boxShadow: `0 0 20px ${colors.secondary}60, 0 0 40px ${colors.secondary}30`,
          transform: isPointer ? "scale(1.5)" : "scale(1)",
        }}
      />
    </div>
  )
}
