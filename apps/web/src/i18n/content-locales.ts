import type { Locale } from "./routing"

export type ContentLocales = Record<"blog" | "assets", { slug: string; locale: Locale }[]>

export function localizedContentPath(pathname: string, locale: Locale, content: ContentLocales): string {
	const match = /^\/(blog|assets)\/([^/]+)\/?$/.exec(pathname)
	if (!match) return pathname
	const section = match[1] as keyof ContentLocales
	return content[section].some((item) => item.slug === decodeURIComponent(match[2]) && item.locale === locale) ? pathname : `/${section}`
}
