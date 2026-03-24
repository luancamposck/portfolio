import { ArrowLeft, ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import type { Project } from "@/data/projects"
import { Link } from "@/i18n/navigation"

interface ProjectNavigationProps {
	prev: Project | null
	next: Project | null
}

export async function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
	const t = await getTranslations("projectNavigation")

	return (
		<nav className="mt-16 border-t pt-8">
			<div className="flex items-center justify-between">
				{prev ? (
					<Link href={`/projects/${prev.slug}`} className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
						<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
						<div>
							<p className="text-xs text-muted-foreground">{t("previous")}</p>
							<p className="font-medium text-foreground">{prev.title}</p>
						</div>
					</Link>
				) : (
					<div />
				)}
				{next ? (
					<Link href={`/projects/${next.slug}`} className="group flex items-center gap-3 text-right text-sm text-muted-foreground transition-colors hover:text-foreground">
						<div>
							<p className="text-xs text-muted-foreground">{t("next")}</p>
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
