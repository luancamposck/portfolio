import { ExternalLink, Github } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProjectBySlug, projects } from "@/data/projects"
import { ProjectGallery } from "@/shared/components/sections/projects/project-gallery"
import { ProjectNavigation } from "@/shared/components/sections/projects/project-navigation"
import { ProjectResults } from "@/shared/components/sections/projects/project-results"
import { Badge } from "@/shared/components/ui/badge"
import { buttonVariants } from "@/shared/components/ui/button-variants"

type Props = {
	params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const project = getProjectBySlug(slug)

	if (!project) {
		return { title: "Projeto não encontrado" }
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: project.title,
			description: project.description,
			images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.title }]
		}
	}
}

export default async function ProjectDetailPage({ params }: Props) {
	const { slug } = await params
	const project = getProjectBySlug(slug)

	if (!project) {
		notFound()
	}

	const currentIndex = projects.findIndex((p) => p.slug === slug)
	const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
	const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

	return (
		<article>
			{/* Hero: full-width cover image with title overlay */}
			<div className="relative -mt-16 h-[50vh] min-h-[400px] w-full sm:h-[60vh]">
				<Image src={project.coverImage} alt={project.title} fill className="object-cover" priority sizes="100vw" />
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
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
							<p className="font-medium text-muted-foreground">Cliente</p>
							<p className="mt-1 font-semibold">{project.client}</p>
						</div>
						<div>
							<p className="font-medium text-muted-foreground">Ano</p>
							<p className="mt-1 font-semibold">{project.year}</p>
						</div>
						<div>
							<p className="font-medium text-muted-foreground">Categoria</p>
							<p className="mt-1 font-semibold">{project.category}</p>
						</div>
					</div>

					<div className="flex flex-wrap gap-3">
						{project.liveUrl && (
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default" })}>
								<ExternalLink data-icon="inline-start" />
								Ver ao vivo
							</a>
						)}
						{project.githubUrl && (
							<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
								<Github data-icon="inline-start" />
								GitHub
							</a>
						)}
					</div>
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
					<h2 className="text-2xl font-bold">Sobre o projeto</h2>
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

				<div className="mt-8">
					<Link href="/projects" className={buttonVariants({ variant: "outline" })}>
						&larr; Voltar aos projetos
					</Link>
				</div>
			</div>
		</article>
	)
}
