import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { routing } from "@/i18n/routing"
import { Footer } from "@/shared/components/layout/footer"
import { Navbar } from "@/shared/components/layout/navbar"
import { ThemeProvider } from "@/shared/components/theme-provider"

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }))
}

const LocaleLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
	const { locale } = await params

	if (!routing.locales.includes(locale as Locale)) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()
	const t = await getTranslations("layout")

	return (
		<NextIntlClientProvider messages={messages}>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
				>
					{t("skipToContent")}
				</a>
				<Navbar />
				{/* biome-ignore lint/correctness/useUniqueElementIds: root layout renders once — static id is safe for skip-to-content target */}
				<main id="main-content" className="flex-1 pt-16">
					{children}
				</main>
				<Footer />
			</ThemeProvider>
		</NextIntlClientProvider>
	)
}

export default LocaleLayout
