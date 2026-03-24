import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

const varelaRound = localFont({
	src: "../../public/fonts/varela-round-latin.woff2",
	weight: "400",
	style: "normal",
	variable: "--font-varela-round",
	display: "swap",
	fallback: ["system-ui", "arial", "sans-serif"]
})

const geistMono = localFont({
	src: "../../public/fonts/geist-mono-latin.woff2",
	variable: "--font-geist-mono",
	display: "swap",
	fallback: ["ui-monospace", "monospace"]
})

export const metadata: Metadata = {
	title: {
		default: "Luan Campos K. — Desenvolvedor Full-Stack",
		template: "%s | Luan Campos K."
	},
	description: "Portfólio de Luan Campos K. — Desenvolvedor full-stack especializado em criar experiências digitais criativas e performáticas com React, Next.js e TypeScript.",
	metadataBase: new URL("https://luancamposk.dev"),
	openGraph: {
		type: "website",
		locale: "pt_BR",
		siteName: "Luan Campos K.",
		title: "Luan Campos K. — Desenvolvedor Full-Stack",
		description: "Portfólio de Luan Campos K. — Desenvolvedor full-stack especializado em criar experiências digitais criativas e performáticas.",
		images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Luan Campos K. — Desenvolvedor Full-Stack" }]
	},
	twitter: {
		card: "summary_large_image",
		title: "Luan Campos K. — Desenvolvedor Full-Stack",
		description: "Portfólio de Luan Campos K. — Desenvolvedor full-stack especializado em criar experiências digitais criativas e performáticas."
	},
	robots: {
		index: true,
		follow: true
	}
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<html lang="pt-BR" className={`${varelaRound.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	)
}

export default RootLayout
