"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { Download, User, Code, Briefcase, GraduationCap, Mail, Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about", icon: <User className="h-5 w-5" /> },
  { name: "Skills", href: "#skills", icon: <Code className="h-5 w-5" /> },
  { name: "Projects", href: "#projects", icon: <Briefcase className="h-5 w-5" /> },
  { name: "Education", href: "#education", icon: <GraduationCap className="h-5 w-5" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="h-5 w-5" /> },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { theme } = useTheme()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const getNavbarShadow = () => {
    if (theme?.includes("dark")) {
      return "shadow-white/10"
    }
    return "shadow-black/10"
  }

  return (
    <>
      {/* Mobile Top Navbar - Always visible on mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/20 px-4 py-3 flex justify-between items-center">
        <motion.a
          href="#"
          className="font-bold text-lg text-foreground whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Veer Modi
        </motion.a>

        <div className="flex items-center gap-2">
          <motion.a
            href="#"
            className="flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-3 w-3" />
            <span>Resume</span>
          </motion.a>

          <ThemeToggle />

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-1.5 rounded-md bg-background/80 border border-border/50"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-t border-border/20 px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn("mobile-navbar-item", activeSection === item.href.substring(1) ? "active" : "")}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-accent/50"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col gap-4 items-center">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-8 py-3 rounded-md text-lg font-medium flex items-center gap-3",
                    activeSection === item.href.substring(1) ? "bg-primary/10 text-primary" : "hover:bg-accent/50",
                  )}
                  onClick={() => setShowMobileMenu(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                href="#"
                className="mt-4 flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-md text-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileMenu(false)}
              >
                <Download className="h-5 w-5" />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
