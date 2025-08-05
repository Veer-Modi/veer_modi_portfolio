"use client"

import { motion } from "framer-motion"
import { User, Code, Briefcase, Award, Heart } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function   About() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoverElement, setHoverElement] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getThemeAccentColor = () => {
    switch (theme) {
      case "purple":
        return "bg-purple-500/10"
      case "blue":
        return "bg-blue-500/10"
      case "red":
        return "bg-red-500/10"
      case "dark":
        return "bg-gray-700/10"
      default:
        return "bg-gray-200/50"
    }
  }

  const aboutItems = [
    {
      id: "background",
      icon: <User className="h-6 w-6" />,
      title: "Background",
      content:
        "In web development and design, I've worked with startups and established companies to create impactful digital experiences. My journey began with a passion for creating intuitive interfaces and has evolved into a comprehensive approach to product development.",
    },
    {
      id: "technical",
      icon: <Code className="h-6 w-6" />,
      title: "Technical Skills",
      content:
        "My technical toolkit includes proficiency in JavaScript, React ecosystem, state management libraries, frontend frameworks, database design. I stay current with emerging technologies and best practices to ensure my work is both innovative and maintainable.",
    },
    {
      id: "philosophy",
      icon: <Heart className="h-6 w-6" />,
      title: "Design Philosophy",
      content:
        "I believe in user-centered design that balances aesthetics with functionality. My approach prioritizes accessibility, performance, and thoughtful interactions. Every project begins with understanding user needs and business goals to create solutions that are both beautiful and effective.",
    },
    {
      id: "achievements",
      icon: <Award className="h-6 w-6" />,
      title: "Achievements",
      content:
        "Throughout my career, I've been recognized for innovative solutions and technical leadership. My work has contributed to successful product launches, increased user engagement, and business growth. I'm particularly proud of projects that have made complex systems more accessible and user-friendly.",
    },
  ]

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, experience, and design philosophy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="backdrop-blur-md bg-background/30 p-8 rounded-xl border border-border/50 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square relative rounded-xl overflow-hidden mb-6">
              <img src="https://media.licdn.com/dms/image/v2/D4E03AQE7B-KFD_Fneg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723474514441?e=1755734400&v=beta&t=EXpJzrKdaMlAPiz2YwV2yc06raNbUlRIFxT3AJGaeng" alt="Profile" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">Veer Modi</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Full-Stack Developer</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">UI/UX Designer</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Creative Thinker</span>
            </div>

            <p className="text-muted-foreground mb-6">
              I'm a passionate developer and designer focused on creating beautiful, functional, and user-friendly
              digital experiences. With a strong foundation in both design and development, I bridge the gap between
              aesthetics and functionality.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-muted-foreground">Gujarat, India</p>
              </div>
              {/* <div>
                <h4 className="font-medium mb-2">Experience</h4>
                <p className="text-muted-foreground">3+ Years</p>
              </div> */}
              {/* <div>
                <h4 className="font-medium mb-2">Availability</h4>
                <p className="text-muted-foreground">Freelance / Full-time</p>
              </div> */}
              <div>
                <h4 className="font-medium mb-2">Languages</h4>
                <p className="text-muted-foreground">English, Hindi, Gujarati</p>
              </div>
            </div>

            <div className="mt-6 border-t border-border/50 pt-6">
              <h4 className="font-medium mb-3">Education</h4>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">CodingGita x Rai University</p>
                  <p className="text-muted-foreground text-sm">Computer Science & Engineering</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-primary">Current CGPAs: 9.76, 9.44</p>
                    {/* <p className="text-xs text-muted-foreground">2021 - Present</p> */}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {aboutItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={cn(
                  "backdrop-blur-md bg-background/30 p-6 rounded-xl border border-border/50 shadow-lg transition-all duration-300",
                  hoverElement === item.id ? getThemeAccentColor() : "",
                )}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoverElement(item.id)}
                onMouseLeave={() => setHoverElement(null)}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{item.icon}</div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
