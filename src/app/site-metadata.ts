import type { Metadata } from "next"
import localFont from "next/font/local"

export const varelaRound = localFont({
	src: "../../public/fonts/varela-round-latin.woff2",
	weight: "400",
	style: "normal",
	variable: "--font-varela-round",
	display: "swap",
	fallback: ["system-ui", "arial", "sans-serif"]
})

export const geistMono = localFont({
	src: "../../public/fonts/geist-mono-latin.woff2",
	variable: "--font-geist-mono",
	display: "swap",
	fallback: ["ui-monospace", "monospace"]
})

export const metadata: Metadata = {
	title: {
		default: "Luan Campos K. — Desenvolvedor full stack sênior",
		template: "%s | Luan Campos K."
	},
	description: "Portfólio de Luan Campos K. — Desenvolvedor full stack sênior com experiência em produtos digitais, integrações e IA aplicada.",
	metadataBase: new URL("https://luancamposk.dev"),
	openGraph: {
		type: "website",
		locale: "pt_BR",
		siteName: "Luan Campos K.",
		title: "Luan Campos K. — Desenvolvedor full stack sênior",
		description: "Portfólio de Luan Campos K. — Desenvolvedor full stack sênior com experiência em produtos digitais, integrações e IA aplicada.",
		images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Luan Campos K. — Desenvolvedor full stack sênior" }]
	},
	twitter: {
		card: "summary_large_image",
		title: "Luan Campos K. — Desenvolvedor full stack sênior",
		description: "Portfólio de Luan Campos K. — Desenvolvedor full stack sênior com experiência em produtos digitais, integrações e IA aplicada."
	},
	robots: {
		index: true,
		follow: true
	}
}
