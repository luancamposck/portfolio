import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { getProjectBySlug, projects } from "@/data/projects"
import { routing } from "@/i18n/routing"
import { ProjectGallery } from "@/shared/components/sections/projects/project-gallery"
import { BackToProjectsLink, ProjectLinks } from "@/shared/components/sections/projects/project-links"
import { ProjectNavigation } from "@/shared/components/sections/projects/project-navigation"
import { ProjectResults } from "@/shared/components/sections/projects/project-results"
import { Badge } from "@/shared/components/ui/badge"

type Props = {
	params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params
	setRequestLocale(locale)
	const project = getProjectBySlug(slug)

	if (!project) {
		const t = await getTranslations("projectDetail")
		return { title: t("notFoundTitle") }
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }]
		},
		alternates: {
			canonical: `https://luancamposk.dev/${locale}/projects/${slug}`,
			languages: Object.fromEntries(routing.locales.map((l) => [l, `https://luancamposk.dev/${l}/projects/${slug}`]))
		}
	}
}

export default async function ProjectDetailPage({ params }: Props) {
	const { locale, slug } = await params
	setRequestLocale(locale)
	const project = getProjectBySlug(slug)

	if (!project) {
		notFound()
	}

	const t = await getTranslations("projectDetail")

	const currentIndex = projects.findIndex((p) => p.slug === slug)
	const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
	const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

	return (
		<article>
			{/* Hero: full-width cover image with title overlay */}
			<div className="relative -mt-16 h-[50vh] min-h-100 w-full sm:h-[60vh]">
				<Image src={project.coverImage} alt={project.title} fill className="object-contain mx-auto max-w-5xl" priority sizes="100vw" />
				<div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/20" />
				<div className="absolute inset-x-0 bottom-0 pb-10 pt-16">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<p className="text-sm font-medium text-muted-foreground">{project.category}</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
						<p className="mt-3 max-w-2xl text-lg text-muted-foreground">{project.subtitle}</p>
					</div>
				</div>
			</div>

			{/* Info section */}
			<div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
						<div>
							<p className="font-medium text-muted-foreground">{t("client")}</p>
							<p className="mt-1 font-semibold">{project.client}</p>
						</div>
						<div>
							<p className="font-medium text-muted-foreground">{t("year")}</p>
							<p className="mt-1 font-semibold">{project.year}</p>
						</div>
						<div>
							<p className="font-medium text-muted-foreground">{t("category")}</p>
							<p className="mt-1 font-semibold">{project.category}</p>
						</div>
					</div>

					<ProjectLinks liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
				</div>

				{/* Tags */}
				<div className="mt-8 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>

				{/* Long description */}
				<div className="mt-12">
					<h2 className="text-2xl font-bold">{t("aboutProject")}</h2>
					<div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
						{project.longDescription.split("\n\n").map((paragraph) => (
							<p key={paragraph.slice(0, 40)}>{paragraph}</p>
						))}
					</div>
				</div>
			</div>

			{/* Image gallery */}
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<ProjectGallery images={project.images} title={project.title} />
			</div>

			{/* Results */}
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<ProjectResults results={project.results} />
			</div>

			{/* Prev/Next navigation + Back link */}
			<div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
				<ProjectNavigation prev={prevProject} next={nextProject} />

				<BackToProjectsLink />
			</div>
		</article>
	)
}
