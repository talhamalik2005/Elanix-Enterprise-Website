"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface LogoMarqueeProps {
  logos: {
    src: string
    alt: string
    width: number
    height: number
  }[]
  speed?: number
  className?: string
}

export function LogoMarquee({ logos, speed = 15, className = "" }: LogoMarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollerInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current || !scrollerInnerRef.current) return

    const scrollerContent = Array.from(scrollerInnerRef.current.children)

    // Clone the content to ensure continuous scrolling
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      scrollerInnerRef.current?.appendChild(duplicatedItem)
    })

    // Add animation keyframes if they don't exist yet
    if (!document.querySelector("#marquee-keyframes")) {
      const style = document.createElement("style")
      style.id = "marquee-keyframes"
      style.textContent = `
    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
  `
      document.head.appendChild(style)
    }

    // Set animation with explicit infinite loop
    if (scrollerInnerRef.current) {
      scrollerInnerRef.current.style.animation = `scroll ${speed}s linear infinite`
    }

    // Pause animation on hover
    const handleMouseEnter = () => {
      if (scrollerInnerRef.current) {
        scrollerInnerRef.current.style.animationPlayState = "paused"
      }
    }

    const handleMouseLeave = () => {
      if (scrollerInnerRef.current) {
        scrollerInnerRef.current.style.animationPlayState = "running"
      }
    }

    const scroller = scrollerRef.current
    scroller.addEventListener("mouseenter", handleMouseEnter)
    scroller.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      scroller.removeEventListener("mouseenter", handleMouseEnter)
      scroller.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [speed])

  return (
    <div ref={scrollerRef} className={`w-full overflow-hidden bg-white ${className}`}>
      <div ref={scrollerInnerRef} className="flex items-center whitespace-nowrap">
        {logos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-8 py-4">
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
