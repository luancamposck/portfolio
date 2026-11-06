import { notFound } from "next/navigation"
import * as rootParams from "next/root-params"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ locale: requestedLocale }) => {
	const locale = requestedLocale ?? (await rootParams.locale())
	if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound()
	}
	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default
	}
})
