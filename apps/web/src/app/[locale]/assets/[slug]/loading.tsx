import { Skeleton } from "@/shared/components/ui/skeleton"

export default function AssetDetailLoading() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
			{/* Title + badge */}
			<div className="flex items-start justify-between gap-4">
				<Skeleton className="h-10 w-3/4 sm:h-12" />
				<Skeleton className="h-6 w-16 rounded-full" />
			</div>
			<Skeleton className="mt-3 h-6 w-full" />
			<Skeleton className="mt-1 h-6 w-2/3" />

			{/* Tags */}
			<div className="mt-4 flex gap-2">
				{Array.from({ length: 4 }).map((_, i) => (
					// biome-ignore lint: static skeleton items
					<Skeleton key={i} className="h-6 w-20 rounded-full" />
				))}
			</div>

			{/* Code block */}
			<div className="mt-8">
				<Skeleton className="h-7 w-32" />
				<Skeleton className="mt-4 h-64 w-full rounded-lg" />
			</div>

			{/* Explanation */}
			<div className="mt-12">
				<Skeleton className="h-7 w-40" />
				<div className="mt-4 space-y-3">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</div>
		</div>
	)
}
