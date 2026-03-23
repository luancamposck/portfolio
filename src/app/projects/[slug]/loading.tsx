import { Skeleton } from "@/shared/components/ui/skeleton"

export default function ProjectDetailLoading() {
	return (
		<div>
			{/* Hero skeleton */}
			<div className="relative -mt-16 h-[50vh] min-h-[400px] w-full sm:h-[60vh]">
				<Skeleton className="h-full w-full rounded-none" />
				<div className="absolute inset-x-0 bottom-0 pb-10 pt-16">
					<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="mt-3 h-12 w-80 sm:h-14 sm:w-[480px]" />
						<Skeleton className="mt-4 h-6 w-64" />
					</div>
				</div>
			</div>

			{/* Info skeleton */}
			<div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
					<div className="flex gap-6">
						{Array.from({ length: 3 }).map((_, i) => (
							// biome-ignore lint: static skeleton items
							<div key={i}>
								<Skeleton className="h-4 w-16" />
								<Skeleton className="mt-2 h-5 w-24" />
							</div>
						))}
					</div>
					<div className="flex gap-3">
						<Skeleton className="h-9 w-28" />
						<Skeleton className="h-9 w-24" />
					</div>
				</div>

				<div className="mt-8 flex gap-2">
					{Array.from({ length: 5 }).map((_, i) => (
						// biome-ignore lint: static skeleton items
						<Skeleton key={i} className="h-6 w-20 rounded-md" />
					))}
				</div>

				<div className="mt-12">
					<Skeleton className="h-8 w-48" />
					<div className="mt-6 space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="mt-6 h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>
				</div>
			</div>
		</div>
	)
}
