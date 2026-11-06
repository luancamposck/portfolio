import { cn } from "@/shared/lib/utils"

interface MarqueeProps {
	items: string[]
	speed?: number
	className?: string
}

export function Marquee({ items, speed = 30, className }: MarqueeProps) {
	return (
		<div className={cn("overflow-hidden", className)}>
			<div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: `${speed}s` }} aria-hidden="true">
				{items.map((item) => (
					<span key={item} className="mx-4 whitespace-nowrap text-sm font-mono text-muted-foreground md:mx-6 md:text-base">
						{item}
					</span>
				))}
				{items.map((item) => (
					<span key={`dup-${item}`} className="mx-4 whitespace-nowrap text-sm font-mono text-muted-foreground md:mx-6 md:text-base">
						{item}
					</span>
				))}
			</div>
		</div>
	)
}
