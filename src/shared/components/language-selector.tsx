"use client"

import { Globe } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"

const localeLabels: Record<Locale, string> = {
	pt: "Português",
	en: "English",
	es: "Español"
}

function LanguageSelector() {
	const t = useTranslations("languageSelector")
	const locale = useLocale() as Locale
	const router = useRouter()
	const pathname = usePathname()

	function switchLocale(newLocale: Locale) {
		router.replace(pathname, { locale: newLocale })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
				aria-label={t("label")}
			>
				<Globe className="size-4" />
				<span className="sr-only">{t("label")}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{routing.locales.map((l) => (
					<DropdownMenuItem key={l} onClick={() => switchLocale(l)} className={locale === l ? "font-semibold" : ""}>
						{localeLabels[l]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { LanguageSelector }
