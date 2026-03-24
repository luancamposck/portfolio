import { getTranslations, setRequestLocale } from "next-intl/server"
import { AboutPreview } from "@/shared/components/sections/about-preview"
import { CTA } from "@/shared/components/sections/cta"
import { FeaturedProjects } from "@/shared/components/sections/featured-projects"
import { Hero } from "@/shared/components/sections/hero"
import { TechStack } from "@/shared/components/sections/tech-stack"

type Props = {
	params: Promise<{ locale: string }>
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
		sameAs: ["https://github.com/luancamposk", "https://linkedin.com/in/luancamposk"],
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
