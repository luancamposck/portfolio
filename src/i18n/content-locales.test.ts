import { describe, expect, it } from "vitest"
import { localizedContentPath } from "./content-locales"

const content = {
	blog: [
		{ slug: "article", locale: "pt" as const },
		{ slug: "article", locale: "en" as const }
	],
	assets: [{ slug: "snippet", locale: "pt" as const }]
}

describe("localized content navigation", () => {
	it("keeps a detail path when the target translation exists", () => expect(localizedContentPath("/blog/article", "en", content)).toBe("/blog/article"))
	it("returns to the listing when the translation is unavailable", () => {
		expect(localizedContentPath("/blog/article", "es", content)).toBe("/blog")
		expect(localizedContentPath("/assets/snippet", "en", content)).toBe("/assets")
	})
	it("preserves unrelated paths", () => expect(localizedContentPath("/projects/example", "es", content)).toBe("/projects/example"))
})
