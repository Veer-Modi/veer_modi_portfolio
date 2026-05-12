"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Download, ExternalLink, X, FileText } from "lucide-react"

import { cn } from "@/lib/utils"

export default function ResumeModal({ children, className }: { children: React.ReactNode, className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-[95vw] max-w-5xl h-[90vh] flex flex-col bg-card/90 backdrop-blur-xl border-t border-l border-white/20 border-b border-r border-white/5 rounded-2xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)] overflow-hidden"
          >
            {/* Header & Actions */}
            <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 shrink-0 bg-card/50">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Resume
              </h2>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a 
                  href="/Veer_Resume_2.0.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex justify-center items-center gap-2 py-2 px-4 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium cursor-interact"
                >
                  <ExternalLink className="h-4 w-4" /> View
                </a>
                <a 
                  href="/Veer_Resume_2.0.pdf" 
                  download="Veer_Resume_2.0.pdf"
                  className="flex-1 sm:flex-none flex justify-center items-center gap-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm font-medium cursor-interact"
                >
                  <Download className="h-4 w-4" /> Download
                </a>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors ml-1 sm:ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Resume Preview Canvas */}
            <div className="flex-1 w-full bg-white relative overflow-hidden">
              <iframe 
                src="/Veer_Resume_2.0.pdf#view=FitH" 
                className="absolute inset-0 w-full h-full border-none"
                title="Resume Preview"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* Trigger Wrapper */}
      <div onClick={() => setIsOpen(true)} className={cn("inline-block", className)}>
        {children}
      </div>

      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  )
}
