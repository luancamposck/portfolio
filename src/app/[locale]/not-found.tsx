import { GradientBlob } from "@/shared/components/creative/gradient-blob"
import { NotFoundContent } from "@/shared/components/sections/not-found-content"

export default function NotFound() {
	return (
		<div className="relative">
			<GradientBlob color="bg-primary/20" size="w-96 h-96" className="top-1/4 -left-20" delay={0} />
			<GradientBlob color="bg-chart-1/20" size="w-80 h-80" className="bottom-1/4 -right-20" delay={2} />
			<NotFoundContent />
		</div>
	)
}
