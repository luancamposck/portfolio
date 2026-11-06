"use client"

import { useReducedMotion } from "motion/react"
import { useCallback, useRef } from "react"
import { cn } from "@/shared/lib/utils"

interface CursorSpotlightProps {
	className?: string
	size?: number
	color?: string
}

export function CursorSpotlight({ className, size = 400, color = "rgba(255,255,255,0.06)" }: CursorSpotlightProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const shouldReduceMotion = useReducedMotion()

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const container = containerRef.current
		if (!container) return
		const rect = container.getBoundingClientRect()
		container.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`)
		container.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`)
		container.style.setProperty("--spotlight-opacity", "1")
	}, [])

	const handleMouseLeave = useCallback(() => {
		const container = containerRef.current
		if (!container) return
		container.style.setProperty("--spotlight-opacity", "0")
	}, [])

	if (shouldReduceMotion) return null

	return (
		<div
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn("absolute inset-0 pointer-events-none overflow-hidden hidden md:block", className)}
			style={
				{
					"--spotlight-x": "0px",
					"--spotlight-y": "0px",
					"--spotlight-opacity": "0"
				} as React.CSSProperties
			}
			aria-hidden="true"
		>
			<div
				className="absolute pointer-events-none transition-opacity duration-300"
				style={{
					width: size,
					height: size,
					left: "var(--spotlight-x)",
					top: "var(--spotlight-y)",
					transform: "translate(-50%, -50%)",
					background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
					opacity: "var(--spotlight-opacity)"
				}}
			/>
		</div>
	)
}
