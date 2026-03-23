"use client"

import { motion, useReducedMotion } from "motion/react"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { Badge } from "@/shared/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"

const skillCategories = [
	{
		title: "Frontend",
		skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion", "HTML/CSS", "Figma"]
	},
	{
		title: "Backend",
		skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Redis"]
	},
	{
		title: "DevOps",
		skills: ["Docker", "AWS", "Vercel", "CI/CD", "GitHub Actions", "Nginx", "Linux"]
	},
	{
		title: "Tools",
		skills: ["Git", "VS Code", "Postman", "Jira", "Notion", "Storybook", "Vitest"]
	}
]

export function AboutSkills() {
	const shouldReduceMotion = useReducedMotion()

	return (
		<SectionWrapper className="py-16">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight mb-12 md:text-4xl">
					<TextReveal text="Habilidades & Tecnologias" />
				</h2>

				<div className="grid gap-6 sm:grid-cols-2">
					{skillCategories.map((category, categoryIndex) => (
						<motion.div
							key={category.title}
							initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: categoryIndex * 0.1, ease: "easeOut" }}
						>
							<Card>
								<CardHeader>
									<CardTitle>{category.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										{category.skills.map((skill) => (
											<Badge key={skill} variant="secondary">
												{skill}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</SectionWrapper>
	)
}
