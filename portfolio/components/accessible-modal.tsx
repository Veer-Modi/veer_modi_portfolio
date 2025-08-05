"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  description?: string
}

export default function AccessibleModal({ isOpen, onClose, children, title, description }: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus the modal
      modalRef.current?.focus()

      // Prevent body scroll
      document.body.style.overflow = "hidden"

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose()
        }
      }

      document.addEventListener("keydown", handleEscape)

      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "unset"

        // Restore focus to previously focused element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-4xl max-h-[95vh] mx-4 bg-background border border-border rounded-lg shadow-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 id="modal-title" className="text-2xl font-bold text-foreground">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">{children}</div>

        {/* Footer with close button for mobile */}
        <div className="p-6 border-t border-border bg-muted/30 sm:hidden">
          <Button onClick={onClose} className="w-full" size="lg">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
