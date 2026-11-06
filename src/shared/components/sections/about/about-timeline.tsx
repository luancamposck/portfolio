"use client"

import { Briefcase } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { Badge } from "@/shared/components/ui/badge"

const experienceKeys = ["embalalab", "kyntech", "gabinete", "yampi", "meo", "yieldmaster", "bankup", "rodrigocar"] as const

const companyLogos: Partial<Record<(typeof experienceKeys)[number], string>> = {
	embalalab: "/images/companies/embalalab.jpeg",
	kyntech: "/images/companies/kyntech.png",
	gabinete: "/images/companies/gabinete-neo.png",
	yampi: "/images/companies/yampi.jpeg",
	meo: "/images/companies/meo-leasing.jpeg",
	yieldmaster: "/images/companies/yieldmaster.png",
	bankup: "/images/companies/bankup.png",
	rodrigocar: "/images/companies/rodrigocar.png"
}

const experienceTags: Record<(typeof experienceKeys)[number], string[]> = {
	embalalab: ["TypeScript", "Next.js", "Python", "FastAPI", "NestJS", "Linux"],
	kyntech: ["TypeScript", "Next.js", "Python", "FastAPI", "Linux"],
	gabinete: ["Next.js", "PostgreSQL", "Stripe", "React Query", "AWS"],
	yampi: ["Node.js", "Express", "Vue", "PostgreSQL", "Bling API"],
	meo: ["Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
	yieldmaster: ["React", "Next.js", "Node.js", "PostgreSQL", "Python"],
	bankup: ["Python", "Node.js", "Next.js", "Docker", "AWS"],
	rodrigocar: ["React", "Node.js", "PostgreSQL", "RabbitMQ", "OAuth"]
}

export function AboutTimeline() {
	const t = useTranslations("aboutTimeline")
	const shouldReduceMotion = useReducedMotion()

	return (
		<SectionWrapper className="py-16">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight mb-12 md:text-4xl">
					<TextReveal text={t("heading")} />
				</h2>

				<div className="relative">
					{/* Vertical line */}
					<div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

					<div className="space-y-12">
						{experienceKeys.map((key, index) => (
							<motion.div
								key={key}
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
										<div className="flex items-start gap-4">
											{companyLogos[key] && <Image src={companyLogos[key]} alt="" width={56} height={56} className="size-14 shrink-0 rounded-lg border object-contain" />}
											<div className="min-w-0">
												<span className="text-sm font-medium text-primary">{t(`experiences.${key}.period`)}</span>
												<h3 className="mt-1 text-lg font-bold">{t(`experiences.${key}.company`)}</h3>
												<p className="text-sm text-muted-foreground">{t(`experiences.${key}.role`)}</p>
											</div>
										</div>
										<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`experiences.${key}.description`)}</p>
										<div className="mt-4 flex flex-wrap gap-1.5">
											{experienceTags[key].map((tag) => (
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
