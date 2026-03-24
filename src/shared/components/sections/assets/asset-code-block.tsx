"use client"

import { Check, Copy } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/shared/lib/utils"

interface AssetCodeBlockProps {
	code: string
	highlightedHtml: string
}

export function AssetCodeBlock({ code, highlightedHtml }: AssetCodeBlockProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// Clipboard API not available
		}
	}, [code])

	return (
		<div className="group relative">
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: server-generated syntax highlighting from shiki */}
			<div className="overflow-x-auto rounded-lg border bg-muted/30 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
			<button
				type="button"
				onClick={handleCopy}
				aria-label={copied ? "Copied" : "Copy code"}
				className={cn(
					"absolute right-3 top-3 flex size-8 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-all",
					"opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
					"hover:bg-muted hover:text-foreground",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					copied && "text-green-500 hover:text-green-500"
				)}
			>
				{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
			</button>
		</div>
	)
}
