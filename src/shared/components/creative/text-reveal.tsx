"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/shared/lib/utils"

interface TextRevealProps {
	text: string
	className?: string
	delay?: number
	mode?: "words" | "chars"
}

export function TextReveal({ text, className, delay = 0, mode = "words" }: TextRevealProps) {
	const shouldReduceMotion = useReducedMotion()

	if (shouldReduceMotion) {
		return <span className={cn(className)}>{text}</span>
	}

	const items = mode === "words" ? text.split(" ") : text.split("")

	return (
		<span className={cn(className)}>
			{items.map((item, i) => (
				<motion.span
					key={`${i}-${item}`}
					className="inline-block"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.4, delay: delay + i * 0.05, ease: "easeOut" }}
				>
					{item}
					{mode === "words" && i < items.length - 1 ? "\u00A0" : ""}
				</motion.span>
			))}
		</span>
	)
}
