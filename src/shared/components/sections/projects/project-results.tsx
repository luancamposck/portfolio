"use client"

import { Counter } from "@/shared/components/creative/counter"
import { SectionWrapper } from "@/shared/components/layout/section-wrapper"

interface ProjectResultsProps {
	results: string[]
}

export function ProjectResults({ results }: ProjectResultsProps) {
	if (results.length === 0) return null

	return (
		<SectionWrapper className="py-12">
			<h2 className="text-2xl font-bold">Resultados</h2>
			<div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{results.map((result) => {
					const parsed = parseResult(result)
					return (
						<div key={result} className="rounded-lg border bg-card p-6 text-center">
							{parsed ? (
								<>
									<div className="text-3xl font-bold text-primary">
										<Counter target={parsed.number} suffix={parsed.suffix} />
									</div>
									<p className="mt-2 text-sm text-muted-foreground">{parsed.label}</p>
								</>
							) : (
								<p className="text-sm text-muted-foreground">{result}</p>
							)}
						</div>
					)
				})}
			</div>
		</SectionWrapper>
	)
}

function parseResult(result: string): { number: number; suffix: string; label: string } | null {
	const match = result.match(/^([\d.]+)([\w%+/]*)\s+(.+)$/)
	if (match) {
		return { number: Number.parseFloat(match[1]), suffix: match[2], label: match[3] }
	}
	const match2 = result.match(/^(.+?)\s+([\d.]+)([\w%+/]*)$/)
	if (match2) {
		return { number: Number.parseFloat(match2[2]), suffix: match2[3], label: match2[1] }
	}
	return null
}
