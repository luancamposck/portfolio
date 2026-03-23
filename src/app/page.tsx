import { AboutPreview } from "@/shared/components/sections/about-preview"
import { CTA } from "@/shared/components/sections/cta"
import { FeaturedProjects } from "@/shared/components/sections/featured-projects"
import { Hero } from "@/shared/components/sections/hero"
import { TechStack } from "@/shared/components/sections/tech-stack"

const HomePage = () => {
	return (
		<>
			<Hero />
			<TechStack />
			<FeaturedProjects />
			<AboutPreview />
			<CTA />
		</>
	)
}

export default HomePage
