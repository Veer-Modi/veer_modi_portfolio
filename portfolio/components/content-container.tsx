"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ContentContainer({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height and check if we've scrolled halfway through it
      const heroHeight = window.innerHeight
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > heroHeight / 2)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "transition-all duration-700 ease-in-out",
          scrolled
            ? "container mx-auto px-4 md:px-8 rounded-xl backdrop-blur-md bg-background/30 border border-border/30 shadow-lg"
            : "w-full",
        )}
        initial={false}
        animate={{
          maxWidth: scrolled ? "1400px" : "100%",
          paddingTop: scrolled ? 30 : 0,
          paddingBottom: scrolled ? 30 : 0,
          marginTop: scrolled ? 30 : 0,
          marginBottom: scrolled ? 30 : 0,
        }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
