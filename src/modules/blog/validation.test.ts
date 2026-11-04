import { describe, expect, it } from "vitest"
import { validateBlogFrontmatter } from "./validation"

const valid = { slug: "article", title: "Title", description: "Description", locale: "pt", date: "2026-03-25", tags: ["nextjs"], category: "dev", published: true }

describe("blog frontmatter", () => {
	it("accepts valid posts and drafts", () => {
		expect(() => validateBlogFrontmatter(valid, "article.mdx")).not.toThrow()
		expect(() => validateBlogFrontmatter({ ...valid, published: false }, "draft.mdx")).not.toThrow()
	})
	it.each([
		["locale", "fr"],
		["date", "2026-02-30"],
		["tags", [1]],
		["published", "false"],
		["title", ""]
	])("reports invalid %s with its source file", (field, value) => {
		expect(() => validateBlogFrontmatter({ ...valid, [field]: value }, "article.mdx")).toThrow(`article.mdx: invalid or missing frontmatter field "${field}"`)
	})
})
