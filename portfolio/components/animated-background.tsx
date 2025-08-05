"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Track mouse position
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 180

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", updateMousePosition)

    // Unique animation: Crystalline Network
    class CrystalNode {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      connections: CrystalNode[]
      color: string
      pulseSpeed: number
      pulseOffset: number
      time: number
      maxConnections: number
      nodeType: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.connections = []
        this.color = getRandomColor(0.4)
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2
        this.time = 0
        this.maxConnections = Math.floor(Math.random() * 3) + 2
        this.nodeType = Math.floor(Math.random() * 3) // 0: circle, 1: square, 2: diamond
      }

      update() {
        this.time += 0.01

        // Subtle movement with sine wave pattern
        this.x += this.speedX + Math.sin(this.time * 0.5) * 0.1
        this.y += this.speedY + Math.cos(this.time * 0.5) * 0.1

        // Boundary check with bounce
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
          this.x = this.x < 0 ? 0 : canvas.width
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
          this.y = this.y < 0 ? 0 : canvas.height
        }

        // Mouse interaction - gentle repulsion
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius
          const angle = Math.atan2(dy, dx)
          this.x -= Math.cos(angle) * force * 1.5
          this.y -= Math.sin(angle) * force * 1.5
        }
      }

      draw() {
        if (!ctx) return

        // Pulsing effect
        const pulse = Math.sin(this.time * this.pulseSpeed + this.pulseOffset) * 0.5 + 0.5
        const size = this.size * (1 + pulse * 0.5)

        ctx.save()
        ctx.translate(this.x, this.y)

        // Draw different node shapes based on nodeType
        ctx.fillStyle = this.color

        if (this.nodeType === 0) {
          // Circle
          ctx.beginPath()
          ctx.arc(0, 0, size, 0, Math.PI * 2)
          ctx.fill()
        } else if (this.nodeType === 1) {
          // Square
          ctx.rotate(this.time * 0.1)
          ctx.fillRect(-size, -size, size * 2, size * 2)
        } else {
          // Diamond
          ctx.beginPath()
          ctx.moveTo(0, -size * 1.5)
          ctx.lineTo(size, 0)
          ctx.lineTo(0, size * 1.5)
          ctx.lineTo(-size, 0)
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()
      }
    }

    // Get theme-based colors
    const getRandomColor = (opacity = 1) => {
      let colors = []

      if (theme?.includes("purple")) {
        colors = ["rgba(147, 51, 234,", "rgba(168, 85, 247,", "rgba(192, 132, 252,"]
      } else if (theme?.includes("blue")) {
        colors = ["rgba(37, 99, 235,", "rgba(59, 130, 246,", "rgba(96, 165, 250,"]
      } else if (theme?.includes("red")) {
        colors = ["rgba(220, 38, 38,", "rgba(239, 68, 68,", "rgba(248, 113, 113,"]
      } else if (theme?.includes("dark")) {
        colors = ["rgba(100, 116, 139,", "rgba(148, 163, 184,", "rgba(203, 213, 225,"]
      } else {
        colors = ["rgba(209, 213, 219,", "rgba(156, 163, 175,", "rgba(107, 114, 128,"]
      }

      return `${colors[Math.floor(Math.random() * colors.length)]} ${opacity})`
    }

    // Create nodes
    const nodes: CrystalNode[] = []
    const nodeCount = Math.min(Math.max(window.innerWidth, window.innerHeight) * 0.05, 100)

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push(new CrystalNode(x, y))
    }

    // Create connections between nodes
    nodes.forEach((node) => {
      // Sort other nodes by distance
      const otherNodes = [...nodes]
        .filter((n) => n !== node)
        .sort((a, b) => {
          const distA = Math.hypot(node.x - a.x, node.y - a.y)
          const distB = Math.hypot(node.x - b.x, node.y - b.y)
          return distA - distB
        })

      // Connect to closest nodes
      for (let i = 0; i < Math.min(node.maxConnections, otherNodes.length); i++) {
        if (!node.connections.includes(otherNodes[i])) {
          node.connections.push(otherNodes[i])
        }
      }
    })

    // Animation loop
    const animate = () => {
      // Create semi-transparent background for trail effect
      ctx.fillStyle = theme?.includes("dark")
        ? "rgba(15, 23, 42, 0.1)" // Dark background
        : "rgba(255, 255, 255, 0.1)" // Light background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw()

        // Draw connections
        node.connections.forEach((connectedNode) => {
          const dx = node.x - connectedNode.x
          const dy = node.y - connectedNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / 200

            // Draw connection line
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)

            // Create curved connections
            const midX = (node.x + connectedNode.x) / 2
            const midY = (node.y + connectedNode.y) / 2
            const offset = Math.sin(node.time) * 10

            // Bezier curve for organic feel
            ctx.quadraticCurveTo(midX + offset, midY + offset, connectedNode.x, connectedNode.y)

            ctx.strokeStyle = getRandomColor(opacity * 0.3)
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [theme, mounted])

  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </motion.div>
  )
}
