import { Skeleton } from "@/shared/components/ui/skeleton"

export default function BlogPostLoading() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
			{/* Header */}
			<div>
				<Skeleton className="h-6 w-24 rounded-full" />
				<Skeleton className="mt-4 h-10 w-full sm:h-12" />
				<Skeleton className="mt-2 h-10 w-3/4 sm:h-12" />
				<Skeleton className="mt-4 h-6 w-full" />
				<Skeleton className="mt-1 h-6 w-2/3" />

				<div className="mt-6 flex gap-4">
					<Skeleton className="h-5 w-40" />
					<Skeleton className="h-5 w-24" />
				</div>

				<div className="mt-4 flex gap-2">
					{Array.from({ length: 4 }).map((_, i) => (
						// biome-ignore lint: static skeleton items
						<Skeleton key={i} className="h-6 w-20 rounded-full" />
					))}
				</div>
			</div>

			{/* Content skeleton */}
			<div className="mt-12 space-y-6">
				{/* Paragraph blocks */}
				{Array.from({ length: 3 }).map((_, blockIdx) => (
					// biome-ignore lint: static skeleton items
					<div key={blockIdx} className="space-y-3">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</div>
				))}

				{/* Code block skeleton */}
				<Skeleton className="h-48 w-full rounded-lg" />

				{/* More paragraphs */}
				<div className="space-y-3">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</div>
		</div>
	)
}
