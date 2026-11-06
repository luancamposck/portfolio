"use client"

import { Check, Copy } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import { cn } from "@/shared/lib/utils"

export function CodeBlock({ children, className, ...props }: React.ComponentProps<"pre">) {
	const preRef = useRef<HTMLPreElement>(null)
	const [copied, setCopied] = useState(false)

	const handleCopy = useCallback(async () => {
		const code = preRef.current?.querySelector("code")?.textContent
		if (!code) return

		try {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// Clipboard API not available — silently fail
		}
	}, [])

	return (
		<div className="group relative">
			<pre ref={preRef} className={cn(className)} {...props}>
				{children}
			</pre>
			<button
				type="button"
				onClick={handleCopy}
				aria-label={copied ? "Copied" : "Copy code"}
				className={cn(
					"absolute right-2 top-2 flex size-8 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-all",
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
