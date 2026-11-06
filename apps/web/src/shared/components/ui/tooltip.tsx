"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/shared/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

function TooltipContent({ className, side = "top", ...props }: TooltipPrimitive.Popup.Props & { side?: "top" | "right" | "bottom" | "left" }) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner side={side}>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn("bg-primary text-primary-foreground data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 z-50 max-w-xs rounded-md px-3 py-1.5 text-xs transition-opacity", className)}
					{...props}
				/>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	)
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
