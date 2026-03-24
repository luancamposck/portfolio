import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { AboutBio } from "@/shared/components/sections/about/about-bio"
import { AboutHero } from "@/shared/components/sections/about/about-hero"
import { AboutSkills } from "@/shared/components/sections/about/about-skills"
import { AboutTimeline } from "@/shared/components/sections/about/about-timeline"
import { CTA } from "@/shared/components/sections/cta"

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations("aboutPage")
	return {
		title: t("title"),
		description: t("metaDescription")
	}
}

export default async function AboutPage({ params }: Props) {
	const { locale } = await params
	setRequestLocale(locale)

	return (
		<>
			<AboutHero />
			<AboutBio />
			<AboutSkills />
			<AboutTimeline />
			<CTA />
		</>
	)
}
