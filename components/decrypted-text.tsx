"use client"

import { useEffect, useRef, useState } from "react"

interface DecryptedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  characters?: string
}

export default function DecryptedText({
  text,
  className = "",
  delay = 0,
  duration = 2000,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Start decryption after delay
    timeoutRef.current = setTimeout(() => {
      setIsDecrypting(true)

      let iteration = 0
      const targetLength = text.length

      intervalRef.current = setInterval(
        () => {
          setDisplayText((prev) => {
            return text
              .split("")
              .map((char, index) => {
                if (char === " ") return " "

                if (index < iteration) {
                  return text[index]
                }

                return characters[Math.floor(Math.random() * characters.length)]
              })
              .join("")
          })

          if (iteration >= targetLength) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            setDisplayText(text)
            setIsDecrypting(false)
          }

          iteration += 1 / 3
        },
        duration / targetLength / 3,
      )
    }, delay)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, delay, duration, characters])

  // Handle hover effect for re-decryption
  const handleMouseEnter = () => {
    if (isDecrypting) return

    setIsDecrypting(true)
    let iteration = 0
    const targetLength = text.length

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "

            if (index < iteration) {
              return text[index]
            }

            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      })

      if (iteration >= targetLength) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setDisplayText(text)
        setIsDecrypting(false)
      }

      iteration += 1 / 2
    }, 30)
  }

  return (
    <span
      className={`font-mono cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.05em",
      }}
    >
      {displayText ||
        text
          .split("")
          .map(() => characters[0])
          .join("")}
    </span>
  )
}
