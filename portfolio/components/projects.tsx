"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Play, Pause, Eye, Figma } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import ProjectModal from "@/components/project-modal"

const categories = [
  { id: "all", name: "All Projects" },
  { id: "ui-ux", name: "UI/UX Design" },
  { id: "full-stack", name: "Full Stack" },
  { id: "mern", name: "MERN Stack" },
  { id: "figma", name: "Figma Designs" },
  { id: "clones", name: "Clones" },
]

const projectsData = [
  {
    title: "VerMio PLay",
    description:
      "A MERN-stack cloud gaming website.",
    longDescription:
      "A comprehensive e-commerce solution built with the MERN stack. This platform features user authentication, product management, shopping cart functionality, and secure payment processing with Stripe integration. The admin dashboard allows for easy product and order management.",
    image: "/vermio-play.png?height=600&width=800",
    video: "https://youtu.be/vyUP8NeJIl4",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/codinggita/vermio_play",
    demo: "https://vermio-play-1.onrender.com/",
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
    title: "Mutual Funds Analytics Platform",
    description: "A comprehensive platform for analyzing mutual funds, calculating SIP/SWP returns, and tracking virtual portfolios.",
    longDescription:
      "A robust financial application designed for detailed mutual fund analysis and portfolio tracking. It empowers users with interactive NAV and rolling returns charts, advanced SIP and SWP calculators, a customizable watchlist, and a virtual portfolio builder. The platform leverages MongoDB for secure data persistence and features a highly responsive, animated UI.",
    image: "/mutual-fund.png?height=600&width=800",
    video: null,
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Veer-Modi/mutual-funds-2.0",
    demo: "https://mutual-funds-v2.vercel.app/",
    categories: ["full-stack", "ui-ux", "finance"],
    features: [
      "Interactive NAV and Rolling Returns charts",
      "Advanced SIP (Systematic Investment Plan) Calculator",
      "SWP (Systematic Withdrawal Plan) Calculator",
      "Virtual Portfolio Builder & Tracker",
      "Customizable Fund Watchlist",
      "Detailed individual scheme analysis pages",
    ],
    technologies: [
      { name: "Next.js", description: "React Framework for routing and API endpoints" },
      { name: "TypeScript", description: "Type-safe JavaScript" },
      { name: "MongoDB", description: "NoSQL database for user and fund data persistence" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework for styling" },
      { name: "Framer Motion", description: "Animation library for smooth UI transitions" },
      { name: "Recharts", description: "Charting library for financial data visualization" },
    ],
},
  {
    title: "Portfolio",
    description: "A modern portfolio website showcasing my skills and projects with interactive animations.",
    longDescription:
      "A modern, responsive portfolio website built with React and Framer Motion. Features include interactive animations, theme switching, and a project showcase. The site is fully responsive and optimized for all devices.",
    image: "/portfolio.png?height=600&width=800",
    video: null,
    tags: ["React", "Framer Motion", "Tailwind CSS", "Three.js"],
    github: "https://github.com/Veer-Modi/veer_modi_portfolio",
    demo: "https://veer-modi.vercel.app/",
    categories: ["full-stack", "ui-ux"],
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
    title: "VerMio Play UI Design",
    description: "A comprehensive Figma design for the VerMio Play cloud gaming platform.",
    longDescription:
      "A complete UI/UX design for the VerMio Play cloud gaming platform. It features a modern, immersive dark-themed interface with fully interactive prototypes, responsive layouts, and a comprehensive component system tailored for gaming experiences.",
    image: "/vermio-ui.png?height=600&width=800",
    video: null,
    tags: ["Figma", "UI/UX", "Prototyping", "Design System"],
    github: "https://www.figma.com/design/aGv6SfQoVMq0m2eprBvRLI/VerMio-PLay?node-id=0-1&t=tSynM1NZ3nSyvlQd-1",
    demo: "https://www.figma.com/proto/aGv6SfQoVMq0m2eprBvRLI/VerMio-PLay?node-id=1-2&p=f&t=gNS3Gn91nyM5KPIV-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1",
    categories: ["ui-ux", "figma"],
    features: [
      "Modern, dark-themed UI aesthetics",
      "Fully interactive high-fidelity prototype",
      "Comprehensive reusable component library",
      "Responsive screen layouts",
      "User flow mapping and structural wireframes",
    ],
    technologies: [
      { name: "Figma", description: "UI/UX design and prototyping tool" },
      { name: "Wireframing", description: "Structural layout planning" },
      { name: "Prototyping", description: "Interactive flow simulation" },
      { name: "Design System", description: "Reusable UI components and styles" },
    ],
  },
  {
    title: "CodingGita Platform UI",
    description: "A comprehensive Figma redesign of the CodingGita educational platform.",
    longDescription:
      "An advanced UI/UX clone and redesign of the CodingGita platform built entirely in Figma. This project utilizes industry-standard design methodologies, leveraging advanced auto-layout structures, interactive components, responsive constraints, and a highly organized design system to deliver a pixel-perfect educational experience.",
    image: "/codinggita-ui.png?height=600&width=800",
    video: null,
    tags: ["Figma", "UI/UX", "Auto Layout", "Design System"],
    github: "https://www.figma.com/design/75SwBDksFQGE3CQPFAJIWe/CodingGita?node-id=0-1&t=cKGzFewgRWq9cZLE-1",
    demo: "https://www.figma.com/proto/75SwBDksFQGE3CQPFAJIWe/CodingGita?node-id=1-3&p=f&t=DQ7bvCDjcEY8aMKJ-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3",
    categories: ["ui-ux", "figma"],
    features: [
      "Advanced Auto-Layout and responsive constraints",
      "Interactive component states and variants",
      "Comprehensive typography and color variables",
      "High-fidelity functional prototyping",
      "Organized atomic design system architecture",
      "Pixel-perfect UI cloning techniques",
    ],
    technologies: [
      { name: "Figma", description: "Primary design and prototyping environment" },
      { name: "Auto Layout", description: "Dynamic and responsive UI structuring" },
      { name: "Component Variants", description: "Scalable interactive UI elements" },
      { name: "Design Tokens", description: "Centralized typography and color management" },
      { name: "Interactive Prototyping", description: "Complex user flow simulations" },
    ],
  },
  {
    title: "Spotify Dashboard Clone",
    description: "A fully functional frontend clone of the Spotify web player interface.",
    longDescription:
      "A pixel-perfect UI clone of the Spotify dashboard built from scratch using React, Vite, and pure CSS. This project focuses on complex layout structures, responsive design, and fluid animations to replicate the premium feel of the actual Spotify app without relying on external component libraries.",
    image: "/spotify-clone.png?height=600&width=800",
    video: null,
    tags: ["React", "Vite.js", "CSS3", "UI Clone"],
    github: "https://github.com/Veer-Modi/react-spotify-clone",
    demo: "https://react-spotify-clone-z7zx.onrender.com",
    categories: ["ui-ux", "clones"],
    features: [
      "Pixel-perfect Spotify UI replication",
      "Fully responsive sidebar and main view",
      "Custom audio player controls UI",
      "CSS Grid and Flexbox advanced layouts",
      "Smooth hover effects and transitions",
      "Built without external UI libraries",
    ],
    technologies: [
      { name: "React", description: "Frontend UI library" },
      { name: "Vite.js", description: "Next-generation frontend tooling" },
      { name: "CSS3", description: "Advanced styling and animations" },
    ],
  },
]

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return ""
  let videoId = ""
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0]
  } else if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1])
    videoId = urlParams.get("v") || ""
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("youtube.com/embed/")[1]?.split("?")[0]
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

