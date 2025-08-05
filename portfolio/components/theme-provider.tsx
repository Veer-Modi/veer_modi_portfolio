"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Ensure we only render theme switching UI after hydration
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Add a class to prevent transition flashes during theme changes
  const handleThemeChange = () => {
    document.documentElement.classList.add("no-transition")
    setTimeout(() => {
      document.documentElement.classList.remove("no-transition")
    }, 100)
  }

  return (
    <NextThemesProvider {...props} onThemeChange={handleThemeChange}>
      {children}
    </NextThemesProvider>
  )
}
