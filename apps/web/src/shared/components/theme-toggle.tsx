"use client"

import { Moon, Sun } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"

function ThemeToggle() {
	const { setTheme } = useTheme()
	const t = useTranslations("themeToggle")

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
				aria-label={t("toggle")}
			>
				<Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
				<Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
				<span className="sr-only">{t("toggle")}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => setTheme("light")}>{t("light")}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>{t("dark")}</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>{t("system")}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { ThemeToggle }
