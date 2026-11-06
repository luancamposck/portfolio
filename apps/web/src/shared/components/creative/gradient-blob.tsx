import { cn } from "@/shared/lib/utils"

interface GradientBlobProps {
	className?: string
	color?: string
	size?: string
	delay?: number
}

export function GradientBlob({ className, color = "bg-primary/30", size = "w-72 h-72", delay = 0 }: GradientBlobProps) {
	return <div className={cn("absolute rounded-full blur-3xl pointer-events-none animate-blob opacity-60", color, size, className)} style={{ animationDelay: `${delay}s` }} aria-hidden="true" />
}
