import type { MDXComponents } from "mdx/types"

import { Callout } from "@/shared/components/mdx/callout"
import { CodeBlock } from "@/shared/components/mdx/code-block"
import { MdxImage } from "@/shared/components/mdx/mdx-image"

const components: MDXComponents = {
	pre: (props) => <CodeBlock {...props} />,
	Callout,
	Image: MdxImage
}

export function useMDXComponents(): MDXComponents {
	return components
}
