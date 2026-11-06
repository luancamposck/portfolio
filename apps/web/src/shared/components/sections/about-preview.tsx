"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

const areas = ["architecture", "fullstack", "integrations", "ai"] as const

export function AboutPreview() {
	const t = useTranslations("aboutPreview")

	return (
		<SectionWrapper className="px-4 sm:px-6 py-16 sm:py-20 md:px-12 lg:px-24">
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-12 md:grid-cols-2 md:items-center">
					<div className="space-y-6">
						<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
							<TextReveal text={t("heading")} />
						</h2>
						<p className="text-muted-foreground text-lg leading-relaxed">{t("bio1")}</p>
						<p className="text-muted-foreground leading-relaxed">{t("bio2")}</p>
						<Link href="/about" className="group inline-flex items-center gap-2 font-medium text-primary hover:underline">
							{t("learnMore")}
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:gap-6">
						{areas.map((area) => (
							<div key={area} className="flex min-h-24 items-center rounded-xl border bg-card p-4 sm:p-6 text-lg font-medium text-foreground">
								{t(`areas.${area}`)}
							</div>
						))}
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
