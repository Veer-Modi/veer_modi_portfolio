"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"
import { Download, User, Code, Briefcase, GraduationCap, Mail, Menu, X } from "lucide-react"
import ResumeModal from "@/components/resume-modal"

const navItems = [
  { name: "About", href: "#about", icon: <User className="h-5 w-5 md:mr-2 md:h-4 md:w-4" /> },
  { name: "Skills", href: "#skills", icon: <Code className="h-5 w-5 md:mr-2 md:h-4 md:w-4" /> },
  { name: "Projects", href: "#projects", icon: <Briefcase className="h-5 w-5 md:mr-2 md:h-4 md:w-4" /> },
  { name: "Certifications", href: "#certifications", icon: <GraduationCap className="h-5 w-5 md:mr-2 md:h-4 md:w-4" /> },
  { name: "Contact", href: "#contact", icon: <Mail className="h-5 w-5 md:mr-2 md:h-4 md:w-4" /> },
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
      setIsScrolled(scrollPosition > 50)
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

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={cn(
          "hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-4 backdrop-blur-xl bg-background/50 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "py-6 bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.a
            href="#"
            className="font-bold text-2xl tracking-tighter drop-shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Veer Modi
          </motion.a>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-background/30 backdrop-blur-xl px-2 py-1 rounded-full border border-border/20 shadow-sm">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center",
                    activeSection === item.href.substring(1)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent hover:text-accent-foreground text-foreground/80"
                  )}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <ResumeModal>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-4 w-4" />
                  <span>Resume</span>
                </motion.button>
              </ResumeModal>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Navbar - Visible only on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-4 py-3 flex justify-between items-center">
        <motion.a
          href="#"
          className="font-bold text-lg text-foreground whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Veer Modi
        </motion.a>

        <div className="flex items-center gap-2">
          <ResumeModal>
            <motion.button
              className="flex items-center gap-1 px-2 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium whitespace-nowrap shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-3 w-3" />
              <span>Resume</span>
            </motion.button>
          </ResumeModal>

          <ThemeToggle />

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-1.5 rounded-md bg-background/80 border border-border/50 shadow-sm"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-t border-white/20 px-4 py-2 pb-safe shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn("flex flex-col items-center p-2 rounded-lg transition-colors", activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground")}
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="md:hidden fixed inset-0 z-[60] bg-background/90 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-accent/50 hover:bg-accent transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col gap-4 items-center w-full px-6">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "w-full py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-3 transition-colors",
                    activeSection === item.href.substring(1) ? "bg-primary/20 text-primary border border-primary/30" : "bg-accent/40 hover:bg-accent/60 text-foreground"
                  )}
                  onClick={() => setShowMobileMenu(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon}
                  {item.name}
                </motion.a>
              ))}

              <ResumeModal className="w-full mt-4">
                <motion.button
                  className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl text-lg font-medium shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Download className="h-5 w-5" />
                  <span>Resume</span>
                </motion.button>
              </ResumeModal>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
