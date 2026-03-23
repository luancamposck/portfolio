"use client"

import { User } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

export function AboutHero() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<SectionWrapper className="py-20">
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
				{/* Avatar placeholder */}
				<motion.div
					className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20"
					initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<User className="h-16 w-16 text-primary/60" />
				</motion.div>

				{/* Name */}
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					<TextReveal text="Luan Campos K." delay={0.1} />
				</h1>

				{/* Title */}
				<p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
					<TextReveal text="Desenvolvedor Full-Stack & UI Engineer" delay={0.4} />
				</p>
			</div>
		</SectionWrapper>
	)
}
