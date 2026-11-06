import { routing } from "../../i18n/routing"

const locales: readonly string[] = routing.locales

export function validateBlogFrontmatter(data: Record<string, unknown>, filePath: string): void {
	const fail = (field: string) => {
		throw new Error(`${filePath}: invalid or missing frontmatter field "${field}"`)
	}
	for (const field of ["slug", "title", "description", "locale", "date", "category"]) {
		if (typeof data[field] !== "string" || !data[field].trim()) fail(field)
	}
	if (!locales.includes(data.locale as string)) fail("locale")
	if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date as string) || Number.isNaN(Date.parse(`${data.date}T00:00:00Z`)) || new Date(`${data.date}T00:00:00Z`).toISOString().slice(0, 10) !== data.date) fail("date")
	if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string" && tag.trim())) fail("tags")
	if (typeof data.published !== "boolean") fail("published")
	if (
		data.updatedAt !== undefined &&
		(typeof data.updatedAt !== "string" ||
			!/^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt) ||
			Number.isNaN(Date.parse(`${data.updatedAt}T00:00:00Z`)) ||
			new Date(`${data.updatedAt}T00:00:00Z`).toISOString().slice(0, 10) !== data.updatedAt)
	)
		fail("updatedAt")
	if (data.coverImage !== undefined && typeof data.coverImage !== "string") fail("coverImage")
}
