"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import "./custom-cursor.css"

interface CursorTrail {
  x: number
  y: number
  element: HTMLDivElement
  life: number
  delay: number
}

interface CursorParticle {
  x: number
  y: number
  vx: number
  vy: number
  element: HTMLDivElement
  life: number
  maxLife: number
}

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<CursorTrail[]>([])
  const particlesRef = useRef<CursorParticle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const trailPointsRef = useRef<TrailPoint[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef<number>()
  const lastParticleTime = useRef(0)

  // Check if device supports hover (not touch device)
  const [supportsHover, setSupportsHover] = useState(true)

  useEffect(() => {
    const checkHoverSupport = () => {
      setSupportsHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)
    }

    checkHoverSupport()
    window.addEventListener("resize", checkHoverSupport)

    return () => window.removeEventListener("resize", checkHoverSupport)
  }, [])

  // Create trail element with osu-style positioning
  const createTrail = (x: number, y: number, delay: number): CursorTrail => {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.left = `${x - 6}px`
    trail.style.top = `${y - 6}px`
    trail.style.opacity = "0"
    document.body.appendChild(trail)

    // Animate in with delay
    gsap.to(trail, {
      opacity: 0.8,
      duration: 0.1,
      delay: delay * 0.02,
      ease: "power2.out",
    })

    return {
      x,
      y,
      element: trail,
      life: 1,
      delay,
    }
  }

  // Create particle element
  const createParticle = (x: number, y: number): CursorParticle => {
    const particle = document.createElement("div")
    particle.className = "cursor-particle"
    particle.style.left = `${x - 2}px`
    particle.style.top = `${y - 2}px`
    document.body.appendChild(particle)

    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 4 + 2

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      element: particle,
      life: 1,
      maxLife: Math.random() * 80 + 40, // 40-120 frames
    }
  }

  // Update osu-style trails with proper cleanup
  const updateTrails = useCallback(() => {
    const now = Date.now()

    // Remove old trail points (older than 500ms)
    trailPointsRef.current = trailPointsRef.current.filter((point) => now - point.timestamp < 500)

    // Clear existing trails with proper DOM cleanup
    trailsRef.current.forEach((trail) => {
      if (trail.element?.parentNode) {
        trail.element.parentNode.removeChild(trail.element)
      }
    })
    trailsRef.current = []

    // Limit trail points to prevent unbounded growth
    const MAX_TRAIL_POINTS = 20
    const pointsToRender = trailPointsRef.current.slice(-MAX_TRAIL_POINTS)

    // Create new trails based on trail points
    pointsToRender.forEach((point, index) => {
      const age = now - point.timestamp
      const maxAge = 500
      const life = Math.max(0, 1 - age / maxAge)

      if (life > 0) {
        const trail = document.createElement("div")
        trail.className = "cursor-trail"

        // Calculate size and opacity based on age and position in trail
        const sizeMultiplier = 0.3 + life * 0.7 // 0.3 to 1.0
        const opacityMultiplier = life * 0.6 // Fade out over time
        const trailIndex = pointsToRender.length - index - 1
        const positionOpacity = Math.max(0.1, 1 - trailIndex * 0.08) // Fade based on position

        trail.style.cssText = `
          position: fixed;
          left: ${point.x - 6 * sizeMultiplier}px;
          top: ${point.y - 6 * sizeMultiplier}px;
          width: ${12 * sizeMultiplier}px;
          height: ${12 * sizeMultiplier}px;
          background: radial-gradient(circle,
            rgba(132, 0, 255, ${0.8 * opacityMultiplier * positionOpacity}) 0%,
            rgba(255, 0, 150, ${0.6 * opacityMultiplier * positionOpacity}) 50%,
            transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: ${9998 - index};
          mix-blend-mode: screen;
          box-shadow: 0 0 ${8 * sizeMultiplier}px rgba(132, 0, 255, ${0.3 * opacityMultiplier * positionOpacity});
        `

        document.body.appendChild(trail)
        trailsRef.current.push({
          x: point.x,
          y: point.y,
          element: trail,
          life,
          delay: index,
        })
      }
    })
  }, [])

  // Update particles with proper cleanup
  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.97 // Friction
      particle.vy *= 0.97
      particle.vy += 0.1 // Slight gravity
      particle.life -= 1

      if (particle.life <= 0) {
        if (particle.element?.parentNode) {
          particle.element.parentNode.removeChild(particle.element)
        }
        return false
      }

      const opacity = particle.life / particle.maxLife
      gsap.set(particle.element, {
        x: particle.x - 2,
        y: particle.y - 2,
        opacity: opacity * 0.7,
        scale: opacity * 0.8 + 0.2,
      })

      return true
    })
  }, [])

  // Animation loop
  const animate = useCallback(() => {
    const now = Date.now()

    // Add particles when clicking (limit to 25 particles max)
    if (isClicking && now - lastParticleTime.current > 12) {
      if (particlesRef.current.length < 25) {
        const particle = createParticle(
          mouseRef.current.x + (Math.random() - 0.5) * 15,
          mouseRef.current.y + (Math.random() - 0.5) * 15,
        )
        particlesRef.current.push(particle)
      }
      lastParticleTime.current = now
    }

    updateTrails()
    updateParticles()

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [isClicking, updateTrails, updateParticles])

  useEffect(() => {
    if (!supportsHover) return

    // Add cursor-hidden class to body
    document.body.classList.add("cursor-hidden")

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      mouseRef.current = newPos

      // Add point to trail with timestamp
      trailPointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      })

      // Limit trail points to prevent memory leaks (max 30 points)
      if (trailPointsRef.current.length > 30) {
        trailPointsRef.current = trailPointsRef.current.slice(-30)
      }

      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.08,
          ease: "power2.out",
        })
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(false)
      }
    }

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate)

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      document.body.classList.remove("cursor-hidden")
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)

      // Cancel animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Comprehensive cleanup with proper DOM removal
      trailsRef.current.forEach((trail) => {
        if (trail.element?.parentNode) {
          trail.element.parentNode.removeChild(trail.element)
        }
      })
      particlesRef.current.forEach((particle) => {
        if (particle.element?.parentNode) {
          particle.element.parentNode.removeChild(particle.element)
        }
      })

      // Clear all references
      trailsRef.current = []
      particlesRef.current = []
      trailPointsRef.current = []
    }
  }, [supportsHover, animate])

  // Don't render on touch devices
  if (!supportsHover) return null

  return (
    <div ref={cursorRef} className={`custom-cursor ${isClicking ? "clicking" : ""} ${isHovering ? "hovering" : ""}`} />
  )
}
