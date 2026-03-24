import type { MetadataRoute } from "next"
import { assets } from "@/data/assets"
import { getAllPosts } from "@/data/blog-posts"
import { projects } from "@/data/projects"
import { routing } from "@/i18n/routing"

const BASE_URL = "https://luancamposk.dev"

function localeAlternates(path: string): Record<string, string> {
	return Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`]))
}

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
		{ path: "", priority: 1, changeFrequency: "monthly" },
		{ path: "/projects", priority: 0.9, changeFrequency: "monthly" },
		{ path: "/about", priority: 0.8, changeFrequency: "monthly" },
		{ path: "/assets", priority: 0.8, changeFrequency: "weekly" },
		{ path: "/blog", priority: 0.9, changeFrequency: "weekly" }
	]

	const staticUrls: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
		routing.locales.map((locale) => ({
			url: `${BASE_URL}/${locale}${route.path}`,
			lastModified: new Date(),
			changeFrequency: route.changeFrequency,
			priority: route.priority,
			alternates: { languages: localeAlternates(route.path) }
		}))
	)

	const projectUrls: MetadataRoute.Sitemap = projects.flatMap((project) =>
		routing.locales.map((locale) => ({
			url: `${BASE_URL}/${locale}/projects/${project.slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
			alternates: { languages: localeAlternates(`/projects/${project.slug}`) }
		}))
	)

	const assetUrls: MetadataRoute.Sitemap = assets.flatMap((asset) =>
		routing.locales.map((locale) => ({
			url: `${BASE_URL}/${locale}/assets/${asset.slug}`,
			lastModified: asset.updatedAt ? new Date(asset.updatedAt) : new Date(asset.createdAt),
			changeFrequency: "monthly" as const,
			priority: 0.6,
			alternates: { languages: localeAlternates(`/assets/${asset.slug}`) }
		}))
	)

	const posts = getAllPosts()
	const blogUrls: MetadataRoute.Sitemap = posts.flatMap((post) =>
		routing.locales.map((locale) => ({
			url: `${BASE_URL}/${locale}/blog/${post.slug}`,
			lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.date),
			changeFrequency: "monthly" as const,
			priority: 0.7,
			alternates: { languages: localeAlternates(`/blog/${post.slug}`) }
		}))
	)

	return [...staticUrls, ...projectUrls, ...assetUrls, ...blogUrls]
}
