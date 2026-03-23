"use client"

import { Briefcase } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { Badge } from "@/shared/components/ui/badge"

const experiences = [
	{
		role: "Senior Full-Stack Developer",
		company: "Nexus Digital Agency",
		period: "2022 — Presente",
		description: "Liderança técnica em projetos de alto impacto para clientes enterprise. Arquitetura de soluções escaláveis com Next.js, Node.js e serviços AWS.",
		tags: ["Next.js", "Node.js", "AWS", "PostgreSQL"]
	},
	{
		role: "Full-Stack Developer",
		company: "TechVista Solutions",
		period: "2020 — 2022",
		description: "Desenvolvimento de plataformas SaaS e e-commerce. Implementação de pipelines CI/CD e práticas de DevOps para entregas contínuas.",
		tags: ["React", "TypeScript", "Docker", "MongoDB"]
	},
	{
		role: "Frontend Developer",
		company: "Criativa Digital",
		period: "2018 — 2020",
		description: "Criação de interfaces responsivas e acessíveis com foco em performance. Colaboração direta com equipes de design para traduzir protótipos em código.",
		tags: ["React", "Tailwind CSS", "Figma", "REST APIs"]
	},
	{
		role: "Desenvolvedor Júnior",
		company: "StartUp Labs",
		period: "2016 — 2018",
		description: "Início de carreira desenvolvendo features em aplicações web. Aprendizado acelerado em metodologias ágeis e boas práticas de código.",
		tags: ["JavaScript", "HTML/CSS", "Node.js", "Git"]
	}
]

export function AboutTimeline() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<SectionWrapper className="py-16">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight mb-12 md:text-4xl">
					<TextReveal text="Experiência Profissional" />
				</h2>

				<div className="relative">
					{/* Vertical line */}
					<div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

					<div className="space-y-12">
						{experiences.map((exp, index) => (
							<motion.div
								key={exp.company}
								className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
								initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
							>
								{/* Timeline dot */}
								<div className="absolute left-4 top-1 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2">
									<Briefcase className="size-4 text-primary" />
								</div>

								{/* Content card */}
								<div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
									<div className="rounded-lg border bg-card p-6">
										<span className="text-sm font-medium text-primary">{exp.period}</span>
										<h3 className="mt-1 text-lg font-bold">{exp.role}</h3>
										<p className="text-sm text-muted-foreground">{exp.company}</p>
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
										<div className="mt-4 flex flex-wrap gap-1.5">
											{exp.tags.map((tag) => (
												<Badge key={tag} variant="secondary" className="text-xs">
													{tag}
												</Badge>
											))}
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
