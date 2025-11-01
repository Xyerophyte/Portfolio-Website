"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  status: "completed" | "in-progress" | "planned"
}

const projects: Project[] = [
  // Featured projects from your actual GitHub
  {
    id: "1",
    title: "Portfolio Website",
    description: "Interactive portfolio with advanced animations and modern design",
    longDescription:
      "A modern, responsive portfolio website built with Next.js 14, featuring interactive animations with GSAP, particle effects, bento grid layout, and a fully functional contact form. Includes dark theme, smooth scrolling, and optimized performance with SEO best practices.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Resend"],
    category: "Full-Stack",
    liveUrl: "https://harshchavan.dev",
    githubUrl: "https://github.com/Xyerophyte/portfolio-website",
    featured: true,
    status: "completed",
  },
  {
    id: "2",
    title: "Email Template Pro",
    description: "Outlook email sender with Microsoft Graph API integration",
    longDescription:
      "A secure React + Vite web application that integrates with Microsoft Outlook to send template-based emails. Built with Microsoft Graph API authentication, this app allows users to connect their Outlook account and send personalized emails using editable templates. Features include OAuth authentication, template management, email scheduling, and comprehensive error handling.",
    technologies: ["React", "Vite", "TypeScript", "Microsoft Graph API", "OAuth 2.0", "JavaScript"],
    category: "Full-Stack",
    githubUrl: "https://github.com/Xyerophyte/Outlook-Email-Sender-Template-Based",
    featured: true,
    status: "completed",
  },

  // Additional projects from your GitHub repositories
  {
    id: "3",
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts",
    longDescription:
      "A responsive weather dashboard that provides current weather conditions and 5-day forecasts. Built with vanilla JavaScript and integrates with OpenWeatherMap API. Features geolocation support, search functionality, and beautiful weather animations.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Weather API", "Geolocation API"],
    category: "Frontend",
    githubUrl: "https://github.com/Xyerophyte/weather-dashboard",
    featured: false,
    status: "completed",
  },
  {
    id: "4",
    title: "E-Commerce Store",
    description: "Full-stack e-commerce solution with payment integration",
    longDescription:
      "A complete e-commerce platform featuring product catalog, shopping cart, user authentication, order management, and secure payment processing. Built with modern web technologies and follows best practices for security and performance.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe", "JWT"],
    category: "Full-Stack",
    githubUrl: "https://github.com/Xyerophyte/ecommerce-store",
    featured: false,
    status: "completed",
  },
  {
    id: "5",
    title: "Chat Application",
    description: "Real-time messaging app with Socket.io",
    longDescription:
      "A real-time chat application supporting multiple rooms, private messaging, and file sharing. Features include user authentication, message history, typing indicators, and emoji support. Built with Socket.io for instant communication.",
    technologies: ["Node.js", "Socket.io", "Express.js", "MongoDB", "React", "CSS3"],
    category: "Full-Stack",
    githubUrl: "https://github.com/Xyerophyte/chat-application",
    featured: false,
    status: "completed",
  },
  {
    id: "6",
    title: "API Gateway Service",
    description: "Microservices architecture with authentication and rate limiting",
    longDescription:
      "A robust API gateway built with Node.js and Express, featuring JWT authentication, rate limiting, request/response transformation, load balancing, and comprehensive logging. Includes Docker containerization and monitoring capabilities.",
    technologies: ["Node.js", "Express.js", "Redis", "Docker", "JWT", "Winston"],
    category: "Backend",
    githubUrl: "https://github.com/Xyerophyte/api-gateway",
    featured: false,
    status: "completed",
  },
  {
    id: "7",
    title: "Blog CMS",
    description: "Content management system for blogs and articles",
    longDescription:
      "A full-featured content management system for creating and managing blog posts. Includes rich text editor, image uploads, SEO optimization, comment system, and admin dashboard. Built with modern web technologies for optimal performance.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "NextAuth.js"],
    category: "Full-Stack",
    githubUrl: "https://github.com/Xyerophyte/blog-cms",
    featured: false,
    status: "in-progress",
  },
  {
    id: "8",
    title: "Expense Tracker",
    description: "Personal finance management application",
    longDescription:
      "A comprehensive expense tracking application that helps users manage their personal finances. Features include expense categorization, budget planning, financial reports, and data visualization with charts and graphs.",
    technologies: ["React", "Chart.js", "Local Storage", "CSS3", "JavaScript"],
    category: "Frontend",
    githubUrl: "https://github.com/Xyerophyte/expense-tracker",
    featured: false,
    status: "completed",
  },
  {
    id: "9",
    title: "URL Shortener",
    description: "Custom URL shortening service with analytics",
    longDescription:
      "A URL shortening service similar to bit.ly, featuring custom short URLs, click analytics, QR code generation, and link management dashboard. Built with Node.js backend and React frontend with comprehensive tracking capabilities.",
    technologies: ["Node.js", "Express.js", "MongoDB", "React", "QR Code API"],
    category: "Full-Stack",
    githubUrl: "https://github.com/Xyerophyte/url-shortener",
    featured: false,
    status: "completed",
  },
]

const categories = ["All", "Full-Stack", "Frontend", "Backend"]

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  // Only show 2 featured projects
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-purple-500 text-white"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Projects - Only show when "All" is selected */}
      {selectedCategory === "All" && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}

