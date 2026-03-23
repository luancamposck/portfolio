import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/data/projects"

interface ProjectNavigationProps {
	prev: Project | null
	next: Project | null
}

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
	return (
		<nav className="mt-16 border-t pt-8">
			<div className="flex items-center justify-between">
				{prev ? (
					<Link href={`/projects/${prev.slug}`} className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
						<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
						<div>
							<p className="text-xs text-muted-foreground">Anterior</p>
							<p className="font-medium text-foreground">{prev.title}</p>
						</div>
					</Link>
				) : (
					<div />
				)}
				{next ? (
					<Link href={`/projects/${next.slug}`} className="group flex items-center gap-3 text-right text-sm text-muted-foreground transition-colors hover:text-foreground">
						<div>
							<p className="text-xs text-muted-foreground">Próximo</p>
							<p className="font-medium text-foreground">{next.title}</p>
						</div>
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
				) : (
					<div />
				)}
			</div>
		</nav>
	)
}
