import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavbarProvider } from "@/components/navbar-provider"
import Navbar from "@/components/navbar"
import CustomCursor from "@/components/custom-cursor"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Veer Modi | Full-Stack Developer & UI/UX Designer",
  description: "Professional portfolio showcasing Veer Modi's skills and projects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="blue-dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="blue-dark"
          themes={["purple-dark", "blue-dark", "red-dark"]}
        >
          <NavbarProvider>
            <Navbar />
            <CustomCursor />
            {children}
          </NavbarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
