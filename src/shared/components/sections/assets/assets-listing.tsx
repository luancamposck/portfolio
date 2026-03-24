"use client"

import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import type { AssetCategory, AssetLocale, CodeAsset } from "@/data/assets"
import { getAllAssetCategories, getAssetsByLocale } from "@/data/assets"
import { cn } from "@/shared/lib/utils"
import { AssetCard } from "./asset-card"

interface AssetsListingProps {
	locale: string
}

export function AssetsListing({ locale }: AssetsListingProps) {
	const t = useTranslations("assetsPage")
	const [activeCategory, setActiveCategory] = useState<AssetCategory | "all">("all")
	const [search, setSearch] = useState("")

	const allAssets = useMemo(() => getAssetsByLocale(locale as AssetLocale), [locale])
	const categories = useMemo(() => getAllAssetCategories(), [])

	const filteredAssets = useMemo(() => {
		let result: CodeAsset[] = allAssets

		if (activeCategory !== "all") {
			result = result.filter((a) => a.category === activeCategory)
		}

		if (search.trim()) {
			const query = search.toLowerCase()
			result = result.filter((a) => a.title.toLowerCase().includes(query) || a.description.toLowerCase().includes(query) || a.tags.some((tag) => tag.toLowerCase().includes(query)))
		}

		return result
	}, [allAssets, activeCategory, search])

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
							{t(`categories.${category}`)}
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

			{filteredAssets.length === 0 ? (
				<p className="mt-12 text-center text-muted-foreground">{t("noResults")}</p>
			) : (
				<div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{filteredAssets.map((asset, i) => (
						<AssetCard key={asset.slug} asset={asset} index={i} />
					))}
				</div>
			)}
		</>
	)
}
