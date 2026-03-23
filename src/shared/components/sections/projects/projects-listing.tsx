"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { getAllCategories, getProjectsByCategory } from "@/data/projects"
import { ProjectCard } from "@/shared/components/creative/project-card"
import { cn } from "@/shared/lib/utils"

export function ProjectsListing() {
	const [activeCategory, setActiveCategory] = useState("All")
	const shouldReduceMotion = useReducedMotion()
	const categories = getAllCategories()
	const filteredProjects = getProjectsByCategory(activeCategory)

	return (
		<>
			<div className="flex flex-wrap gap-2">
				{categories.map((category) => (
					<button
						key={category}
						type="button"
						onClick={() => setActiveCategory(category)}
						className={cn(
							"inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
							activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						)}
					>
						{category}
					</button>
				))}
			</div>

			<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<AnimatePresence mode="popLayout">
					{filteredProjects.map((project, i) => (
						<motion.div
							key={project.slug}
							layout={!shouldReduceMotion}
							initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
							animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
							exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
						>
							<ProjectCard project={project} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</>
	)
}
