import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
	reactCompiler: true,
}

const withMDX = createMDX({
	options: {
		rehypePlugins: [
			[
				"rehype-pretty-code",
				{
					theme: {
						dark: "github-dark-default",
						light: "github-light-default",
					},
					keepBackground: false,
				},
			],
		],
	},
})
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

export default withMDX(withNextIntl(nextConfig))
