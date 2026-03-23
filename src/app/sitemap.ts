import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"

const BASE_URL = "https://luancamposk.dev"

export default function sitemap(): MetadataRoute.Sitemap {
	const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
		url: `${BASE_URL}/projects/${project.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 0.7
	}))

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1
		},
		{
			url: `${BASE_URL}/projects`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},
		{
			url: `${BASE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8
		},
		...projectUrls
	]
}
