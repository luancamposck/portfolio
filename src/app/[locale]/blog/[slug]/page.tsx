import { Calendar, Clock, Tag } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { type BlogLocale, getAllPosts, getPostBySlug, getPostsByLocale } from "@/data/blog-posts"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { useMDXComponents } from "@/mdx-components"
import { BlogNavigation } from "@/shared/components/sections/blog/blog-navigation"
import { Badge } from "@/shared/components/ui/badge"

type Props = {
	params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
	return getAllPosts().map((post) => ({
		slug: post.slug
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params
	setRequestLocale(locale)
	const post = getPostBySlug(slug)

	if (!post) {
		const t = await getTranslations("blogDetail")
		return { title: t("notFoundTitle") }
	}

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			publishedTime: post.date,
			modifiedTime: post.updatedAt,
			tags: post.tags,
			...(post.coverImage ? { images: [post.coverImage] } : {})
		},
		alternates: {
			canonical: `https://luancamposk.dev/${locale}/blog/${slug}`,
			languages: Object.fromEntries(routing.locales.map((l) => [l, `https://luancamposk.dev/${l}/blog/${slug}`]))
		}
	}
}

function formatDate(dateStr: string, locale: string): string {
	const localeMap: Record<string, string> = {
		pt: "pt-BR",
		en: "en-US",
		es: "es-ES"
	}
	return new Date(dateStr).toLocaleDateString(localeMap[locale] ?? locale, {
		year: "numeric",
		month: "long",
		day: "numeric"
	})
}

const rehypePrettyCodeOptions = {
	theme: {
		dark: "github-dark-default",
		light: "github-light-default"
	},
	keepBackground: false
}

export default async function BlogPostPage({ params }: Props) {
	const { locale, slug } = await params
	setRequestLocale(locale)
	const post = getPostBySlug(slug)

	if (!post) {
		notFound()
	}

	const t = await getTranslations("blogDetail")
	const components = useMDXComponents()

	const localePosts = getPostsByLocale(locale as BlogLocale)
	const currentIndex = localePosts.findIndex((p) => p.slug === slug)
	const prevPost = currentIndex > 0 ? localePosts[currentIndex - 1] : null
	const nextPost = currentIndex < localePosts.length - 1 ? localePosts[currentIndex + 1] : null

	return (
		<article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
			{/* Header */}
			<header>
				{post.coverImage && (
					<div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
						<Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
					</div>
				)}

				<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					<Badge variant="secondary">{post.category}</Badge>
				</div>

				<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>

				<p className="mt-4 text-lg text-muted-foreground">{post.description}</p>

				<div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
					<span className="flex items-center gap-1.5">
						<Calendar className="size-4" />
						{formatDate(post.date, locale)}
					</span>
					<span className="flex items-center gap-1.5">
						<Clock className="size-4" />
						{t("readingTime", { time: post.readingTime })}
					</span>
				</div>

				{post.tags.length > 0 && (
					<div className="mt-4 flex flex-wrap items-center gap-2">
						<Tag className="size-4 text-muted-foreground" />
						{post.tags.map((tag) => (
							<Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`}>
								<Badge variant="outline" className="cursor-pointer hover:bg-secondary/80">
									{tag}
								</Badge>
							</Link>
						))}
					</div>
				)}
			</header>

			{/* MDX Content */}
			<div className="prose prose-neutral dark:prose-invert mt-12 max-w-none prose-headings:scroll-mt-20 prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80">
				<MDXRemote
					source={post.content}
					components={components}
					options={{
						mdxOptions: {
							rehypePlugins: [
								rehypeSlug,
								[rehypePrettyCode, rehypePrettyCodeOptions],
								[
									rehypeAutolinkHeadings,
									{
										behavior: "wrap",
										properties: {
											className: ["anchor-link"]
										}
									}
								]
							]
						}
					}}
				/>
			</div>

			{/* Navigation */}
			<BlogNavigation prev={prevPost} next={nextPost} />

			<div className="mt-8">
				<Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
					&larr; {t("backToBlog")}
				</Link>
			</div>
		</article>
	)
}
