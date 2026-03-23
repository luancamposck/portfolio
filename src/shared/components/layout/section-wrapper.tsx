"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/shared/lib/utils"

interface SectionWrapperProps {
	children: React.ReactNode
	className?: string
	delay?: number
}

export function SectionWrapper({ children, className, delay = 0 }: SectionWrapperProps) {
	const shouldReduceMotion = useReducedMotion()

	if (shouldReduceMotion) {
		return <section className={cn(className)}>{children}</section>
	}

	return (
		<motion.section className={cn(className)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
			{children}
		</motion.section>
	)
}
