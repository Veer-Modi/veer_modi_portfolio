// "use client"

// import { useState, useRef } from "react"
// import { motion } from "framer-motion"
// import { Github, ExternalLink, Play, Pause, X } from "lucide-react"
// import { Modal } from "@/components/ui/modal"

// interface ProjectModalProps {
//   isOpen: boolean
//   onClose: () => void
//   project: {
//     title: string
//     description: string
//     image: string
//     video: string | null
//     tags: string[]
//     github: string
//     demo: string
//     longDescription?: string
//     features?: string[]
//     technologies?: { name: string; icon?: string; description?: string }[]
//   }
// }

// export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
//   const [isPlaying, setIsPlaying] = useState(false)
//   const videoRef = useRef<HTMLVideoElement>(null)

//   const handleVideoToggle = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} className="p-0 w-full max-w-4xl">
//       <div className="overflow-hidden">
//         {/* Close Button - More prominent */}
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 p-3 bg-background/80 backdrop-blur-md rounded-full z-10 border border-border hover:bg-accent transition-colors"
//           aria-label="Close modal"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         {/* Media Section */}
//         <div className="relative aspect-video">
//           {project.video ? (
//             <>
//               <video
//                 ref={videoRef}
//                 src={project.video}
//                 poster={project.image}
//                 className="w-full h-full object-cover"
//                 loop
//                 muted
//                 onPlay={() => setIsPlaying(true)}
//                 onPause={() => setIsPlaying(false)}
//               />
//               <button
//                 className="absolute bottom-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:bg-background/90 transition-colors"
//                 onClick={handleVideoToggle}
//               >
//                 {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
//               </button>
//             </>
//           ) : (
//             <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
//           )}
//         </div>

//         {/* Content Section */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h2>

//           <p className="text-muted-foreground mb-6">{project.longDescription || project.description}</p>

//           {project.features && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3">Key Features</h3>
//               <ul className="space-y-2 list-disc pl-5">
//                 {project.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
//             <div className="flex flex-wrap gap-3">
//               {project.technologies
//                 ? project.technologies.map((tech, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg"
//                       title={tech.description}
//                     >
//                       {tech.icon && <img src={tech.icon || "/placeholder.svg"} alt={tech.name} className="w-4 h-4" />}
//                       <span>{tech.name}</span>
//                     </div>
//                   ))
//                 : project.tags.map((tag, index) => (
//                     <span key={index} className="px-3 py-2 bg-primary/10 rounded-lg">
//                       {tag}
//                     </span>
//                   ))}
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4">
//             <motion.a
//               href={project.github}
//               className="flex items-center gap-2 px-5 py-2.5 bg-background hover:bg-accent rounded-md text-sm font-medium border border-border"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <Github className="h-4 w-4" />
//               View Code
//             </motion.a>

//             <motion.a
//               href={project.demo}
//               className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <ExternalLink className="h-4 w-4" />
//               Live Demo
//             </motion.a>
//           </div>

//           {/* Bottom close button for better mobile UX */}
//           <div className="mt-8 text-center">
//             <motion.button
//               onClick={onClose}
//               className="px-6 py-3 bg-accent/50 hover:bg-accent rounded-md text-sm font-medium inline-flex items-center gap-2"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <X className="h-4 w-4" />
//               Close Project
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   )
// }

"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Github, CheckCircle2, MonitorPlay } from "lucide-react";
import Image from "next/image";

interface Technology {
  name: string;
  icon?: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  video?: string | null;
  tags: string[];
  github?: string;
  demo?: string;
  longDescription?: string;
  features?: string[];
  technologies?: Technology[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-full max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar p-0 gap-0 [&>button.absolute]:hidden rounded-2xl sm:rounded-2xl">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold pr-4">{project.title}</DialogTitle>
          <DialogDescription className="sr-only">Details for {project.title} project</DialogDescription>
          <DialogClose className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none shrink-0">
            <X className="h-5 w-5 opacity-70 hover:opacity-100" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="p-4 sm:p-6">
          {/* Media (Video or Image) */}
        <div className="mb-6">
          {project.video ? (
            <video
              src={project.video}
              controls
              className="w-full rounded-lg"
            />
          ) : (
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full rounded-lg"
            />
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6">
          {project.longDescription || project.description}
        </p>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 list-disc pl-5">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {(project.technologies?.length ?? 0) > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies?.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg"
                >
                  {tech.icon && (
                    <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                  )}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-primary/10 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          {project.github && (
            <Button asChild variant="outline">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {project.demo && (
            <Button asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
