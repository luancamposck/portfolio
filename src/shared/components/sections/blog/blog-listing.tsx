"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import type { BlogLocale, BlogPost } from "@/data/blog-posts"
import { getAllPostCategories, getPostsByLocale } from "@/data/blog-posts"
import { cn } from "@/shared/lib/utils"
import { BlogCard } from "./blog-card"

interface BlogListingProps {
	locale: string
}

export function BlogListing({ locale }: BlogListingProps) {
	const t = useTranslations("blogPage")
	const [activeCategory, setActiveCategory] = useState<string>("all")
	const [search, setSearch] = useState("")

	const allPosts = useMemo(() => getPostsByLocale(locale as BlogLocale), [locale])
	const categories = useMemo(() => getAllPostCategories(), [])

	const filteredPosts = useMemo(() => {
		let result: BlogPost[] = allPosts

		if (activeCategory !== "all") {
			result = result.filter((p) => p.category === activeCategory)
		}

		if (search.trim()) {
			const query = search.toLowerCase()
			result = result.filter((p) => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.tags.some((tag) => tag.toLowerCase().includes(query)))
		}

		return result
	}, [allPosts, activeCategory, search])

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setActiveCategory("all")}
						className={cn(
							"inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
							activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						)}
					>
						{t("allCategories")}
					</button>
					{categories.map((category) => (
						<button
							key={category}
							type="button"
							onClick={() => setActiveCategory(category)}
							className={cn(
								"inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
								activeCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							)}
						>
							{category}
						</button>
					))}
				</div>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder={t("searchPlaceholder")}
						className="h-9 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 sm:w-64"
					/>
				</div>
			</div>

			{filteredPosts.length === 0 ? (
				<p className="mt-12 text-center text-muted-foreground">{t("noResults")}</p>
			) : (
				<div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{filteredPosts.map((post, i) => (
						<BlogCard key={post.slug} post={post} index={i} />
					))}
				</div>
			)}
		</>
	)
}
