"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Counter } from "@/shared/components/creative/counter"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

const stats = [
	{ target: 8, suffix: "+", label: "Anos de experiência" },
	{ target: 50, suffix: "+", label: "Projetos entregues" },
	{ target: 30, suffix: "+", label: "Clientes satisfeitos" },
	{ target: 25, suffix: "+", label: "Tecnologias dominadas" }
]

export function AboutPreview() {
	return (
		<SectionWrapper className="px-4 sm:px-6 py-16 sm:py-20 md:px-12 lg:px-24">
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-12 md:grid-cols-2 md:items-center">
					<div className="space-y-6">
						<h2 className="text-3xl font-bold tracking-tight md:text-4xl">
							<TextReveal text="Sobre mim" />
						</h2>
						<p className="text-muted-foreground text-lg leading-relaxed">
							Sou um desenvolvedor full-stack apaixonado por criar experiências digitais que fazem a diferença. Com anos de experiência em projetos variados, combino design criativo com código robusto para entregar
							soluções que superam expectativas.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							Minha abordagem é centrada no usuário e orientada a resultados. Acredito que a tecnologia deve servir às pessoas, e cada projeto é uma oportunidade de criar algo que realmente impacta vidas e negócios.
						</p>
						<Link href="/about" className="group inline-flex items-center gap-2 font-medium text-primary hover:underline">
							Saiba mais
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:gap-6">
						{stats.map((stat) => (
							<div key={stat.label} className="bg-card rounded-xl border p-4 sm:p-6 text-center">
								<div className="text-primary text-2xl sm:text-3xl font-bold md:text-4xl">
									<Counter target={stat.target} suffix={stat.suffix} />
								</div>
								<p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