const getYouTubeVideoId = (url: string) => {
  if (!url) return ""
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0]
  } else if (url.includes("youtube.com/watch")) {
    const urlParams = new URLSearchParams(url.split("?")[1])
    return urlParams.get("v") || ""
  } else if (url.includes("youtube.com/embed/")) {
    return url.split("youtube.com/embed/")[1]?.split("?")[0]
  }
  return ""
}

export default function Projects() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)
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

  const handleMouseEnter = (index: number) => {
    setHoveredCardIndex(index)
    const project = filteredProjects[index]
    if (project.video) {
      const isYouTube = project.video.includes("youtube.com") || project.video.includes("youtu.be")
      if (!isYouTube) {
        const videoEl = videoRefs.current[index]
        if (videoEl) {
          videoEl.play().catch((err) => console.log("Video play failed:", err))
        }
      }
    }
  }

  const handleMouseLeave = (index: number) => {
    setHoveredCardIndex(null)
    const project = filteredProjects[index]
    if (project.video) {
      const isYouTube = project.video.includes("youtube.com") || project.video.includes("youtu.be")
      if (!isYouTube) {
        const videoEl = videoRefs.current[index]
        if (videoEl) {
          videoEl.pause()
          videoEl.currentTime = 0
        }
      }
    }
  }

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
                  "backdrop-blur-lg bg-background/40 rounded-2xl border border-white/20 border-b-white/5 border-r-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)] overflow-hidden cursor-interact h-full flex flex-col",
                  getThemeShadowColor(),
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="relative overflow-hidden aspect-video">
                  {project.video ? (
                    <>
                      {project.video.includes("youtube.com") || project.video.includes("youtu.be") ? (
                        hoveredCardIndex === index ? (
                          <iframe
                            src={`${getYouTubeEmbedUrl(project.video)}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${getYouTubeVideoId(project.video)}`}
                            className="w-full h-full object-cover pointer-events-none scale-105"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{ border: 0 }}
                          />
                        ) : (
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                        )
                      ) : (
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el
                          }}
                          src={project.video}
                          poster={project.image}
                          className="w-full h-full object-cover"
                          loop
                          muted
                        />
                      )}
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
                      title={project.categories.includes("figma") ? "Figma Canvas" : "GitHub Repository"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {project.categories.includes("figma") ? <Figma className="h-4 w-4" /> : <Github className="h-4 w-4" />}
                    </motion.a>

                    <motion.a
                      href={project.demo}
                      className={cn(
                        "flex items-center justify-center p-2 bg-background hover:bg-accent rounded-md text-sm font-medium cursor-interact",
                        getThemeShadowColor(),
                      )}
                      title={project.categories.includes("figma") ? "Figma Prototype" : "Live Demo"}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {project.categories.includes("figma") ? <Play className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
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
