import { Marquee } from "@/shared/components/creative/marquee"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { Separator } from "@/shared/components/ui/separator"

const technologies = ["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "GraphQL", "Redis", "Prisma", "Figma", "Git", "Python", "Go", "Kubernetes", "MongoDB", "Vercel"]

export function TechStack() {
	return (
		<SectionWrapper className="py-16">
			<Separator className="mb-8" />
			<div className="space-y-2">
				<Marquee items={technologies} speed={25} />
				<Marquee items={[...technologies].reverse()} speed={35} className="opacity-60" />
			</div>
			<Separator className="mt-8" />
		</SectionWrapper>
	)
}
