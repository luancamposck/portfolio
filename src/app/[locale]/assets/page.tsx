import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Suspense } from "react"
import { routing } from "@/i18n/routing"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { AssetsListing } from "@/shared/components/sections/assets/assets-listing"

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations("assetsPage")
	return {
		title: t("title"),
		description: t("metaDescription"),
		alternates: {
			canonical: `https://luancamposk.dev/${locale}/assets`,
			languages: Object.fromEntries(routing.locales.map((l) => [l, `https://luancamposk.dev/${l}/assets`]))
		}
	}
}

export default async function AssetsPage({ params }: Props) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations("assetsPage")

	return (
		<SectionWrapper className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					<TextReveal text={t("heading")} />
				</h1>
				<p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("description")}</p>

				<div className="mt-12">
					<Suspense>
						<AssetsListing locale={locale} />
					</Suspense>
				</div>
			</div>
		</SectionWrapper>
	)
}
