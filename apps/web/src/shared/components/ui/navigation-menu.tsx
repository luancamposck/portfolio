"use client"

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"

import { cn } from "@/shared/lib/utils"

function NavigationMenu({ className, children, ...props }: NavigationMenuPrimitive.Root.Props) {
	return (
		<NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
			{children}
		</NavigationMenuPrimitive.Root>
	)
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
	return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("group flex flex-1 list-none items-center justify-center gap-1", className)} {...props} />
}

const NavigationMenuItem = NavigationMenuPrimitive.Item

function NavigationMenuTrigger({ className, ...props }: NavigationMenuPrimitive.Trigger.Props) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				"group/trigger inline-flex h-9 w-max items-center justify-center gap-1 rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn("data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 top-0 left-0 w-full p-2 transition-all md:absolute md:w-auto", className)}
			{...props}
		/>
	)
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"block rounded-md p-3 text-sm leading-none no-underline transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none select-none",
				className
			)}
			{...props}
		/>
	)
}

function NavigationMenuViewport({ className, ...props }: NavigationMenuPrimitive.Viewport.Props) {
	return (
		<div className="absolute top-full left-0 flex justify-center">
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					"bg-popover text-popover-foreground data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 relative mt-1.5 h-[var(--navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border shadow transition-all md:w-[var(--navigation-menu-viewport-width)]",
					className
				)}
				{...props}
			/>
		</div>
	)
}

export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport }
