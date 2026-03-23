import { AboutPreview } from "@/shared/components/sections/about-preview"
import { CTA } from "@/shared/components/sections/cta"
import { FeaturedProjects } from "@/shared/components/sections/featured-projects"
import { Hero } from "@/shared/components/sections/hero"
import { TechStack } from "@/shared/components/sections/tech-stack"

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Luan Campos K.",
	url: "https://luancamposk.dev",
	jobTitle: "Desenvolvedor Full-Stack",
	description: "Desenvolvedor full-stack com mais de 8 anos de experiência em criar experiências digitais criativas e performáticas.",
	sameAs: ["https://github.com/luancamposk", "https://linkedin.com/in/luancamposk"],
	knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL"]
}

const HomePage = () => {
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
