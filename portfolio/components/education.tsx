"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, Calendar, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const educationData = [
  {
    period: "2018 - 2022",
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    description: "Graduated with honors. Specialized in web development and user interface design.",
    logo: "/placeholder.svg?height=80&width=80",
    link: "#",
  },
  {
    period: "2022 - 2023",
    degree: "Master of Science in User Experience Design",
    institution: "Design Institute",
    description: "Focused on creating intuitive and accessible digital experiences.",
    logo: "/placeholder.svg?height=80&width=80",
    link: "#",
  },
  {
    period: "2023",
    degree: "Full-Stack Web Development Certification",
    institution: "Tech Academy",
    description: "Intensive program covering modern web development technologies and practices.",
    logo: "/placeholder.svg?height=80&width=80",
    link: "#",
  },
  {
    period: "2023",
    degree: "UI/UX Design Professional Certificate",
    institution: "Design School Online",
    description: "Comprehensive training in user interface and experience design principles.",
    logo: "/placeholder.svg?height=80&width=80",
    link: "#",
  },
]

export default function Education() {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useState(() => {
    setMounted(true)
  })

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

  return (
    <section id="education" className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and professional certifications that have shaped my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              className={cn(
                "backdrop-blur-xl bg-background/20 rounded-xl border transition-all duration-300 cursor-interact overflow-hidden",
                activeItem === index
                  ? "border-primary shadow-lg scale-[1.02]"
                  : "border-border/50 hover:border-primary/50",
                getThemeShadowColor(),
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-xl flex items-center justify-center bg-primary/10",
                        activeItem === index ? "bg-primary/20" : "",
                      )}
                    >
                      <img
                        src={item.logo || "/placeholder.svg"}
                        alt={item.institution}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <motion.div
                      className={cn(
                        "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                        activeItem === index ? "bg-primary" : "bg-muted",
                      )}
                      animate={{
                        rotate: activeItem === index ? 360 : 0,
                      }}
                      transition={{ duration: 2, repeat: activeItem === index ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      {index % 2 === 0 ? (
                        <GraduationCap className="h-3 w-3 text-primary-foreground" />
                      ) : (
                        <Award className="h-3 w-3 text-primary-foreground" />
                      )}
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{item.degree}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.period}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">{item.institution}</p>
                    <p className="mb-4">{item.description}</p>

                    <motion.a
                      href={item.link}
                      className={cn(
                        "inline-flex items-center gap-1 text-sm font-medium cursor-interact",
                        activeItem === index ? "text-primary" : "text-muted-foreground",
                      )}
                      whileHover={{ x: 5 }}
                    >
                      View Certificate
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {activeItem === index && (
                <motion.div
                  className="h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
