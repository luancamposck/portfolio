"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

const MagneticButton = dynamic(() => import("@/shared/components/creative/magnetic-button").then((mod) => ({ default: mod.MagneticButton })), { ssr: false })

const socialLinks = [
	{ href: "https://github.com/luancamposk", label: "GitHub", icon: Github },
	{ href: "https://linkedin.com/in/luancamposk", label: "LinkedIn", icon: Linkedin }
]

export function CTA() {
	return (
		<SectionWrapper className="px-4 sm:px-6 py-16 sm:py-20 md:px-12 lg:px-24">
			<div className="mx-auto max-w-4xl">
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/30 to-primary/5 p-6 sm:p-10 text-center md:p-16">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-5xl">
						<TextReveal text="Vamos construir algo incrível juntos?" />
					</h2>
					<p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">Entre em contato e vamos transformar sua ideia em uma experiência digital memorável.</p>

					<div className="mt-10">
						<MagneticButton>
							<Link href="mailto:contato@luancamposk.dev" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 sm:px-8 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
								<Mail className="size-5" />
								Entrar em contato
							</Link>
						</MagneticButton>
					</div>

					<div className="mt-8 flex items-center justify-center gap-6">
						{socialLinks.map((link) => (
							<a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label={link.label}>
								<link.icon className="size-6" />
							</a>
						))}
					</div>
				</div>
			</div>
		</SectionWrapper>
	)
}
