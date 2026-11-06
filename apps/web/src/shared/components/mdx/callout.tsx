"use client"

import { AlertCircle, AlertTriangle, Info } from "lucide-react"

import { cn } from "@/shared/lib/utils"

const icons = {
	info: Info,
	warning: AlertTriangle,
	error: AlertCircle
} as const

type CalloutVariant = keyof typeof icons

const variantStyles: Record<CalloutVariant, string> = {
	info: "border-blue-500/30 bg-blue-500/5 text-blue-900 dark:text-blue-200 [&>svg]:text-blue-500",
	warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-900 dark:text-yellow-200 [&>svg]:text-yellow-500",
	error: "border-destructive/30 bg-destructive/5 text-red-900 dark:text-red-200 [&>svg]:text-destructive"
}

export function Callout({ children, variant = "info", title, className }: { children: React.ReactNode; variant?: CalloutVariant; title?: string; className?: string }) {
	const Icon = icons[variant]

	return (
		<div className={cn("my-6 flex gap-3 rounded-lg border p-4", variantStyles[variant], className)}>
			<Icon className="mt-0.5 size-5 shrink-0" />
			<div className="min-w-0 flex-1">
				{title && <p className="mb-1 font-semibold">{title}</p>}
				<div className="text-sm [&>p]:m-0">{children}</div>
			</div>
		</div>
	)
}
