"use client"

import { useTranslations } from "next-intl"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

export function AboutBio() {
	const t = useTranslations("aboutBio")

	return (
		<SectionWrapper className="py-16">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight mb-8 md:text-4xl">
					<TextReveal text={t("heading")} />
				</h2>

				<div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
					<p>{t("paragraph1")}</p>
					<p>{t("paragraph2")}</p>
					<p>{t("paragraph3")}</p>
				</div>
			</div>
		</SectionWrapper>
	)
}
