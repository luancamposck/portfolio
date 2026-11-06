import type { Metadata } from "next"
import "../globals.css"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { routing } from "@/i18n/routing"
import { assets } from "@/modules/assets/data"
import { getAllPosts } from "@/modules/blog/data"
import { Footer } from "@/shared/components/layout/footer"
import { Navbar } from "@/shared/components/layout/navbar"
import { ThemeProvider } from "@/shared/components/theme-provider"
import { geistMono, metadata, varelaRound } from "../site-metadata"

const ogLocaleMap: Record<string, string> = {
	pt: "pt_BR",
	en: "en_US",
	es: "es_ES"
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params

	return {
		...metadata,
		openGraph: {
			...metadata.openGraph,
			locale: ogLocaleMap[locale],
			alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l])
		}
	}
}

const LocaleLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
	const { locale } = await params

	if (!routing.locales.includes(locale as Locale)) {
		notFound()
	}

	const messages = await getMessages()
	const t = await getTranslations("layout")

	return (
		<html lang={locale === "pt" ? "pt-BR" : locale} className={`${varelaRound.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
						<a
							href="#main-content"
							className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
						>
							{t("skipToContent")}
						</a>
						<Navbar contentLocales={{ blog: getAllPosts().map(({ slug, locale }) => ({ slug, locale })), assets: assets.map(({ slug, locale }) => ({ slug, locale })) }} />
						<main id="main-content" className="flex-1 pt-16">
							{children}
						</main>
						<Footer />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

export default LocaleLayout
