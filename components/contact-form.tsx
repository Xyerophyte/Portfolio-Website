"use client"

import type React from "react"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return "Name is required"
    }
    if (!formData.email.trim()) {
      return "Email is required"
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address"
    }
    if (!formData.subject.trim()) {
      return "Subject is required"
    }
    if (!formData.message.trim()) {
      return "Message is required"
    }
    if (formData.message.trim().length < 10) {
      return "Message must be at least 10 characters long"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Client-side validation
    const validationError = validateForm()
    if (validationError) {
      setStatus({
        type: "error",
        message: validationError,
      })
      return
    }

    setStatus({ type: "loading", message: "Sending message..." })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: "success",
          message: data.message || "Message sent successfully! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setStatus({
          type: "error",
          message: data.error || data.message || "Failed to send message. Please try again or contact me directly.",
        })
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again, or contact me directly at harshabasaheb1@gmail.com",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="cursor-target w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="cursor-target w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="cursor-target w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
            placeholder="Project inquiry, collaboration, etc."
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="cursor-target w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
          />
        </div>

        {status.message && (
          <div
            className={`flex items-center gap-2 p-4 rounded-lg ${
              status.type === "success"
                ? "bg-green-900/20 border border-green-500/30 text-green-400"
                : status.type === "error"
                  ? "bg-red-900/20 border border-red-500/30 text-red-400"
                  : "bg-blue-900/20 border border-blue-500/30 text-blue-400"
            }`}
          >
            {status.type === "success" && <CheckCircle size={20} />}
            {status.type === "error" && <AlertCircle size={20} />}
            <span>{status.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status.type === "loading"}
          className="cursor-target w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status.type === "loading" ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              <Send size={18} />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  )
}
