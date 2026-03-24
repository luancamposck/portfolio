import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { TextReveal } from "@/shared/components/creative/text-reveal"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"
import { BlogListing } from "@/shared/components/sections/blog/blog-listing"

type Props = {
	params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations("blogPage")
	return {
		title: t("title"),
		description: t("metaDescription")
	}
}

export default async function BlogPage({ params }: Props) {
	const { locale } = await params
	setRequestLocale(locale)
	const t = await getTranslations("blogPage")

	return (
		<SectionWrapper className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					<TextReveal text={t("heading")} />
				</h1>
				<p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("description")}</p>

				<div className="mt-12">
					<BlogListing locale={locale} />
				</div>
			</div>
		</SectionWrapper>
	)
}
