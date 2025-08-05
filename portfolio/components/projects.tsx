"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Play, Pause, Eye } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { ProjectModal } from "@/components/project-modal"

const categories = [
  { id: "all", name: "All Projects" },
  { id: "ui-ux", name: "UI/UX Design" },
  { id: "full-stack", name: "Full Stack" },
  { id: "mern", name: "MERN Stack" },
  { id: "figma", name: "Figma Clones" },
  { id: "mobile", name: "Mobile Apps" },
]

const projectsData = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with user authentication, product management, and payment processing.",
    longDescription:
      "A comprehensive e-commerce solution built with the MERN stack. This platform features user authentication, product management, shopping cart functionality, and secure payment processing with Stripe integration. The admin dashboard allows for easy product and order management.",
    image: "/placeholder.svg?height=600&width=800",
    video: null,
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "#",
    demo: "#",
    categories: ["full-stack", "mern"],
    features: [
      "User authentication and profile management",
      "Product search and filtering",
      "Shopping cart and wishlist functionality",
      "Secure checkout with Stripe",
      "Admin dashboard for inventory management",
      "Order tracking and history",
    ],
    technologies: [
      { name: "React", description: "Frontend UI library" },
      { name: "Node.js", description: "Backend runtime" },
      { name: "Express", description: "Web framework" },
      { name: "MongoDB", description: "NoSQL database" },
      { name: "Redux", description: "State management" },
      { name: "Stripe", description: "Payment processing" },
      { name: "JWT", description: "Authentication" },
    ],
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team workspaces.",
    longDescription:
      "A collaborative task management application designed for teams. Features include real-time updates, team workspaces, task assignments, and progress tracking. The app uses Firebase for real-time database functionality and authentication.",
    image: "/placeholder.svg?height=600&width=800",
    video: null,
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    github: "#",
    demo: "#",
    categories: ["full-stack", "ui-ux"],
    features: [
      "Real-time collaboration",
      "Team workspaces",
      "Task assignments and deadlines",
      "Progress tracking and reporting",
      "File attachments",
      "Notification system",
    ],
    technologies: [
      { name: "Next.js", description: "React framework" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "Firebase", description: "Backend as a service" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "React Query", description: "Data fetching library" },
    ],
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing my skills and projects with interactive animations.",
    longDescription:
      "A modern, responsive portfolio website built with React and Framer Motion. Features include interactive animations, theme switching, and a project showcase. The site is fully responsive and optimized for all devices.",
    image: "/placeholder.svg?height=600&width=800",
    video: null,
    tags: ["React", "Framer Motion", "Tailwind CSS", "Three.js"],
    github: "#",
    demo: "#",
    categories: ["ui-ux", "figma"],
    features: [
      "Interactive animations and transitions",
      "Theme switching (light/dark and color themes)",
      "Responsive design for all devices",
      "Project showcase with filtering",
      "Contact form with validation",
      "Performance optimized",
    ],
    technologies: [
      { name: "React", description: "Frontend UI library" },
      { name: "Framer Motion", description: "Animation library" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { name: "Three.js", description: "3D graphics library" },
    ],
  },
  {
    title: "Weather Dashboard",
    description: "A weather dashboard with location-based forecasts, interactive maps, and historical data.",
    longDescription:
      "A comprehensive weather dashboard that provides location-based forecasts, interactive maps, and historical weather data. The app uses the OpenWeather API for weather data and Mapbox for interactive maps.",
    image: "/placeholder.svg?height=600&width=800",
    video: null,
    tags: ["React", "OpenWeather API", "Chart.js", "Mapbox"],
    github: "#",
    demo: "#",
    categories: ["ui-ux"],
    features: [
      "Location-based weather forecasts",
      "Interactive weather maps",
      "Historical weather data visualization",
      "7-day forecast",
      "Weather alerts and notifications",
      "Favorite locations",
    ],
    technologies: [
      { name: "React", description: "Frontend UI library" },
      { name: "OpenWeather API", description: "Weather data provider" },
      { name: "Chart.js", description: "Data visualization" },
      { name: "Mapbox", description: "Interactive maps" },
      { name: "Axios", description: "HTTP client" },
    ],
  },
  {
    title: "Social Media App",
    description: "A social media platform with user profiles, posts, comments, and real-time notifications.",
    longDescription:
      "A full-featured social media platform with user profiles, posts, comments, and real-time notifications. The app uses GraphQL for efficient data fetching and Socket.io for real-time features.",
    image: "/placeholder.svg?height=600&width=800",
    video: null,
    tags: ["Next.js", "GraphQL", "PostgreSQL", "Socket.io"],
    github: "#",
    demo: "#",
    categories: ["full-stack", "mern"],
    features: [
      "User profiles and authentication",
      "Post creation and sharing",
      "Comments and reactions",
      "Real-time notifications",
      "Direct messaging",
      "Content discovery feed",
    ],
    technologies: [
      { name: "Next.js", description: "React framework" },
      { name: "GraphQL", description: "API query language" },
      { name: "PostgreSQL", description: "Relational database" },
      { name: "Socket.io", description: "Real-time communication" },
      { name: "Apollo Client", description: "GraphQL client" },
    ],
  },
  {
    title: "AI Content Generator",
    description: "An AI-powered content generation tool for creating blog posts, social media content, and more.",
    longDescription:
      "An AI-powered content generation tool that helps users create blog posts, social media content, marketing copy, and more. The app uses OpenAI's GPT models for text generation and provides various customization options.",
    image: "/placeholder.svg?height=600&width=800",
    video: null,
    tags: ["React", "OpenAI API", "Node.js", "Express"],
    github: "#",
    demo: "#",
    categories: ["full-stack"],
    features: [
      "AI-powered text generation",
      "Multiple content types (blog posts, social media, etc.)",
      "Content customization options",
      "Content history and saving",
      "Export to various formats",
      "Team collaboration",
    ],
    technologies: [
      { name: "React", description: "Frontend UI library" },
      { name: "OpenAI API", description: "AI text generation" },
      { name: "Node.js", description: "Backend runtime" },
      { name: "Express", description: "Web framework" },
      { name: "MongoDB", description: "NoSQL database" },
    ],
  },
]

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter((project) => project.categories.includes(activeCategory)))
    }
  }, [activeCategory])

  const handleVideoToggle = (index: number) => {
    if (activeVideo === index) {
      videoRefs.current[index]?.pause()
      setActiveVideo(null)
    } else {
      // Pause any playing video
      if (activeVideo !== null && videoRefs.current[activeVideo]) {
        videoRefs.current[activeVideo]?.pause()
      }

      // Play the new video
      if (videoRefs.current[index]) {
        videoRefs.current[index]?.play()
        setActiveVideo(index)
      }
    }
  }

  const getThemeShadowColor = () => {
    if (!mounted) return ""

    if (theme?.includes("purple")) {
      return theme.includes("dark") ? "shadow-purple-300/10" : "shadow-purple-500/10"
    } else if (theme?.includes("blue")) {
      return theme.includes("dark") ? "shadow-blue-300/10" : "shadow-blue-500/10"
    } else if (theme?.includes("red")) {
      return theme.includes("dark") ? "shadow-red-300/10" : "shadow-red-500/10"
    } else if (theme?.includes("dark")) {
      return "shadow-white/10"
    } else {
      return "shadow-black/10"
    }
  }

  return (
    <section id="projects" className="py-20 px-4 bg-background/50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            A selection of my recent work, showcasing my skills and expertise in web development and design.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  "backdrop-blur-sm border border-border/50",
                  getThemeShadowColor(),
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/50 hover:bg-accent",
                  hoveredCategory === category.id ? "scale-110" : "",
                )}
                onClick={() => setActiveCategory(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                className={cn(
                  "backdrop-blur-xl bg-background/40 rounded-xl border border-border/50 overflow-hidden cursor-interact h-full flex flex-col",
                  getThemeShadowColor(),
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden aspect-video">
                  {project.video ? (
                    <>
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={project.video}
                        poster={project.image}
                        className="w-full h-full object-cover"
                        loop
                        muted
                      />
                      <button
                        className="absolute bottom-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full"
                        onClick={() => handleVideoToggle(index)}
                      >
                        {activeVideo === index ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                    </>
                  ) : (
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground rounded-full">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium cursor-interact flex-grow",
                        getThemeShadowColor(),
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </motion.button>

                    <motion.a
                      href={project.github}
                      className={cn(
                        "flex items-center justify-center p-2 bg-background hover:bg-accent rounded-md text-sm font-medium cursor-interact",
                        getThemeShadowColor(),
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                    </motion.a>

                    <motion.a
                      href={project.demo}
                      className={cn(
                        "flex items-center justify-center p-2 bg-background hover:bg-accent rounded-md text-sm font-medium cursor-interact",
                        getThemeShadowColor(),
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}
    </section>
  )
}
