import NextImage from "next/image"

import { cn } from "@/shared/lib/utils"

export function MdxImage({ src, alt = "", width, height, caption, className, ...props }: React.ComponentProps<typeof NextImage> & { caption?: string }) {
	return (
		<figure className="my-6">
			<NextImage src={src} alt={alt} width={width ?? 800} height={height ?? 450} className={cn("rounded-lg border border-border", className)} sizes="(max-width: 768px) 100vw, 800px" {...props} />
			{caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{caption}</figcaption>}
		</figure>
	)
}