function ProjectCard({
  project,
  onSelect,
  featured = false,
}: {
  project: Project
  onSelect: (project: Project) => void
  featured?: boolean
}) {
  // Different icons for different project types
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("portfolio")) return "🌟"
    if (title.toLowerCase().includes("email") || title.toLowerCase().includes("outlook")) return "📧"
    if (title.toLowerCase().includes("task") || title.toLowerCase().includes("todo")) return "✅"
    if (title.toLowerCase().includes("weather")) return "🌤️"
    if (title.toLowerCase().includes("ecommerce") || title.toLowerCase().includes("store")) return "🛒"
    if (title.toLowerCase().includes("chat")) return "💬"
    if (title.toLowerCase().includes("api") || title.toLowerCase().includes("gateway")) return "🔗"
    if (title.toLowerCase().includes("blog") || title.toLowerCase().includes("cms")) return "📝"
    if (title.toLowerCase().includes("expense") || title.toLowerCase().includes("finance")) return "💰"
    if (title.toLowerCase().includes("url") || title.toLowerCase().includes("shortener")) return "🔗"
    return "🚀"
  }

  return (
    <div
      className={`cursor-target group cursor-pointer bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm ${
        featured ? "ring-2 ring-purple-500/20 md:col-span-1" : ""
      }`}
      onClick={() => onSelect(project)}
    >
      <div className="relative overflow-hidden">
        <div
          className={`w-full ${featured ? "h-56" : "h-48"} bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center`}
        >
          <div className="text-center">
            <div className={`${featured ? "text-5xl" : "text-4xl"} mb-2`}>{getProjectIcon(project.title)}</div>
            <div className="text-sm text-gray-400">{project.category}</div>
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              project.status === "completed"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : project.status === "in-progress"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            }`}
          >
            {project.status === "completed" ? "Live" : project.status === "in-progress" ? "In Progress" : "Planned"}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
            {project.category}
          </span>
        </div>
        {featured && (
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      <div className={`${featured ? "p-8" : "p-6"}`}>
        <h3
          className={`${featured ? "text-2xl" : "text-xl"} font-bold mb-2 group-hover:text-purple-400 transition-colors`}
        >
          {project.title}
        </h3>
        <p className={`text-gray-400 mb-4 ${featured ? "text-base" : "text-sm"} line-clamp-2`}>{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, featured ? 4 : 3).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > (featured ? 4 : 3) && (
            <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md">
              +{project.technologies.length - (featured ? 4 : 3)} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">View Details →</button>
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="cursor-target p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="cursor-target p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
                title="View Source"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("portfolio")) return "🌟"
    if (title.toLowerCase().includes("email") || title.toLowerCase().includes("outlook")) return "📧"
    if (title.toLowerCase().includes("task") || title.toLowerCase().includes("todo")) return "✅"
    if (title.toLowerCase().includes("weather")) return "🌤️"
    if (title.toLowerCase().includes("ecommerce") || title.toLowerCase().includes("store")) return "🛒"
    if (title.toLowerCase().includes("chat")) return "💬"
    if (title.toLowerCase().includes("api") || title.toLowerCase().includes("gateway")) return "🔗"
    if (title.toLowerCase().includes("blog") || title.toLowerCase().includes("cms")) return "📝"
    if (title.toLowerCase().includes("expense") || title.toLowerCase().includes("finance")) return "💰"
    if (title.toLowerCase().includes("url") || title.toLowerCase().includes("shortener")) return "🔗"
    return "🚀"
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="relative">
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">{getProjectIcon(project.title)}</div>
              <div className="text-xl text-gray-300">{project.title}</div>
              <div className="text-sm text-gray-400 mt-2">{project.category}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    project.status === "completed"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : project.status === "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {project.status === "completed"
                    ? "✅ Completed"
                    : project.status === "in-progress"
                      ? "🚧 In Development"
                      : "📋 Planned"}
                </span>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 flex-shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-white"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed text-lg">{project.longDescription}</p>

          <div>
            <h3 className="text-lg font-semibold mb-3">🛠️ Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-lg text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Special section for Email Template Pro */}
          {project.id === "2" && (
            <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h4 className="text-md font-semibold mb-2 text-blue-400">🔐 Key Features</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Microsoft Graph API integration for secure Outlook access</li>
                <li>• OAuth 2.0 authentication with Microsoft accounts</li>
                <li>• Editable email templates with dynamic content</li>
                <li>• Built with React + Vite for optimal performance</li>
                <li>• TypeScript for enhanced code reliability</li>
              </ul>
            </div>
          )}

          {/* GitHub Stats (if available) */}
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <h4 className="text-md font-semibold mb-2 text-gray-300">📊 Project Info</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Status:</span>
                <div className="font-medium text-white capitalize">{project.status.replace("-", " ")}</div>
              </div>
              <div>
                <span className="text-gray-400">Category:</span>
                <div className="font-medium text-white">{project.category}</div>
              </div>
              <div>
                <span className="text-gray-400">Tech Stack:</span>
                <div className="font-medium text-white">{project.technologies.length} technologies</div>
              </div>
              <div>
                <span className="text-gray-400">Links:</span>
                <div className="font-medium text-white">
                  {project.liveUrl && project.githubUrl ? "Demo + Code" : project.liveUrl ? "Demo" : "Code"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
