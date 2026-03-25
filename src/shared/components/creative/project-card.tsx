"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"
import Image from "next/image"
import { useCallback, useRef } from "react"
import type { Project } from "@/data/projects"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/shared/components/ui/badge"
import { cn } from "@/shared/lib/utils"

interface ProjectCardProps {
	project: Project
	className?: string
}

export function ProjectCard({ project, className }: ProjectCardProps) {
	const ref = useRef<HTMLDivElement>(null)
	const shouldReduceMotion = useReducedMotion()

	const rotateX = useMotionValue(0)
	const rotateY = useMotionValue(0)
	const imageX = useMotionValue(0)
	const imageY = useMotionValue(0)

	const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
	const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })
	const springImageX = useSpring(imageX, { stiffness: 200, damping: 25 })
	const springImageY = useSpring(imageY, { stiffness: 200, damping: 25 })

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const el = ref.current
			if (!el || shouldReduceMotion) return
			const rect = el.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2
			const offsetX = (e.clientX - centerX) / (rect.width / 2)
			const offsetY = (e.clientY - centerY) / (rect.height / 2)
			rotateX.set(-offsetY * 8)
			rotateY.set(offsetX * 8)
			imageX.set(offsetX * 5)
			imageY.set(offsetY * 5)
		},
		[shouldReduceMotion, rotateX, rotateY, imageX, imageY]
	)

	const handleMouseLeave = useCallback(() => {
		rotateX.set(0)
		rotateY.set(0)
		imageX.set(0)
		imageY.set(0)
	}, [rotateX, rotateY, imageX, imageY])

	const cardContent = (
		<>
			<div className="relative aspect-16/10 w-full overflow-hidden">
				<motion.div className="relative h-full w-full" style={shouldReduceMotion ? undefined : { x: springImageX, y: springImageY, scale: 1.05 }}>
					<Image src={project.coverImage} alt={project.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
				</motion.div>
				<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
				<div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
					<h3 className="text-lg font-bold text-white">{project.title}</h3>
					<div className="mt-2 flex flex-wrap gap-1.5">
						{project.tags.slice(0, 4).map((tag) => (
							<Badge key={tag} variant="secondary" className="bg-white/20 text-xs text-white backdrop-blur-sm">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-foreground">{project.title}</h3>
				<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
			</div>
		</>
	)

	if (shouldReduceMotion) {
		return (
			<Link href={`/projects/${project.slug}`} className={cn("group block overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg", className)}>
				{cardContent}
			</Link>
		)
	}

	return (
		<Link href={`/projects/${project.slug}`} className={cn("group block", className)} style={{ perspective: "800px" }}>
			<motion.div
				ref={ref}
				className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
				style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				{cardContent}
			</motion.div>
		</Link>
	)
}
