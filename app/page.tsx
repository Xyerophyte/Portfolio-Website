"use client"

import { useState, useEffect } from "react"
import MagicBento from "@/components/magic-bento"
import ScrollReveal from "@/components/scroll-reveal"
import TypingAnimation from "@/components/typing-animation"
import DecryptedText from "@/components/decrypted-text"
import { Github, Linkedin, Mail, MapPin, Download, Phone } from "lucide-react"
import Dock from "@/components/dock"
import DotGrid from "@/components/dot-grid"
import { VscHome, VscAccount, VscMail, VscCode, VscTools, VscGithub } from "react-icons/vsc"
import ContactForm from "@/components/contact-form"
import ProjectShowcase from "@/components/project-showcase"
import TargetCursor from "@/components/target-cursor"

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Typing animation texts
  const typingTexts = [
    "Full Stack Developer",
    "React & Next.js Expert",
    "Backend Specialist",
    "UI/UX Enthusiast",
    "Problem Solver",
  ]

  // Portfolio data for bento cards
  const portfolioCards = [
    {
      color: "#060010",
      title: "Full Stack Developer",
      description: "Passionate about creating modern web applications with cutting-edge technologies",
      label: "About Me",
    },
    {
      color: "#060010",
      title: "React & Next.js",
      description: "Expert in modern React patterns, hooks, and Next.js framework",
      label: "Frontend",
    },
    {
      color: "#060010",
      title: "Node.js & Python",
      description: "Backend development with scalable APIs and microservices",
      label: "Backend",
    },
    {
      color: "#060010",
      title: "5+ Years Experience",
      description: "Building production-ready applications for startups and enterprises",
      label: "Experience",
    },
    {
      color: "#060010",
      title: "Available for Work",
      description: "Open to new opportunities and exciting projects",
      label: "Status",
    },
    {
      color: "#060010",
      title: "Let's Connect",
      description: "Always interested in discussing new ideas and collaborations",
      label: "Contact",
    },
  ]

  const skillsCards = [
    {
      color: "#060010",
      title: "JavaScript/TypeScript",
      description: "ES6+, TypeScript, Modern JS patterns",
      label: "Languages",
    },
    {
      color: "#060010",
      title: "React Ecosystem",
      description: "React, Next.js, Redux, Context API",
      label: "Frontend",
    },
    {
      color: "#060010",
      title: "Backend Technologies",
      description: "Node.js, Express, Python, FastAPI",
      label: "Backend",
    },
    {
      color: "#060010",
      title: "Databases",
      description: "PostgreSQL, MongoDB, Redis, Supabase",
      label: "Data",
    },
    {
      color: "#060010",
      title: "Cloud & DevOps",
      description: "AWS, Vercel, Docker, CI/CD",
      label: "Infrastructure",
    },
    {
      color: "#060010",
      title: "Design & UI",
      description: "Tailwind CSS, Figma, Responsive Design",
      label: "Design",
    },
  ]

  const projectCards = [
    {
      color: "#060010",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard",
      label: "Featured",
    },
    {
      color: "#060010",
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates",
      label: "Web App",
    },
    {
      color: "#060010",
      title: "AI Chat Interface",
      description: "Modern chat application with AI integration and beautiful UI",
      label: "AI/ML",
    },
    {
      color: "#060010",
      title: "Portfolio Website",
      description: "Interactive portfolio with advanced animations and modern design",
      label: "Personal",
    },
    {
      color: "#060010",
      title: "API Gateway",
      description: "Microservices architecture with authentication and rate limiting",
      label: "Backend",
    },
    {
      color: "#060010",
      title: "Mobile App",
      description: "React Native application with offline capabilities",
      label: "Mobile",
    },
  ]

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Add this function near the top of the component
  const downloadResume = () => {
    // Create a link to your resume file
    const link = document.createElement("a")
    link.href = "/resume/harsh-chavan-resume.pdf" // Add your resume to public/resume/
    link.download = "Harsh-Chavan-Resume.pdf"
    link.click()
  }

  // Dock items configuration
  const dockItems = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => scrollToSection("hero"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "About",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <VscTools size={18} />,
      label: "Skills",
      onClick: () => scrollToSection("skills"),
    },
    {
      icon: <VscCode size={18} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <VscMail size={18} />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
    {
      icon: <VscGithub size={18} />,
      label: "GitHub",
      onClick: () => window.open("https://github.com/Xyerophyte", "_blank"),
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Target Cursor */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        targetSelector=".cursor-target"
      />
      
      {/* Interactive Dot Grid Background */}
      <DotGrid
        dotSize={4}
        gap={25}
        baseColor="#1a1a2e"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={200}
        shockStrength={3}
        resistance={750}
        returnDuration={1.5}
        className="fixed inset-0"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <ScrollReveal direction="fade" duration={1.2} delay={0}>
              <div className="mb-8">
                <div className="mb-6">
                  <h1 className="text-5xl md:text-7xl font-bold">
                    <DecryptedText
                      text="Harsh Chavan"
                      className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                      delay={300}
                      duration={2000}
                      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
                    />
                  </h1>
                </div>
                <ScrollReveal direction="up" delay={2.5} duration={1}>
                  <div className="text-xl md:text-2xl text-gray-300 mb-2 min-h-[2.5rem] flex items-center justify-center">
                    <TypingAnimation
                      texts={typingTexts}
                      speed={100}
                      deleteSpeed={50}
                      pauseDuration={2000}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"
                    />
                  </div>
                  <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                    Crafting exceptional digital experiences with modern technologies
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={2.8} duration={1}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="cursor-target bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      Get In Touch
                    </button>
                    <button
                      onClick={downloadResume}
                      className="cursor-target border border-purple-500/30 hover:border-purple-500 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download Resume
                    </button>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bento-section">
          <ScrollReveal direction="up" duration={0.8} threshold={0.3}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Passionate developer with expertise in modern web technologies and a love for creating beautiful,
                functional applications.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} duration={1} threshold={0.2}>
            <MagicBento
              cardData={portfolioCards}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              glowColor="132, 0, 255"
            />
          </ScrollReveal>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bento-section">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A comprehensive toolkit of modern technologies and frameworks I use to build exceptional applications.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} duration={1}>
            <MagicBento
              cardData={skillsCards}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              glowColor="0, 255, 132"
            />
          </ScrollReveal>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bento-section">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                A showcase of my recent work, demonstrating expertise across different technologies and domains.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2} duration={1}>
            <ProjectShowcase />
          </ScrollReveal>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" duration={0.8}>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let's Work Together
                </h2>
                <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
                  I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your
                  ideas to life.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} duration={0.8}>
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact Form */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
                  <ContactForm />
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>

                  <div className="space-y-6">
                    <ScrollReveal direction="left" delay={0.1} duration={0.8}>
                      <div className="cursor-target bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
                        <Mail className="w-8 h-8 text-purple-400 mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Email</h4>
                        <p className="text-gray-400">harshabasaheb1@gmail.com</p>
                        <p className="text-sm text-gray-500 mt-1">I typically respond within 24 hours</p>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.2} duration={0.8}>
                      <div className="cursor-target bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
                        <Phone className="w-8 h-8 text-purple-400 mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Phone</h4>
                        <p className="text-gray-400">+971 502808641</p>
                        <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 9 AM - 6 PM GST</p>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.3} duration={0.8}>
                      <div className="cursor-target bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
                        <MapPin className="w-8 h-8 text-purple-400 mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Location</h4>
                        <p className="text-gray-400">Dubai, United Arab Emirates</p>
                        <p className="text-sm text-gray-500 mt-1">Open to remote work worldwide</p>
                      </div>
                    </ScrollReveal>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-lg font-semibold mb-4 text-center">Connect with me</h4>
                    <div className="flex gap-4 justify-center">
                      <a
                        href="https://github.com/Xyerophyte"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target bg-gray-900/50 hover:bg-gray-800/50 p-4 rounded-full border border-gray-800 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                      >
                        <Github size={24} />
                      </a>
                      <a
                        href="http://www.linkedin.com/in/harsh-chavan-369522316/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target bg-gray-900/50 hover:bg-gray-800/50 p-4 rounded-full border border-gray-800 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                      >
                        <Linkedin size={24} />
                      </a>
                      <a
                        href="mailto:harshabasaheb1@gmail.com"
                        className="cursor-target bg-gray-900/50 hover:bg-gray-800/50 p-4 rounded-full border border-gray-800 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                      >
                        <Mail size={24} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <ScrollReveal direction="fade" duration={0.8}>
          <footer className="border-t border-gray-800 py-8 px-6 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto text-center text-gray-400">
              <p>&copy; 2024 Harsh Chavan. All rights reserved.</p>
            </div>
          </footer>
        </ScrollReveal>
      </div>



      {/* Dock Navigation */}
      <Dock items={dockItems} panelHeight={68} baseItemSize={50} magnification={70} distance={150} />
    </div>
  )
}
