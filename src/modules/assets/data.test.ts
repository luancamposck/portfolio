import { describe, expect, it } from "vitest"
import { getAssetSummaries, getAssetsByLocale } from "./data"

describe("asset summaries", () => {
	it("retains card data while excluding explanations and truncating code", () => {
		const full = getAssetsByLocale("pt")
		const summaries = getAssetSummaries("pt")
		expect(summaries).toHaveLength(full.length)
		for (const [index, summary] of summaries.entries()) {
			expect(summary.slug).toBe(full[index].slug)
			expect(summary.code).toBe(full[index].code.split("\n").slice(0, 4).join("\n"))
			expect(summary).not.toHaveProperty("explanation")
		}
		expect(JSON.stringify(summaries).length).toBeLessThan(JSON.stringify(full).length)
	})
})
