import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type BlogLocale = "pt" | "en" | "es"

export interface BlogPost {
	slug: string
	title: string
	description: string
	locale: BlogLocale
	date: string
	updatedAt?: string
	tags: string[]
	category: string
	readingTime: string
	coverImage?: string
	published: boolean
	content: string
}

const BLOG_DIR = path.join(process.cwd(), "content/blog")

function calculateReadingTime(content: string): string {
	const wordsPerMinute = 200
	const words = content.trim().split(/\s+/).length
	const minutes = Math.ceil(words / wordsPerMinute)
	return `${minutes} min`
}

function parseMdxFile(filePath: string): BlogPost | null {
	const raw = fs.readFileSync(filePath, "utf-8")
	const { data, content } = matter(raw)

	if (!data.slug || !data.title || !data.locale) {
		return null
	}

	return {
		slug: data.slug,
		title: data.title,
		description: data.description || "",
		locale: data.locale as BlogLocale,
		date: data.date,
		updatedAt: data.updatedAt,
		tags: data.tags || [],
		category: data.category || "",
		readingTime: calculateReadingTime(content),
		coverImage: data.coverImage || undefined,
		published: data.published !== false,
		content
	}
}

function loadAllPosts(): BlogPost[] {
	if (!fs.existsSync(BLOG_DIR)) {
		return []
	}

	const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

	const posts = files.map((file) => parseMdxFile(path.join(BLOG_DIR, file))).filter((post): post is BlogPost => post !== null)

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

let cachedPosts: BlogPost[] | null = null

function getPosts(): BlogPost[] {
	if (!cachedPosts) {
		cachedPosts = loadAllPosts()
	}
	return cachedPosts
}

export function getAllPosts(): BlogPost[] {
	return getPosts().filter((p) => p.published)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
	return getPosts().find((p) => p.slug === slug)
}

export function getPostsByTag(tag: string): BlogPost[] {
	return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getPostsByCategory(category: string): BlogPost[] {
	return getAllPosts().filter((p) => p.category === category)
}

export function getPostsByLocale(locale: BlogLocale): BlogPost[] {
	return getAllPosts().filter((p) => p.locale === locale)
}

export function getAllPostCategories(): string[] {
	return [...new Set(getAllPosts().map((p) => p.category))].sort()
}

export function getAllPostTags(): string[] {
	return [...new Set(getAllPosts().flatMap((p) => p.tags))].sort()
}
