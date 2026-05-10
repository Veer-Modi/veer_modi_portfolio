"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, ExternalLink, X, FileText } from "lucide-react"

export default function ResumeModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Trigger Wrapper */}
      <div onClick={() => setIsOpen(true)} className="inline-block">
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
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
              className="relative w-full max-w-md bg-card/80 backdrop-blur-xl border-t border-l border-white/20 border-b border-r border-white/5 rounded-2xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resume Overview
                  </h2>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 opacity-70 hover:opacity-100" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <a 
                    href="/Veer_Resume_2.0.pdf" 
                    download="Veer_Resume_2.0.pdf"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group cursor-interact"
                  >
                    <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                      <Download className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Download Resume</h3>
                      <p className="text-sm text-white/50">Save the PDF to your device</p>
                    </div>
                  </a>

                  <a 
                    href="/Veer_Resume_2.0.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group cursor-interact"
                  >
                    <div className="p-3 rounded-lg bg-white/10 text-white group-hover:scale-110 transition-transform">
                      <ExternalLink className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">View in Browser</h3>
                      <p className="text-sm text-white/50">Open and read in a new tab</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
