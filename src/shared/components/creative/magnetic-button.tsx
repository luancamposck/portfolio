"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import { type ReactNode, useCallback, useRef } from "react"
import { cn } from "@/shared/lib/utils"

interface MagneticButtonProps {
	children: ReactNode
	className?: string
	strength?: number
}

export function MagneticButton({ children, className, strength = 0.3 }: MagneticButtonProps) {
	const ref = useRef<HTMLDivElement>(null)
	const shouldReduceMotion = useReducedMotion()

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const springX = useSpring(x, { stiffness: 300, damping: 20 })
	const springY = useSpring(y, { stiffness: 300, damping: 20 })

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const el = ref.current
			if (!el || shouldReduceMotion) return
			const rect = el.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2
			x.set((e.clientX - centerX) * strength)
			y.set((e.clientY - centerY) * strength)
		},
		[shouldReduceMotion, strength, x, y]
	)

	const handleMouseLeave = useCallback(() => {
		x.set(0)
		y.set(0)
	}, [x, y])

	if (shouldReduceMotion) {
		return <div className={cn("inline-block", className)}>{children}</div>
	}

	return (
		<motion.div ref={ref} className={cn("inline-block", className)} style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			{children}
		</motion.div>
	)
}
