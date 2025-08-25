"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Code, Palette, Server, Wrench, Cloud } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Code className="h-6 w-6" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Angular", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Reddis", level: 70 },
    ],
  },
  {
    title: "UI/UX",
    icon: <Palette className="h-6 w-6" />,
    skills: [
      { name: "Figma", level: 90 },
    ],
  },
  {
    title: "Tools",
    icon: <Wrench className="h-6 w-6" />,
    skills: [
      { name: "Git", level: 85 },
      { name: "Docker", level: 70 },
      { name: "GitHub", level: 75 },
    ],
  },
  {
    title: "Cloud",
    icon: <Cloud className="h-6 w-6" />,
    skills: [
      { name: "Vercel", level: 90 },
      { name: "Netlify", level: 85 },
      { name: "Render", level: 60 },
    ],
  },
]

export default function Skills() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>("Frontend") // Default to Frontend

  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemeShadowColor = () => {
    if (!mounted) return ""

    if (theme?.includes("purple")) {
      return theme.includes("dark") ? "shadow-purple-300/20" : "shadow-purple-500/20"
    } else if (theme?.includes("blue")) {
      return theme.includes("dark") ? "shadow-blue-300/20" : "shadow-blue-500/20"
    } else if (theme?.includes("red")) {
      return theme.includes("dark") ? "shadow-red-300/20" : "shadow-red-500/20"
    } else if (theme?.includes("dark")) {
      return "shadow-white/20"
    } else {
      return "shadow-black/20"
    }
  }

  const getThemeColor = () => {
    if (!mounted) return ""

    if (theme?.includes("purple")) {
      return theme.includes("dark") ? "bg-purple-500" : "bg-purple-500"
    } else if (theme?.includes("blue")) {
      return theme.includes("dark") ? "bg-blue-500" : "bg-blue-500"
    } else if (theme?.includes("red")) {
      return theme.includes("dark") ? "bg-red-500" : "bg-red-500"
    } else if (theme?.includes("dark")) {
      return "bg-white"
    } else {
      return "bg-black"
    }
  }

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've developed expertise across the full stack, with a focus on creating beautiful and functional user
            experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="md:col-span-1">
            <div className="space-y-4 sticky top-24">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className={cn(
                    "backdrop-blur-md bg-background/30 p-5 rounded-xl border transition-all cursor-pointer",
                    activeCategory === category.title
                      ? "border-primary shadow-lg"
                      : "border-border/50 hover:border-primary/50",
                    getThemeShadowColor(),
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveCategory(category.title)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "backdrop-blur-md bg-background/30 p-6 rounded-xl border border-primary/50",
                  getThemeShadowColor(),
                )}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {skillCategories.find((c) => c.title === activeCategory)?.icon}
                  </div>
                  {activeCategory} Skills
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skillCategories
                    .find((c) => c.title === activeCategory)
                    ?.skills.map((skill, idx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-background/50 p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all cursor-interact"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex justify-between mb-3">
                          <span className="text-lg font-medium">{skill.name}</span>
                          {/* <span className="text-sm font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {skill.level}%
                          </span> */}
                        </div>

                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => {
                            const starLevel = (i + 1) * 20
                            return (
                              <motion.div
                                key={i}
                                className="flex-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                              >
                                <motion.div
                                  className={cn(
                                    "h-2 rounded-full",
                                    skill.level >= starLevel ? getThemeColor() : "bg-muted/30",
                                  )}
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{
                                    delay: 0.3 + idx * 0.1 + i * 0.05,
                                    duration: 0.5,
                                    ease: "easeOut",
                                  }}
                                />
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
