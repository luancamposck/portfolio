"use client"

import { motion, useReducedMotion } from "motion/react"
import type { CodeAsset } from "@/data/assets"
import { Link } from "@/i18n/navigation"
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

function getLanguageColor(language: string): string {
	return languageColors[language] ?? "bg-muted text-muted-foreground"
}

function getCodePreview(code: string, maxLines = 4): string {
	return code.split("\n").slice(0, maxLines).join("\n")
}

interface AssetCardProps {
	asset: CodeAsset
	index: number
}

export function AssetCard({ asset, index }: AssetCardProps) {
	const shouldReduceMotion = useReducedMotion()

	const content = (
		<div className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
			<div className="flex items-center justify-between p-4 pb-2">
				<h3 className="font-semibold text-foreground line-clamp-1 transition-colors group-hover:text-primary">{asset.title}</h3>
				<Badge className={getLanguageColor(asset.language)}>{asset.language}</Badge>
			</div>
			<p className="px-4 text-sm text-muted-foreground line-clamp-2">{asset.description}</p>
			<div className="mx-4 mt-3 overflow-hidden rounded-md bg-muted/50 p-3 transition-colors group-hover:bg-muted/80">
				<pre className="overflow-hidden text-xs leading-relaxed text-muted-foreground">
					<code>{getCodePreview(asset.code)}</code>
				</pre>
			</div>
			<div className="mt-auto flex flex-wrap gap-1.5 p-4 pt-3">
				{asset.tags.slice(0, 3).map((tag) => (
					<Badge key={tag} variant="outline" className="text-xs">
						{tag}
					</Badge>
				))}
			</div>
		</div>
	)

	if (shouldReduceMotion) {
		return (
			<Link href={`/assets/${asset.slug}`} className="block h-full">
				{content}
			</Link>
		)
	}

	return (
		<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}>
			<Link href={`/assets/${asset.slug}`} className="block h-full">
				{content}
			</Link>
		</motion.div>
	)
}
