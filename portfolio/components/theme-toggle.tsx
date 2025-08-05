"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Palette, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showThemeSelector, setShowThemeSelector] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [theme])

  if (!mounted) return null

  const handleThemeChange = (newTheme: string) => {
    setTheme(`${newTheme}-dark`)
    setShowThemeSelector(false)
  }

  const colorThemes = [
    { name: "purple", label: "Purple", color: "bg-purple-500" },
    { name: "blue", label: "Blue", color: "bg-blue-500" },
    { name: "red", label: "Red", color: "bg-red-500" },
  ]

  const getCurrentThemeBase = () => {
    if (theme?.includes("purple")) return "purple"
    if (theme?.includes("blue")) return "blue"
    if (theme?.includes("red")) return "red"
    return "blue"
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <motion.button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className="p-2 rounded-md hover:bg-accent cursor-interact"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Select theme color"
          data-cursor-type="button"
        >
          <Palette className="h-5 w-5" />
        </motion.button>
      </div>

      <AnimatePresence>
        {showThemeSelector && (
          <motion.div
            className="absolute right-0 mt-2 p-3 bg-background/95 backdrop-blur-md rounded-md shadow-lg border border-border flex flex-col gap-2 z-50 w-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="text-sm font-medium mb-1 text-muted-foreground">Theme Color</div>
            {colorThemes.map((t) => (
              <button
                key={t.name}
                onClick={() => handleThemeChange(t.name)}
                className={cn(
                  "p-2 rounded-md flex items-center justify-between cursor-interact",
                  getCurrentThemeBase() === t.name ? "bg-accent" : "hover:bg-accent/50",
                )}
                data-cursor-type="theme"
              >
                <div className="flex items-center gap-2">
                  <div className={`h-4 w-4 rounded-full ${t.color}`} />
                  <span>{t.label}</span>
                </div>
                {getCurrentThemeBase() === t.name && <Check className="h-4 w-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
