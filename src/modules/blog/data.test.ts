import { describe, expect, it } from "vitest"
import { getAllPosts, getPostBySlug, getPostSummaries } from "./data"

describe("published blog content", () => {
	it("looks up posts using both slug and locale", () => {
		const post = getAllPosts()[0]
		expect(getPostBySlug(post.slug, post.locale)?.title).toBe(post.title)
		expect(getPostBySlug(post.slug, "invalid")).toBeUndefined()
	})
	it("does not include article bodies in listing summaries", () => {
		const post = getAllPosts()[0]
		expect(getPostSummaries(post.locale).find((item) => item.slug === post.slug)).not.toHaveProperty("content")
	})
})
