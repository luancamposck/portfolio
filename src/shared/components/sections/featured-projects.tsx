"use client"

import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"
import { getFeaturedProjects } from "@/data/projects"
import { Link } from "@/i18n/navigation"
import { ProjectCard } from "@/shared/components/creative/project-card"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

export function FeaturedProjects() {
	const t = useTranslations("featuredProjects")
	const featuredProjects = getFeaturedProjects()
	const shouldReduceMotion = useReducedMotion()

	return (
		<SectionWrapper className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
					<TextReveal text={t("heading")} />
				</h2>
				<p className="mt-4 max-w-2xl text-muted-foreground">{t("description")}</p>

				<div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{featuredProjects.map((project, i) => (
						<motion.div
							key={project.slug}
							initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
							whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
						>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80">
						{t("viewAll")}
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</SectionWrapper>
	)
}
