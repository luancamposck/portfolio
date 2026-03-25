import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { AboutPreview } from "@/shared/components/sections/about-preview"
import { CTA } from "@/shared/components/sections/cta"
import { FeaturedProjects } from "@/shared/components/sections/featured-projects"
import { Hero } from "@/shared/components/sections/hero"
import { TechStack } from "@/shared/components/sections/tech-stack"

type Props = {
	params: Promise<{ locale: string }>
}

const BASE_URL = "https://luancamposk.dev"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations("metadata")
	return {
		title: t("title"),
		description: t("description"),
		alternates: {
			canonical: `${BASE_URL}/${locale}`,
			languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}`]))
		}
	}
}

const HomePage = async ({ params }: Props) => {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations("metadata")

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Luan Campos K.",
		url: "https://luancamposk.dev",
		jobTitle: t("title"),
		description: t("description"),
		sameAs: ["https://github.com/luancamposck"],
		knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"]
	}

	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML — content is a static object, not user input */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<Hero />
			<TechStack />
			<FeaturedProjects />
			<AboutPreview />
			<CTA />
		</>
	)
}

export default HomePage
