import type { Metadata } from "next"
import { AboutBio } from "@/shared/components/sections/about/about-bio"
import { AboutHero } from "@/shared/components/sections/about/about-hero"
import { AboutSkills } from "@/shared/components/sections/about/about-skills"
import { AboutTimeline } from "@/shared/components/sections/about/about-timeline"
import { CTA } from "@/shared/components/sections/cta"

export const metadata: Metadata = {
	title: "Sobre",
	description: "Conheça Luan Campos K. — desenvolvedor full-stack com mais de 8 anos de experiência em criar experiências digitais criativas e performáticas."
}

export default function AboutPage() {
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
