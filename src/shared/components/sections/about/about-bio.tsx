"use client"

import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

export function AboutBio() {
	return (
		<SectionWrapper className="py-16">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight mb-8 md:text-4xl">
					<TextReveal text="Sobre mim" />
				</h2>

				<div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
					<p>
						Sou um desenvolvedor full-stack com mais de 8 anos de experiência construindo produtos digitais que combinam design criativo com engenharia de alta qualidade. Minha jornada começou na curiosidade de entender
						como as coisas funcionam na web — e se transformou numa paixão por criar experiências que realmente importam.
					</p>
					<p>
						Ao longo dos anos, trabalhei com startups, agências e empresas de tecnologia, sempre buscando o equilíbrio entre performance, acessibilidade e estética. Acredito que o melhor código é aquele que serve às
						pessoas — invisível para o usuário, mas poderoso por trás das telas.
					</p>
					<p>
						Minha abordagem é centrada no usuário e orientada a resultados. Cada projeto é uma oportunidade de resolver problemas reais, simplificar o complexo e entregar valor mensurável. Gosto de desafios que me
						empurram para fora da zona de conforto e me permitem aprender algo novo.
					</p>
				</div>
			</div>
		</SectionWrapper>
	)
}
