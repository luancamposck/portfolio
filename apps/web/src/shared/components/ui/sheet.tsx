"use client"

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const Sheet = DrawerPrimitive.Root
const SheetTrigger = DrawerPrimitive.Trigger
const SheetClose = DrawerPrimitive.Close
const SheetPortal = DrawerPrimitive.Portal

function SheetOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
	return <DrawerPrimitive.Backdrop data-slot="sheet-overlay" className={cn("data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 fixed inset-0 z-50 bg-black/50 transition-opacity", className)} {...props} />
}

const sheetVariants = cva("bg-background data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 fixed z-50 flex flex-col gap-4 shadow-lg transition-all duration-300", {
	variants: {
		side: {
			top: "data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full inset-x-0 top-0 border-b",
			bottom: "data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full inset-x-0 bottom-0 border-t",
			left: "data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
			right: "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
		}
	},
	defaultVariants: {
		side: "right"
	}
})

function SheetContent({ className, children, side = "right", ...props }: DrawerPrimitive.Popup.Props & VariantProps<typeof sheetVariants>) {
	const swipeDirection = side === "left" ? "left" : side === "right" ? "right" : side === "top" ? "up" : "down"
	return (
		<Sheet swipeDirection={swipeDirection}>
			<SheetPortal>
				<SheetOverlay />
				<DrawerPrimitive.Popup data-slot="sheet-content" className={cn(sheetVariants({ side }), className)} {...props}>
					<DrawerPrimitive.Content className="flex flex-1 flex-col gap-4 p-6">{children}</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</SheetPortal>
		</Sheet>
	)
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="sheet-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2", className)} {...props} />
}

function SheetTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
	return <DrawerPrimitive.Title data-slot="sheet-title" className={cn("text-foreground text-lg font-semibold", className)} {...props} />
}

function SheetDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
	return <DrawerPrimitive.Description data-slot="sheet-description" className={cn("text-muted-foreground text-sm", className)} {...props} />
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger }
