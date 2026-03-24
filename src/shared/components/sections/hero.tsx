"use client"

import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { GradientBlob } from "@/shared/components/creative/gradient-blob"
import { TextReveal } from "@/shared/components/creative/text-reveal"

const CursorSpotlight = dynamic(() => import("@/shared/components/creative/cursor-spotlight").then((mod) => ({ default: mod.CursorSpotlight })), { ssr: false })
const MagneticButton = dynamic(() => import("@/shared/components/creative/magnetic-button").then((mod) => ({ default: mod.MagneticButton })), { ssr: false })

export function Hero() {
	return (
		<section className="relative min-h-svh flex items-center justify-center overflow-hidden -mt-16 pt-16">
			{/* Background blobs */}
			<GradientBlob className="top-1/4 -left-20" color="bg-primary/20" size="w-96 h-96" delay={0} />
			<GradientBlob className="bottom-1/4 right-0" color="bg-chart-1/20" size="w-80 h-80" delay={2} />
			<GradientBlob className="top-1/2 left-1/2 -translate-x-1/2" color="bg-chart-4/15" size="w-64 h-64" delay={4} />

			{/* Cursor spotlight */}
			<CursorSpotlight className="pointer-events-auto" />

			{/* Content */}
			<div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
					<TextReveal text="Transformando ideias em experiências digitais memoráveis" delay={0.2} />
				</h1>
				<p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
					<TextReveal text="Desenvolvedor full-stack apaixonado por criar interfaces bonitas, performáticas e que entregam resultados reais." delay={0.8} />
				</p>
				<MagneticButton>
					<Link
						href="/projects"
						className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
					>
						Ver projetos
						<ArrowRight className="h-5 w-5" />
					</Link>
				</MagneticButton>
			</div>
		</section>
	)
}
