import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import { prettyCodeOptions } from "./src/modules/content/highlighting"

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	reactCompiler: true,
	experimental: { globalNotFound: true },
}

const withMDX = createMDX({
	options: {
		rehypePlugins: [["rehype-pretty-code", prettyCodeOptions]],
	},
})
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withMDX(withNextIntl(nextConfig))
