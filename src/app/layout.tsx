import type { Metadata } from "next"
import { Geist_Mono, Varela_Round } from "next/font/google"

import { Footer } from "@/shared/components/layout/footer"
import { Navbar } from "@/shared/components/layout/navbar"
import { ThemeProvider } from "@/shared/components/theme-provider"

import "./globals.css"

const varelaRound = Varela_Round({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-varela-round",
	display: "swap"
})

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap"
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
			<body className="min-h-full flex flex-col">
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
					>
						Pular para o conteúdo
					</a>
					<Navbar />
					{/* biome-ignore lint/correctness/useUniqueElementIds: root layout renders once — static id is safe for skip-to-content target */}
					<main id="main-content" className="flex-1 pt-16">
						{children}
					</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
