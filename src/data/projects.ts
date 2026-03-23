export interface Project {
	slug: string
	title: string
	subtitle: string
	description: string
	longDescription: string
	coverImage: string
	images: string[]
	tags: string[]
	category: string
	client: string
	year: number
	liveUrl?: string
	githubUrl?: string
	featured: boolean
	results: string[]
}
