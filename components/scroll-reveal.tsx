"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "fade"
  delay?: number
  duration?: number
  distance?: number
  className?: string
  threshold?: number
  triggerOnce?: boolean
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = "",
  threshold = 0.1,
  triggerOnce = false, // Changed default to false for bidirectional
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set initial state based on direction
    const getInitialTransform = () => {
      switch (direction) {
        case "up":
          return { y: distance, opacity: 0 }
        case "down":
          return { y: -distance, opacity: 0 }
        case "left":
          return { x: distance, opacity: 0 }
        case "right":
          return { x: -distance, opacity: 0 }
        case "fade":
          return { opacity: 0 }
        default:
          return { y: distance, opacity: 0 }
      }
    }

    const getVisibleTransform = () => {
      return { x: 0, y: 0, opacity: 1 }
    }

    // Set initial transform
    gsap.set(element, getInitialTransform())

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)

            // Animate to visible state
            gsap.to(element, {
              ...getVisibleTransform(),
              duration,
              delay,
              ease: "power2.out",
            })

            if (triggerOnce) {
              observer.unobserve(element)
            }
          } else if (!entry.isIntersecting && !triggerOnce) {
            if (isVisible) {
              setIsVisible(false)
              // Animate back to hidden state
              gsap.to(element, {
                ...getInitialTransform(),
                duration: duration * 0.6, // Slightly faster exit animation
                delay: 0, // No delay for exit
                ease: "power2.in",
              })
            }
          }
        })
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [direction, delay, duration, distance, threshold, triggerOnce, isVisible])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
