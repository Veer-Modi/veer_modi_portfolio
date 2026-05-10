"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InitialLoader({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Artificial delay to ensure animation is seen
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.5, // "Zoom out" effect (camera zooms in, meaning loader scales up)
              filter: "blur(10px)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Monogram Container */}
            <motion.div
              className="relative flex items-center justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glowing background blur */}
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
              
              {/* SVG Line Drawing VM Monogram */}
              <svg width="200" height="200" viewBox="0 0 200 200" className="z-10 relative overflow-visible drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] drop-shadow-[0_0_16px_rgba(59,130,246,0.5)]">
                {/* Outer Ring with Tails */}
                <motion.path
                  d="M 98 20 L 104 8 L 85 22 A 80 80 0 0 0 20 100 A 80 80 0 0 0 115 178 L 96 192 L 100 180 A 80 80 0 0 0 180 100 A 80 80 0 0 0 98 20 Z"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  className="text-primary"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Inner Dot */}
                <motion.circle
                  cx="100"
                  cy="42"
                  r="11"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-primary"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Left V-Wing */}
                <motion.path
                  d="M 50 60 L 68 60 L 68 106 L 60 122 Z"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  className="text-primary"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Right V-Wing */}
                <motion.path
                  d="M 150 60 L 132 60 L 132 106 L 140 122 Z"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  className="text-primary"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Center M */}
                <motion.path
                  d="M 72 75 L 86 75 L 100 103 L 114 75 L 128 75 L 128 119 L 100 175 L 72 119 Z"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  className="text-primary"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Center M Inner Chevron */}
                <motion.path
                  d="M 86 125 L 100 153 L 114 125 L 100 137 Z"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  className="text-primary"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 3.5, times: [0, 0.3, 0.8, 1], repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* Loading Bar Container */}
            <motion.div 
              className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Infinite Looping Bar */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-primary rounded-full"
                animate={{
                  left: ["-100%", "100%"],
                  right: ["100%", "-100%"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
            
            <motion.p
              className="mt-4 text-sm text-white/50 tracking-widest font-medium uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Initializing
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content wrapped in a motion div to create the opposing zoom effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isLoading ? 0 : 1, 
          scale: isLoading ? 0.95 : 1 
        }}
        transition={{ duration: 0.8, delay: isLoading ? 0 : 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  )
}
