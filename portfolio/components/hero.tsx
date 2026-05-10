"use client"

import { motion } from "framer-motion"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import { ThemeToggle } from "./theme-toggle"
import { Download } from "lucide-react"
import ResumeModal from "@/components/resume-modal"

export default function Hero() {
  const [text] = useTypewriter({
    words: ["Full Stack Developer", "Backend Developer", "Frontend Developer", "React Specialist", "System Architect"],
    loop: true,
    delaySpeed: 2000,
  })

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="backdrop-blur-2xl bg-background/40 p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 border-b-white/5 border-r-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)] max-w-4xl w-full mx-4 md:mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ y: -5 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Veer Modi
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl text-center text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Passionate{" "}
          <span className="text-primary font-medium">
            {text}
            <Cursor cursorColor="currentColor" />
          </span>
        </motion.div>

        <motion.p
          className="text-center text-lg max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          I create scalable, responsive, and robust web applications with a focus on React, Node.js, and
          modern full stack technologies.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium text-center cursor-interact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>

          <ResumeModal>
            <motion.button
              className="bg-background hover:bg-accent border border-border px-6 py-3 rounded-md font-medium text-center flex items-center justify-center gap-2 cursor-interact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" />
              Resume
            </motion.button>
          </ResumeModal>
        </motion.div>

        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </motion.div>
    </section>
  )
}
