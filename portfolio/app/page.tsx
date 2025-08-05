import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import About from "@/components/about"
import AnimatedBackground from "@/components/animated-background"
import ContentContainer from "@/components/content-container"

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Hero />
        <ContentContainer>
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </ContentContainer>
      </div>
    </main>
  )
}
