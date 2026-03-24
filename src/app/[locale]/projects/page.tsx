import type { Metadata } from "next"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { ProjectsListing } from "@/shared/components/sections/projects/projects-listing"

export const metadata: Metadata = {
	title: "Projetos",
	description: "Explore meu portfólio de projetos — aplicações web, SaaS, e-commerce e mobile desenvolvidas com tecnologias modernas."
}

export default function ProjectsPage() {
	return (
		<SectionWrapper className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					<TextReveal text="Todos os projetos" />
				</h1>
				<p className="mt-4 max-w-2xl text-lg text-muted-foreground">Uma coleção completa dos projetos que desenvolvi, organizados por categoria.</p>

				<div className="mt-12">
					<ProjectsListing />
				</div>
			</div>
		</SectionWrapper>
	)
}
