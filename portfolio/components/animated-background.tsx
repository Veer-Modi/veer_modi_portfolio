"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId = 0
    let resizeTimer: number | null = null

    // viewport (CSS pixels)
    let vw = window.innerWidth
    let vh = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const sizeCanvas = () => {
      vw = window.innerWidth
      vh = window.innerHeight
      canvas.style.width = `${vw}px`
      canvas.style.height = `${vh}px`
      canvas.width = Math.floor(vw * dpr)
      canvas.height = Math.floor(vh * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Get color palette based on theme for the glowing orbs
    const getThemeColors = () => {
      if (theme?.includes("purple")) {
        return ["rgba(147, 51, 234, 0.4)", "rgba(168, 85, 247, 0.4)", "rgba(192, 132, 252, 0.4)", "rgba(126, 34, 206, 0.3)"]
      } else if (theme?.includes("blue")) {
        return ["rgba(37, 99, 235, 0.4)", "rgba(59, 130, 246, 0.4)", "rgba(96, 165, 250, 0.4)", "rgba(29, 78, 216, 0.3)"]
      } else if (theme?.includes("red")) {
        return ["rgba(220, 38, 38, 0.4)", "rgba(239, 68, 68, 0.4)", "rgba(248, 113, 113, 0.4)", "rgba(185, 28, 28, 0.3)"]
      } else if (theme?.includes("dark")) {
        return ["rgba(100, 116, 139, 0.4)", "rgba(148, 163, 184, 0.4)", "rgba(203, 213, 225, 0.4)", "rgba(71, 85, 105, 0.3)"]
      } else {
        return ["rgba(209, 213, 219, 0.4)", "rgba(156, 163, 175, 0.4)", "rgba(107, 114, 128, 0.4)", "rgba(75, 85, 99, 0.3)"]
      }
    }

    const colors = getThemeColors()

    class GlowingOrb {
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
      baseX: number
      baseY: number
      timeOffset: number

      constructor(index: number) {
        this.radius = Math.random() * (vw * 0.3) + (vw * 0.15) // Large radii for aurora feel
        this.x = Math.random() * vw
        this.y = Math.random() * vh
        this.baseX = this.x
        this.baseY = this.y
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.color = colors[index % colors.length]
        this.timeOffset = Math.random() * 1000
      }

      update(time: number) {
        // Slow drifting + sine wave oscillation
        this.x += this.vx
        this.y += this.vy
        
        const oscX = Math.sin(time * 0.0005 + this.timeOffset) * 50
        const oscY = Math.cos(time * 0.0007 + this.timeOffset) * 50

        // Bounce off edges gently
        if (this.x < -this.radius || this.x > vw + this.radius) this.vx *= -1
        if (this.y < -this.radius || this.y > vh + this.radius) this.vy *= -1

        this.draw(this.x + oscX, this.y + oscY)
      }

      draw(x: number, y: number) {
        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx!.beginPath()
        ctx!.arc(x, y, this.radius, 0, Math.PI * 2)
        ctx!.fillStyle = gradient
        ctx!.fill()
      }
    }

    let orbs: GlowingOrb[] = []
    
    const initOrbs = () => {
      orbs = []
      const numOrbs = Math.min(Math.floor(vw / 200) + 3, 8) // Dynamic based on screen size
      for (let i = 0; i < numOrbs; i++) {
        orbs.push(new GlowingOrb(i))
      }
    }

    let startTime = performance.now()

    const drawFrame = (time: number) => {
      // Clear background
      ctx!.fillStyle = theme?.includes("dark") ? "rgba(15, 23, 42, 1)" : "rgba(255, 255, 255, 1)"
      ctx!.fillRect(0, 0, vw, vh)

      // Use lighter composite operation for blending glowing effects
      ctx!.globalCompositeOperation = theme?.includes("dark") ? 'screen' : 'multiply'

      orbs.forEach(orb => orb.update(time - startTime))

      // Add a subtle grain overlay
      ctx!.globalCompositeOperation = 'source-over'
      ctx!.fillStyle = theme?.includes("dark") ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"
      ctx!.fillRect(0, 0, vw, vh)

      rafId = requestAnimationFrame(drawFrame)
    }

    const reinit = () => {
      cancelAnimationFrame(rafId)
      sizeCanvas()
      initOrbs()
      startTime = performance.now()
      rafId = requestAnimationFrame(drawFrame)
    }

    reinit()

    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        reinit()
      }, 150)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (resizeTimer) window.clearTimeout(resizeTimer)
      cancelAnimationFrame(rafId)
    }
  }, [theme, mounted])

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Overlay to ensure glassmorphism stands out on top of the animation */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]"></div>
    </motion.div>
  )
}
