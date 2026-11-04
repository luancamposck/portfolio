import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { assets } from "@/modules/assets/data"
import { getAllPosts } from "@/modules/blog/data"
import { projects } from "@/modules/projects/data"

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

	const assetUrls: MetadataRoute.Sitemap = assets.map((asset) => ({
		url: `${BASE_URL}/${asset.locale}/assets/${asset.slug}`,
		lastModified: new Date(asset.updatedAt ?? asset.createdAt),
		changeFrequency: "monthly",
		priority: 0.6,
		alternates: { languages: Object.fromEntries(assets.filter((a) => a.slug === asset.slug).map((a) => [a.locale, `${BASE_URL}/${a.locale}/assets/${a.slug}`])) }
	}))

	const posts = getAllPosts()
	const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
		url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
		lastModified: new Date(post.updatedAt ?? post.date),
		changeFrequency: "monthly",
		priority: 0.7,
		alternates: { languages: Object.fromEntries(posts.filter((p) => p.slug === post.slug).map((p) => [p.locale, `${BASE_URL}/${p.locale}/blog/${p.slug}`])) }
	}))

	return [...staticUrls, ...projectUrls, ...assetUrls, ...blogUrls]
}
