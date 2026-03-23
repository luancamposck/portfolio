"use client"

import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/shared/lib/utils"

interface CounterProps {
	target: number
	suffix?: string
	duration?: number
	className?: string
}

export function Counter({ target, suffix = "", duration = 2, className }: CounterProps) {
	const shouldReduceMotion = useReducedMotion()
	const ref = useRef<HTMLSpanElement>(null)
	const isInView = useInView(ref, { once: true })
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		if (!isInView || shouldReduceMotion) return

		const startTime = performance.now()
		const durationMs = duration * 1000

		function update(currentTime: number) {
			const elapsed = currentTime - startTime
			const progress = Math.min(elapsed / durationMs, 1)
			const eased = 1 - (1 - progress) ** 3
			setDisplayValue(Math.round(eased * target))

			if (progress < 1) {
				requestAnimationFrame(update)
			}
		}

		requestAnimationFrame(update)
	}, [isInView, shouldReduceMotion, target, duration])

	if (shouldReduceMotion) {
		return (
			<span ref={ref} className={cn("tabular-nums", className)}>
				{target}
				{suffix}
			</span>
		)
	}

	return (
		<span ref={ref} className={cn("tabular-nums", className)}>
			{displayValue}
			{suffix}
		</span>
	)
}
