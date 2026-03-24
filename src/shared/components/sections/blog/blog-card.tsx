"use client"

import { Calendar, Clock } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import Image from "next/image"
import { useLocale } from "next-intl"
import type { BlogPost } from "@/data/blog-posts"
import { Link } from "@/i18n/navigation"
import { Badge } from "@/shared/components/ui/badge"

interface BlogCardProps {
	post: BlogPost
	index: number
}

function formatDate(dateStr: string, locale: string): string {
	const date = new Date(dateStr)
	const localeMap: Record<string, string> = {
		pt: "pt-BR",
		en: "en-US",
		es: "es-ES"
	}
	return date.toLocaleDateString(localeMap[locale] ?? "pt-BR", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})
}

export function BlogCard({ post, index }: BlogCardProps) {
	const shouldReduceMotion = useReducedMotion()
	const locale = useLocale()

	const content = (
		<article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
			{post.coverImage && (
				<div className="relative aspect-video overflow-hidden bg-muted">
					<Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
				</div>
			)}
			<div className="flex flex-1 flex-col p-4 sm:p-5">
				<div className="flex items-center gap-3 text-xs text-muted-foreground">
					<span className="inline-flex items-center gap-1">
						<Calendar className="h-3.5 w-3.5" />
						{formatDate(post.date, locale)}
					</span>
					<span className="inline-flex items-center gap-1">
						<Clock className="h-3.5 w-3.5" />
						{post.readingTime}
					</span>
				</div>
				<h3 className="mt-2 font-semibold text-foreground line-clamp-2 text-lg leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
				<p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.description}</p>
				<div className="mt-auto flex flex-wrap gap-1.5 pt-4">
					{post.tags.slice(0, 3).map((tag) => (
						<Badge key={tag} variant="outline" className="text-xs">
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</article>
	)

	if (shouldReduceMotion) {
		return (
			<Link href={`/blog/${post.slug}`} className="block h-full">
				{content}
			</Link>
		)
	}

	return (
		<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}>
			<Link href={`/blog/${post.slug}`} className="block h-full">
				{content}
			</Link>
		</motion.div>
	)
}
