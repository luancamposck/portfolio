import { toHtml } from "hast-util-to-html"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { codeToHtml } from "shiki"
import { unified } from "unified"
import { type AssetLocale, assets, getAssetBySlug, getAssetsByLocale } from "@/data/assets"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { AssetCodeBlock } from "@/shared/components/sections/assets/asset-code-block"
import { AssetNavigation } from "@/shared/components/sections/assets/asset-navigation"
import { Badge } from "@/shared/components/ui/badge"

const languageColors: Record<string, string> = {
	ts: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
	js: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
	python: "bg-green-500/15 text-green-700 dark:text-green-400",
	go: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
	bash: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
	css: "bg-pink-500/15 text-pink-700 dark:text-pink-400",
	yaml: "bg-red-500/15 text-red-700 dark:text-red-400"
}

type Props = {
	params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
	return assets.map((asset) => ({
		slug: asset.slug
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params
	setRequestLocale(locale)
	const asset = getAssetBySlug(slug)

	if (!asset) {
		const t = await getTranslations("assetDetail")
		return { title: t("notFoundTitle") }
	}

	return {
		title: asset.title,
		description: asset.description,
		alternates: {
			canonical: `https://luancamposk.dev/${locale}/assets/${slug}`,
			languages: Object.fromEntries(routing.locales.map((l) => [l, `https://luancamposk.dev/${l}/assets/${slug}`]))
		}
	}
}

async function renderMarkdown(markdown: string): Promise<string> {
	const processor = unified().use(remarkParse).use(remarkRehype)
	const mdast = processor.parse(markdown)
	const hast = await processor.run(mdast)
	return toHtml(hast)
}

export default async function AssetDetailPage({ params }: Props) {
	const { locale, slug } = await params
	setRequestLocale(locale)
	const asset = getAssetBySlug(slug)

	if (!asset) {
		notFound()
	}

	const t = await getTranslations("assetDetail")

	const [highlightedCode, explanationHtml] = await Promise.all([
		codeToHtml(asset.code, {
			lang: asset.language,
			themes: {
				dark: "github-dark-default",
				light: "github-light-default"
			}
		}),
		renderMarkdown(asset.explanation)
	])

	const localeAssets = getAssetsByLocale(locale as AssetLocale)
	const currentIndex = localeAssets.findIndex((a) => a.slug === slug)
	const prevAsset = currentIndex > 0 ? localeAssets[currentIndex - 1] : null
	const nextAsset = currentIndex < localeAssets.length - 1 ? localeAssets[currentIndex + 1] : null

	return (
		<article className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
			<div className="flex items-start justify-between gap-4">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{asset.title}</h1>
				<Badge className={languageColors[asset.language] ?? "bg-muted text-muted-foreground"}>{asset.language}</Badge>
			</div>
			<p className="mt-3 text-lg text-muted-foreground">{asset.description}</p>

			<div className="mt-4 flex flex-wrap gap-2">
				{asset.tags.map((tag) => (
					<Link key={tag} href={`/assets?search=${encodeURIComponent(tag)}`}>
						<Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
							{tag}
						</Badge>
					</Link>
				))}
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-semibold">{t("codeHeading")}</h2>
				<div className="mt-4">
					<AssetCodeBlock code={asset.code} highlightedHtml={highlightedCode} />
				</div>
			</div>

			<div className="mt-12">
				<h2 className="text-xl font-semibold">{t("explanationHeading")}</h2>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: server-generated markdown from trusted asset data */}
				<div className="prose prose-neutral dark:prose-invert mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: explanationHtml }} />
			</div>

			<AssetNavigation prev={prevAsset} next={nextAsset} />

			<div className="mt-8">
				<Link href="/assets" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
					&larr; {t("backToAssets")}
				</Link>
			</div>
		</article>
	)
}
