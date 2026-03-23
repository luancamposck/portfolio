"use client"

import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/shared/lib/utils"

const DropdownMenu = MenuPrimitive.Root
const DropdownMenuTrigger = MenuPrimitive.Trigger
const DropdownMenuGroup = MenuPrimitive.Group
const DropdownMenuPortal = MenuPrimitive.Portal
const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup

function DropdownMenuContent({ className, ...props }: MenuPrimitive.Popup.Props) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner side="bottom" align="start">
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(
						"bg-popover text-popover-foreground data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 z-50 min-w-[8rem] origin-[var(--transform-origin)] overflow-hidden rounded-md border p-1 shadow-md transition-all",
						className
					)}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	)
}

function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(
				"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

function DropdownMenuCheckboxItem({ className, ...props }: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cn(
				"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

function DropdownMenuRadioItem({ className, ...props }: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	)
}

function DropdownMenuLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
	return <MenuPrimitive.GroupLabel data-slot="dropdown-menu-label" className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<"hr">) {
	return <hr data-slot="dropdown-menu-separator" className={cn("bg-muted -mx-1 my-1 h-px border-0", className)} {...props} />
}

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
}
