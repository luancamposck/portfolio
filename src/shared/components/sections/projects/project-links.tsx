"use client"

import { ExternalLink, Github } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { buttonVariants } from "@/shared/components/ui/button-variants"

type ProjectLinksProps = {
	liveUrl?: string
	githubUrl?: string
}

export function ProjectLinks({ liveUrl, githubUrl }: ProjectLinksProps) {
	const t = useTranslations("projectDetail")

	return (
		<div className="flex flex-wrap gap-3">
			{liveUrl && (
				<a href={liveUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default" })}>
					<ExternalLink data-icon="inline-start" />
					{t("viewLive")}
				</a>
			)}
			{githubUrl && (
				<a href={githubUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
					<Github data-icon="inline-start" />
					GitHub
				</a>
			)}
		</div>
	)
}

export function BackToProjectsLink() {
	const t = useTranslations("projectDetail")

	return (
		<div className="mt-8">
			<Link href="/projects" className={buttonVariants({ variant: "outline" })}>
				&larr; {t("backToProjects")}
			</Link>
		</div>
	)
}
