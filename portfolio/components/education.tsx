"use client"

import { motion, useInView } from "framer-motion"
import { Award, Calendar, ExternalLink, FileText } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import CertificateModal, { Certificate } from "./certificate-modal"

const certificationsData: Certificate[] = [
  {
    period: "[Year / Date]",
    title: "Code Relay",
    institution: "[Institution Name]",
    description: "Description for Code-Relay certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Code-Relay.pdf",
  },
  {
    period: "2026 / 03 / 20",
    title: "Dotslash 9.0",
    institution: "SVNIT Surat",
    description: "Description for Dotslash certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Dotslash.png",
  },
  {
    period: "[Year / Date]",
    title: "GCET X Odoo",
    institution: "GCET",
    description: "Description for GCET certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/GCET.pdf",
  },
  {
    period: "[Year / Date]",
    title: "Hack A Sol",
    institution: "IIIT Raipur",
    description: "Description for Hack-a-sol certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Hack-a-sol.jpg",
  },
  {
    period: "[Year / Date]",
    title: "Hack4Delhi",
    institution: "Delhi University",
    description: "Description for Hack4Delhi certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Hack4Delhi.pdf",
  },
  {
    period: "2025 / 12 / 29",
    title: "Hackxios",
    institution: "IIIT Bhopal",
    description: "Description for Hackxios certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Hackxios.png",
  },
  {
    period: "[Year / Date]",
    title: "Price & Premium",
    institution: "[Institution Name]",
    description: "Description for Price-&-Premium certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Price-&-Premium.pdf",
  },
  {
    period: "[Year / Date]",
    title: "Takshshaatra",
    institution: "[Institution Name]",
    description: "Description for Takshshatra certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Takshshatra-Certificate.pdf",
  },
  {
    period: "2026 / 02 / 07",
    title: "Techprenaur Udyamitsav'26",
    institution: "IIT Jammu",
    description: "Description for Techprenaur certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/Techprenaur.pdf",
  },
  {
    period: "2026 / 01 / 09",
    title: "Hack Innovate 2026",
    institution: "Adani Institue of Digital Technology and Management",
    description: "Description for adani certificate. Replace this placeholder text with actual details.",
    mediaUrl: "/certificates/adani.jpg",
  },
]

export default function Certifications() {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

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

  return (
    <section id="certifications" className="py-20 px-4 bg-muted/10">
      <div className="container mx-auto">
        <InViewMotion delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional certifications and achievements that have shaped my skills and knowledge.
            </p>
          </div>
        </InViewMotion>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificationsData.map((item, index) => {
            const isPdf = item.mediaUrl.toLowerCase().endsWith('.pdf');
            
            return (
              <InViewMotion key={index} delay={index * 0.1}>
                <motion.div
                  className={cn(
                    "backdrop-blur-lg bg-background/40 rounded-2xl border border-white/20 border-b-white/5 border-r-white/5 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-interact overflow-hidden",
                    activeItem === index
                      ? "border-primary shadow-lg scale-[1.02]"
                      : "border-border/50 hover:border-primary/50",
                    getThemeShadowColor(),
                  )}
                  onMouseEnter={() => setActiveItem(index)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <div
                          className={cn(
                            "w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden bg-primary/10 border border-primary/20",
                            activeItem === index ? "bg-primary/20" : "",
                          )}
                        >
                          {isPdf ? (
                            <FileText className="w-8 h-8 text-primary" />
                          ) : (
                            <img
                              src={item.mediaUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
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
                          <Award className="h-3 w-3 text-primary-foreground" />
                        </motion.div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                          <h3 className="font-bold text-lg sm:truncate pr-2">{item.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap shrink-0 mt-1 sm:mt-0">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.period}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3 truncate">{item.institution}</p>
                        <p className="mb-4 text-sm line-clamp-2">{item.description}</p>

                        <button
                          onClick={() => setSelectedCert(item)}
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium cursor-interact focus:outline-none",
                            activeItem === index ? "text-primary" : "text-muted-foreground hover:text-primary",
                          )}
                        >
                          View Certificate
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </button>
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
              </InViewMotion>
            );
          })}
        </div>
      </div>
      
      <CertificateModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
        certificate={selectedCert} 
      />
    </section>
  )
}

function InViewMotion({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
