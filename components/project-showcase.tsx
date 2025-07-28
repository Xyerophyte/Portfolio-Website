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
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    longDescription:
      "A comprehensive e-commerce platform built with Next.js and Node.js, featuring user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Includes real-time inventory tracking and email notifications.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
    category: "Full-Stack",
    liveUrl: "https://ecommerce-demo.harshchavan.dev",
    githubUrl: "https://github.com/Xyerophyte/ecommerce-platform",
    featured: true,
    status: "completed",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    longDescription:
      "A modern task management application with real-time collaboration features. Built with React and Socket.io for instant updates, drag-and-drop functionality, team management, file attachments, and progress tracking. Includes mobile-responsive design and offline capabilities.",
    technologies: ["React", "Socket.io", "Express.js", "MongoDB", "Redux", "Material-UI"],
    category: "Frontend",
    liveUrl: "https://taskmanager.harshchavan.dev",
    githubUrl: "https://github.com/Xyerophyte/task-manager",
    featured: true,
    status: "completed",
  },
  {
    id: "3",
    title: "AI Chat Interface",
    description: "Modern chat application with AI integration",
    longDescription:
      "An intelligent chat interface powered by OpenAI GPT models. Features include conversation history, message threading, file uploads, code syntax highlighting, and customizable AI personas. Built with modern React patterns and optimized for performance.",
    technologies: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    category: "AI/ML",
    liveUrl: "https://ai-chat.harshchavan.dev",
    githubUrl: "https://github.com/Xyerophyte/ai-chat-interface",
    featured: true,
    status: "completed",
  },
  {
    id: "4",
    title: "API Gateway Service",
    description: "Microservices architecture with authentication and rate limiting",
    longDescription:
      "A robust API gateway built with Node.js and Express, featuring JWT authentication, rate limiting, request/response transformation, load balancing, and comprehensive logging. Includes Docker containerization and Kubernetes deployment configurations.",
    technologies: ["Node.js", "Express.js", "Redis", "Docker", "Kubernetes", "JWT"],
    category: "Backend",
    githubUrl: "https://github.com/Xyerophyte/api-gateway",
    featured: false,
    status: "completed",
  },
  {
    id: "5",
    title: "React Native Fitness App",
    description: "Mobile fitness tracking app with offline capabilities",
    longDescription:
      "A comprehensive fitness tracking mobile application built with React Native. Features workout planning, progress tracking, nutrition logging, social sharing, and offline data synchronization. Includes integration with health APIs and wearable devices.",
    technologies: ["React Native", "Expo", "AsyncStorage", "React Query", "Styled Components"],
    category: "Mobile",
    liveUrl: "https://apps.apple.com/fitness-tracker",
    githubUrl: "https://github.com/Xyerophyte/fitness-app",
    featured: false,
    status: "completed",
  },
  {
    id: "6",
    title: "Real Estate Platform",
    description: "Property listing and management system",
    longDescription:
      "A comprehensive real estate platform for property listings, virtual tours, mortgage calculations, and agent management. Features advanced search filters, map integration, and CRM functionality for real estate professionals.",
    technologies: ["Next.js", "Supabase", "MapBox", "Stripe", "TypeScript", "Tailwind CSS"],
    category: "Full-Stack",
    liveUrl: "https://realestate.harshchavan.dev",
    featured: false,
    status: "in-progress",
  },
]

const categories = ["All", "Full-Stack", "Frontend", "Backend", "Mobile", "AI/ML"]

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  const featuredProjects = projects.filter((project) => project.featured)

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

      {/* Featured Projects */}
      {selectedCategory === "All" && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* All Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>

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
  return (
    <div
      className={`group cursor-pointer bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm ${
        featured ? "ring-2 ring-purple-500/20" : ""
      }`}
      onClick={() => onSelect(project)}
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
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
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-md">
              +{project.technologies.length - 3} more
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
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
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
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
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
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        <div className="relative">
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <div className="text-xl text-gray-300">{project.title}</div>
              <div className="text-sm text-gray-400 mt-2">{project.category}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h2>
              <div className="flex items-center gap-4">
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
                    ? "Live Project"
                    : project.status === "in-progress"
                      ? "In Development"
                      : "Planned"}
                </span>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
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
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">{project.longDescription}</p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-lg text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
