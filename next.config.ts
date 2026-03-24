import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	reactCompiler: true
}

const withMDX = createMDX({})
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withMDX(withNextIntl(nextConfig))
